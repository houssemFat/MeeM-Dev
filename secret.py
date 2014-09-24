# Django secret settings for meem project.
APP_DISC_PATH = "your/to/application/parent/folder"
DISC_PATH = "path/to/www/disc/path"

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'databasename',
        'USER': 'databasuser',
        'PASSWORD': 'databasuserpassword',
        'HOST': '',
        'PORT': '',
        'OPTIONS': {'init_command': 'SET storage_engine=INNODB,character_set_connection=utf8,collation_connection=utf8_unicode_ci' },
    }
}

# using an smtp
#EMAIL_USE_TLS = True 
#EMAIL_HOST = 'smtp provider'
#EMAIL_HOST_USER = 'smtp account '
#EMAIL_HOST_PASSWORD = 'smtp account user' 
#EMAIL_PORT = 587

# your no reply name
EMAIL_NO_REPLY = 'no-reply@example.ex'
MANDRILL_API_KEY  = "Your mandrill app key"
