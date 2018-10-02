from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import *


class ProfilesInLine(admin.StackedInline):
    model = Profiles
    can_delete = False
    verbose_name_plural = 'Profile'

class UserAdmin(BaseUserAdmin):
    inlines = (ProfilesInLine,)

# Remove the existing User Model to be replaced
admin.site.unregister(User)

admin.site.register(User, UserAdmin)
admin.site.register(Messages)
admin.site.register(ChatRoom)

