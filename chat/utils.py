from channels.db import database_sync_to_async
from django.db.models import Q
from django.contrib.auth.models import User, UserManager
from django.contrib.auth.hashers import check_password, make_password
from django.db import close_old_connections

from .models import Messages, ChatRoom, ChatRoom_Users, Profiles

# Database Interaction Functions
@database_sync_to_async
def create_message(user ,message, chatroom):
    '''Creates a 'Messages' object in the database and returns it.'''
    
    fetched_message = Messages.objects.create(user=user, message=message, chatroom=chatroom)
    return fetched_message

@database_sync_to_async
def check_user(username, passw):
    '''Check if the user is in the database'''

    user = User.objects.filter(Q(email=username) | Q(username=username)).first()
    if user is not None:
        password_correct = check_password(passw, user.password)
        if password_correct:
            return user
    return None

@database_sync_to_async
def fetch_room(room_id):
    """
    Quick Chatroom Fetch function to retrieve the chatroom object
    of the given room_id.
    Returns None if no chatroom was found.
    """
    fetched_chat_room = ChatRoom.objects.filter(id=room_id).first()
    
    if fetched_chat_room is not None:
        return fetched_chat_room
    return None

@database_sync_to_async
def connection_list(command, user, room_id):
    """
    Add or Remove a member to the connection list and return a list of all 
    the connected members in the specified room_id
    """
    
    if command == "disconnect":
        ChatRoom_Users.disconnect_user(user, room_id)
    elif command == "connect":
        ChatRoom_Users.connect_user(user, room_id)

    connected_users = ChatRoom_Users.objects.filter(chatroom_id=room_id).all()
    user_list_connected = [cr_user.user.username for cr_user in connected_users]
    return user_list_connected

@database_sync_to_async
def register_user(context):
    """
    Register a user into the database and updating their profile information
    
    *this will keep changing as development continues
    """
    user_check = User.objects.filter(username=context['username']).first()

    if user_check is None:
        userobj = User.objects.create_user(username=context['username'])

        userobj.email = context['email']
        userobj.username = context['username']
        userobj.set_password(context['password'])
        userobj.first_name = context['fname']
        userobj.last_name = context['lname']
        userobj.profile.description = None
        userobj.profile.city = context['city']
        userobj.profile.state = context['state']
        userobj.profile.zipcode = context['zipcode']
        userobj.profile.location = None
        userobj.profile.birth_date = None
        userobj.save()
        return userobj
    return None