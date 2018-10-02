from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class Profiles(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    description = models.TextField(max_length=500, blank=True)
    city = models.CharField(max_length=30, blank=True)
    state = models.CharField(max_length=3, blank=True)
    zipcode = models.CharField(max_length=10, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    profile_pic = models.ImageField(upload_to='profile_image', blank=True)

    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profiles.objects.create(user=instance)

    post_save.connect(create_user_profile, sender=User)

    def __str__(self):
        return f"'{self.user.username}'"

class ChatRoom(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

    @property
    def group_name(self):
        return f"room-{self.id}"

class Messages(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=300)
    date_written = models.DateTimeField(auto_now_add=True)
    chatroom = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username}: {self.message}'


class ChatRoom_Users(models.Model):
    chatroom = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} is connected to: ID:{self.chatroom.id}, Name:'{self.chatroom.title}'"

    def connect_user(_user, chatroom_id):
        username = User.objects.filter(username=_user).first()
        fetch_chat = ChatRoom.objects.filter(id=chatroom_id).first()

        ChatRoom_Users.objects.get_or_create(chatroom=fetch_chat, user=username)

    def disconnect_user(_user, chatroom_id):
        username = User.objects.filter(username=_user).first()
        fetch_chat = ChatRoom.objects.filter(id=chatroom_id).first()
        
        ChatRoom_Users.objects.filter(chatroom=fetch_chat, user=username).delete()


    class Meta:
        unique_together = ["chatroom", "user"]
