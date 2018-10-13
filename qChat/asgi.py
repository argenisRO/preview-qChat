from os import environ
from django import setup
from channels.routing import get_default_application

environ.setdefault("DJANGO_SETTINGS_MODULE", "qChat.settings")
setup()

application = get_default_application()