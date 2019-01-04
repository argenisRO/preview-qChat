from os import path, environ
from dj_database_url import config as db_config

BASE_DIR = path.dirname(path.dirname(path.dirname(path.abspath(__file__))))

DEBUG = False

SECRET_KEY = environ.get('SECURE_KEY')

ALLOWED_HOSTS = ['.herokuapp.com', 'https://q-adventures.herokuapp.com']

CORS_ORIGIN_WHITELIST = (
    'q-adventures.herokuapp.com',
)

DATABASES = {
    'default': db_config(default=environ.get('DATABASE_URL'))
}

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [environ.get('REDIS_URL')],
        },
    },
}

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'knox.auth.TokenAuthentication',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
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
STATICFILES_STORAGE = 'qChat.storages.StaticStorage'

MEDIAFILES_LOCATION = 'media'
MEDIA_URL = f'{AWS_S3_CUSTOM_DOMAIN}/{MEDIAFILES_LOCATION}/'
DEFAULT_FILE_STORAGE = 'qChat.storages.MediaStorage'

ADMIN_MEDIA_PREFIX = f'{STATIC_URL}admin/'
