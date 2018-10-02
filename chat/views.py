from django.contrib.auth.models import User
from django.shortcuts import render
from django.contrib.staticfiles.storage import staticfiles_storage
from .models import Messages, ChatRoom, ChatRoom_Users

states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

def index(request):
    chatrooms = ChatRoom.objects.all()

    chatroom_info = {}

    for chat in chatrooms:
        messages = Messages.objects.filter(chatroom_id=chat.id)
        connected = ChatRoom_Users.objects.filter(chatroom=chat.id)

        chatroom_info[chat.title] = {
            "id"        : str(chat.id),
            "title"     : chat.title,
            "messages"  : messages,
            "connected" : connected
        }
    
    context = {
        "chatroom_information"  : chatroom_info.values(),
        "states"                : states,
        "default"               : staticfiles_storage.url('qchat/img/default.png')
    }

    return render(request, "qchat/index.html", context)