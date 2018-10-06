from .base import *

PROJECT_DIR = path.abspath(path.join(path.dirname( __file__ ), '..', 'chat'))

SECRET_KEY = 'j5cr7_3=7z*&6he4m3z@o&11^k2&6%3(37uso9q+-1)87^q1yk'

DEBUG = False

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': 'db',
        'PORT': 5432,
    }
}

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": (environ.get('REDIS_HOST', 'localhost'), 6379),
        },
    },
}

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    path.join(PROJECT_DIR, "static"),
]

MEDIA_URL = '/media/'
MEDIA_ROOT = path.join(BASE_DIR, "media_dev")