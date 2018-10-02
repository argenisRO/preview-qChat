from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.auth import login, logout
from channels.db import database_sync_to_async
from .utils import create_message, check_user, fetch_room, connection_list, register_user

message_settings = {
    'SPECIAL' : 0,
    'ALERT'   : 1,
    'NORMAL'  : 2,
    'MUTED'   : 3,
}

class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()
        
        self.connected_rooms = set()
        
        if self.scope['user'].is_anonymous:
            # Authentication Required
            await self.send_json({
                "authentication":   True,
                "request_login":    True,
                "attempts":         0,
                "is_staff":         False
            })
            
        else:
            pass
        

    async def receive_json(self, context):
        operation = context.get("operation", None)
 
        # Manage User Authentication
        if operation == 'check_authentication':
            # check_user will check the user in the database and return true or false if their info matched
            authentication = False
            user = await check_user(context['username'], context['password'])

            # If info is correct, authenticate the user (login)
            if user is not None:
                authentication = True

                await login(self.scope, user)
                await database_sync_to_async(self.scope["session"].save)()

            await self.send_json({
                "authentication":   True,
                "request_login":    not authentication,
                "attempts":         context['attempts'],
                "is_staff":         user.is_staff if user is not None else False
            })

        # Manage User Registration
        elif operation == 'user_registration':
            user = await register_user(context)
            authentication = False
            
            # Log the user in if their registration was successful
            if user_registered is not None:
                authentication = True

                await login(self.scope, user)
                await database_sync_to_async(self.scope["session"].save)()
            
            # Confirm with the front-end the user was created
            await self.send_json({
                "registration":     True,
                "already_in_use":   not authentication,
                "is_staff":         self.scope['user'].is_staff
            })

        # Manage Chatrooms
        elif operation == 'manage_chatrooms':
            chatroom_id = int(context['room_id'])

            if context['command'] == 'join_chat':

                await self.join_chat(chatroom_id)
            elif context['command'] == 'exit_chat':

                await self.exit_chat(chatroom_id)

        # Manage New Chat Messages
        elif operation == 'new_message':
            await self.message_chat(int(context['room_id']), context['message'])
        
        elif operation == 'logout':
            await logout(self.scope)
            await database_sync_to_async(self.scope["session"].save)()
            self.close()
        else:
            pass



    async def disconnect(self, code):
        if len(self.connected_rooms) is not 0:
            for chatroom_id in list(self.connected_rooms):
                await self.exit_chat(chatroom_id)

    # --------------------------------------------
    # --------------------------------------------
    # --------------------------------------------

    async def join_chat(self, chatroom_id):
        username = self.scope["user"].username
        chat_room = await fetch_room(chatroom_id)
        self.connected_rooms.add(chatroom_id)
        
        connected_members = await connection_list("connect", username, chatroom_id)

        # Broadcast a message to all the members in the Chat Room
        await self.channel_layer.group_send(chat_room.group_name,{
            "type":                 "join.message",
            "id":                   str(chat_room.id),
            "username":             username,
            "message":              f"User '{username}' connected to '{chat_room.title}'.",
            "connected_members":    connected_members
        })

        await self.channel_layer.group_add(chat_room.group_name, self.channel_name)


        # 'connected_members' is broadcasted to the chat AND the user
        # So that the list also updates for the connecting/disconnecting member
        await self.send_json({
            "operation" :           "message",
            "connection":           "join",
            "room":                 str(chat_room.id),
            "title":                chat_room.title,
            "username":             username,
            "connected_members":    connected_members
        })


    async def exit_chat(self, chatroom_id):
        username = self.scope["user"].username
        chat_room = await fetch_room(chatroom_id)
        
        connected_members = await connection_list("disconnect", username, chatroom_id)
        
        # Broadcast a message to all the members in the Chat Room
        await self.channel_layer.group_send(chat_room.group_name,{
            "type":                 "exit.message",
            "id":                   str(chat_room.id),
            "username":             username,
            "message":              f"User '{username}' left '{chat_room.title}'.",
            "connected_members":    connected_members
        })

        self.connected_rooms.discard(chatroom_id)
        
        await self.channel_layer.group_discard(chat_room.group_name, self.channel_name)
        
        # 'connected_members' is broadcasted to the chat AND the user
        # So that the list also updates for the connecting/disconnecting member
        await self.send_json({
            "operation" :           "message",
            "connection":           "exit",
            "room":                 str(chat_room.id),
            "title":                chat_room.title,
            "username":             username,
            "connected_members":    connected_members
        })


    async def message_chat(self, chatroom_id, message):
        if chatroom_id not in self.connected_rooms:
            return

        chat_room = await fetch_room(chatroom_id)

        fetched_message = await create_message(self.scope['user'] , message, chat_room)

        try:
            profile_url = fetched_message.user.profile.profile_pic.url
        except ValueError:
            profile_url = '/static/qchat/img/default.png'

        # Broadcast a message to all the members in the Chat Room
        await self.channel_layer.group_send(chat_room.group_name,{
            "type":                 "new.message",
            "id":                   chatroom_id,
            "username":             fetched_message.user.username,
            "message":              fetched_message.message,
            "profile_img":          profile_url,
            "time":                 fetched_message.date_written.strftime("%I:%M %p")
        })

    
    #_____________________________________
    # Group Broadcast Function Handling
    #_____________________________________


    async def join_message(self, context):
        await self.send_json({
            "operation":            "message",
            "connection":           "join",
            "message_type":         message_settings['ALERT'],
            "room":                 context["id"],
            "username":             context["username"],
            "message":              context["message"],
            "connected_members":    context['connected_members']
        })

    async def exit_message(self, context):
        await self.send_json({
            "operation":            "message",
            "connection":           "exit",
            "message_type":         message_settings['ALERT'],
            "room":                 context["id"],
            "username":             context["username"],
            "message":              context["message"],
            "connected_members":    context['connected_members']
        })

    async def new_message(self, context):
        await self.send_json({
            "operation":            "message",
            "message_type":         message_settings['NORMAL'],
            "room":                 context["id"],
            "username":             context["username"],
            "message":              context['message'],
            "profile_img":          context['profile_img'],
            "time":                 context['time']
        })

    #_____________________________________