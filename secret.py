# Django settings for MeeM project.
APP_DISC_PATH = "C:/www/Django-Projects/"
DISC_PATH = "C:/WWW/"

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'meem_dev',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': '',
        'PORT': '',
        'OPTIONS': {'init_command': 'SET storage_engine=INNODB,character_set_connection=utf8,collation_connection=utf8_unicode_ci' },
    }
}

# using an smtp
EMAIL_USE_TLS = True 
EMAIL_NO_REPLY = 'meem-noreply@meem.org'
#EMAIL_HOST = 'smtp.mandrillapp.com'
#EMAIL_HOST_USER = 'meemCompany@gmail.com'
#EMAIL_HOST_PASSWORD = '**' 
#EMAIL_PORT = 587

MANDRILL_API_KEY  = "***"
