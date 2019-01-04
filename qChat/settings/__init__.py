from .base import *
from os import environ

if environ.get('PRODUCTION') == 'True':
    from .production import *
else:
    from .local import *
