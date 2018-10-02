from .base import *

from dj_database_url import config as dj_config
import django_heroku

BASE_DIR = path.dirname(path.dirname(path.abspath(__file__)))
PROJECT_DIR = path.abspath(path.join(path.dirname( __file__ ), '..', '..'))

SECRET_KEY = environ.get('SECURE_KEY', None)

DEBUG = False

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': dj_config(default=environ.get('DATABASE_URL', None))
}

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [environ.get('REDIS_URL', None)],
        },
    },
}

# S3 Storage Settings
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
AWS_ACCESS_KEY_ID = environ.get('AWS_ACCESS_KEY_ID', None)
AWS_SECRET_ACCESS_KEY = environ.get('AWS_SECRET_ACCESS_KEY', None)
AWS_STORAGE_BUCKET_NAME = environ.get('AWS_STORAGE_BUCKET_NAME', None)
AWS_QUERYSTRING_AUTH = False
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'

# Static Media Settings
STATIC_URL = f'https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/'
MEDIA_URL = f'{STATIC_URL}media/'
STATICFILES_DIRS = (path.join(PROJECT_DIR, 'chat/static'),)
STATIC_ROOT = path.join(BASE_DIR, 'staticfiles')
ADMIN_MEDIA_PREFIX = f'{STATIC_URL}admin/'
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder'
)

django_heroku.settings(locals())