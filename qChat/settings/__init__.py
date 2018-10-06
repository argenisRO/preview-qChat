from os import environ
production = environ.get('PRODUCTION', 'False')

if production == 'False':
    from .local import *
else:
    from .production import *