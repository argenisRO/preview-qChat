from .base import *
from sys import argv

PROJECT_DIR = path.abspath(path.join(path.dirname( __file__ ), '..', 'chat'))

SECRET_KEY = 'j5cr7_3=7z*&6he4m3z@o&11^k2&6%3(37uso9q+-1)87^q1yk'

DEBUG = True

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        # Separate the Postgresql Database from the Testing Sqlite3 Database
        'ENGINE': 'django.db.backends.sqlite3' if 'test' in argv or 'test_coverage' in argv else 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': environ.get('DB_PASS', ''),
        'HOST': environ.get('DB_HOST', 'localhost'),
        'PORT': 5432,
        'TEST': {
            'NAME': path.join(BASE_DIR, 'db.sqlite3')
        }
    }
}

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [(environ.get('REDIS_HOST', 'localhost'), 6379)]
        },
    },
}

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    path.join(PROJECT_DIR, "static/"),
]

MEDIA_URL = '/media/'
MEDIA_ROOT = path.join(BASE_DIR, "media_dev/")