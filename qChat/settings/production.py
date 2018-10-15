from .base import *

from dj_database_url import config as dj_config

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
AWS_S3_OBJECT_PARAMETERS = {
    'Expires': 'Thu, 31 Dec 2099 20:00:00 GMT',
    'CacheControl': 'max-age=94608000',
}
AWS_ACCESS_KEY_ID = environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = environ.get('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = environ.get('AWS_STORAGE_BUCKET_NAME')
AWS_QUERYSTRING_AUTH = False
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'

# Static Media Settings
STATICFILES_LOCATION = 'static'
STATIC_URL = f'{AWS_S3_CUSTOM_DOMAIN}/{STATICFILES_LOCATION}/'
STATICFILES_STORAGE = 'storages_backend.StaticStorage'

MEDIAFILES_LOCATION = 'media'
MEDIA_URL = f'{AWS_S3_CUSTOM_DOMAIN}/{MEDIAFILES_LOCATION}/'
DEFAULT_FILE_STORAGE = 'storages_backend.MediaStorage'

ADMIN_MEDIA_PREFIX = f'{STATIC_URL}admin/'