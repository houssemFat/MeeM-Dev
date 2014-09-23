# -*- coding: utf-8 -*-
# Django settings for MeeM project.

# include sensible data
import secret

import sys; 

# DEBUG
# #FIXME, using aptana debug , change this switch your configuration
sys.path.append('C:\\Program Files (x86)\\aptana\\plugins\\org.python.pydev_2.7.0.2013032300\\pysrc')
sys.path.append('C:\\Program Files (x86)\\aptana\\plugins\\org.python.pydev_2.7.0.2013032300')

import pydevd
#pydevd.settrace("localhost", port=8000, stdoutToServer=True, stderrToServer=True)
import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

APP_DISC_PATH = secret.APP_DISC_PATH
DISC_PATH = secret.DISC_PATH

DATABASES =  secret.DATABASES


EMAIL_USE_TLS = secret.EMAIL_USE_TLS 
EMAIL_NO_REPLY = secret.EMAIL_NO_REPLY 
#EMAIL_HOST = secret.EMAIL_HOST
#EMAIL_HOST_USER = secret.EMAIL_HOST_USER
#EMAIL_HOST_PASSWORD = secret.EMAIL_HOST_PASSWORD 
#EMAIL_PORT = secret.EMAIL_PORT

MANDRILL_API_KEY  = secret.MANDRILL_API_KEY
EMAIL_BACKEND = "djrill.mail.backends.djrill.DjrillBackend"

# dango 1.7 , you must add the app label name 
AUTH_USER_MODEL = 'core_apps_accounts.User'
USERNAME_FIELD = 'email'

# DEVELOPPEMET
DEBUG = True
TEMPLATE_DEBUG = DEBUG
PROJECT_NAME = ''
PROJECT_BREAK_POINTS = '#-bp-'

# -- email test
#EMAIL_BACKEND = 'django.core.mail.backends.dummy.EmailBackend'


#admins
ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)

#
MANAGERS = ADMINS
ANONYMOUS_USER_ID = 'ANONYMOUS'
UNIQUE_EMAIL = True
LOGIN_TEACHER_REDIRECT_URL = '/teacher/account/profile'

# Hosts/domain names that are valid for this site; required if DEBUG is False
# See https://docs.djangoproject.com/en/1.5/ref/settings/#allowed-hosts
ALLOWED_HOSTS = []

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = 'America/Chicago'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

LANGUAGES = (
    ('fr', 'français'),
    ('ar', 'العربية'), 
    ('en', 'English'), 
    ('nl', 'Dutch')
)
# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/var/www/example.com/media/"
MEDIA_ROOT = DISC_PATH + 'media'

COMMON_JS_ROOT = DISC_PATH + 'commonJs'
COMMON_CSS_ROOT = DISC_PATH + 'commonCss'

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://example.com/media/", "http://media.example.com/"
MEDIA_URL = ''

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/var/www/example.com/static/"
STATIC_ROOT = ''

# URL prefix for static files.
# Example: "http://example.com/static/", "http://static.example.com/"
STATIC_URL = '/static/'

# Additional locations of static files
STATICFILES_DIRS = (
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    APP_DISC_PATH + "meem/static",
    APP_DISC_PATH + "meem/student/static",
    ("t", APP_DISC_PATH + "meem/teacher/static" ),
    
)

# local paths 
LOCALE_PATHS = (
    APP_DISC_PATH + 'meem/core/apps/locale',
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
#    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)
# we modify the function in django.contrib.staticfiles.views, line 46
# we recommand to add expires cache for js and html and css for fast developpement
STATIC_SERVER_MODULE = 'core.apps.tools.static'
# Make this unique, and don't share it with anybody.
SECRET_KEY = ')^k4(cftv(bqe@0md7(i=%j%bp_t=v8zw*r_36kfeji+i=+dwg'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    # rest framework emulation 
    'core.middleware.rest.HttpPostTunnelingMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'student.middleware.access.LoginRequiredMiddleware',
    'teacher.middleware.access.LoginRequiredMiddleware',
)
TEMPLATE_CONTEXT_PROCESSORS = (
    "django.contrib.auth.context_processors.auth",
    "django.core.context_processors.debug",
    "django.core.context_processors.i18n",
    "django.core.context_processors.media",
    "django.core.context_processors.static",
    "django.core.context_processors.tz",
    "django.contrib.messages.context_processors.messages",
    "django.core.context_processors.request",
    "core.context_processors.baseurl",)

ROOT_URLCONF = 'core.urls'
# List of finder classes that know how to find static files in
# various locations.
ROOT_URLCONF_REVERSED = (
    'teacher.reversed_urls',
    #'student.reversed_urls',
)

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'core.wsgi.application'

#template dires
TEMPLATE_DIRS = (
                 #os.path.join(os.path.dirname(__file__), 'teacher', 'templates').replace('\\','/'),
                 #os.path.join(os.path.dirname(__file__), 'student', 'templates').replace('\\','/'),
                 )

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Uncomment the next line to enable the admin:
    'django.contrib.admin',
    # Uncomment the next line to enable admin documentation:
    # 'django.contrib.admindocs',
    'core',
    'core.apps',
    'core.apps.accounts',
    'core.apps.history',
    'core.apps.comments',
    'core.apps.notifications',
    'core.apps.inbox',
    'core.apps.public',
    'core.apps.company',
    
    # student #FIXME , the order  is important if we keep the same templates names
    'student',
    # used for tags and other
    'student.apps',
    'student.apps.accounts',
    'student.apps.dashboard',
    'student.apps.courses',
    'student.apps.courses.chapters',
    'student.apps.courses.documents',
    'student.apps.courses.videos',
    'student.apps.courses.syllabuses',
    'student.apps.courses.quizzes',
    'student.apps.courses.forum',
    # teacher 
    'teacher',
    
    # used for tags and other
    'teacher.apps',
    #accounts
    'teacher.apps.accounts',
    'teacher.apps.accounts.profile',
    
    'teacher.apps.courses',
    'teacher.apps.courses.chapters',
    'teacher.apps.courses.videos',
    'teacher.apps.courses.documents',
    
    'teacher.apps.collaboration',
    'teacher.apps.collaboration.tasks',
    'teacher.apps.collaboration.teams',
    'teacher.apps.collaboration.invitations',
    # dashboard 
    'teacher.apps.dashboard',
    # inbox 
    'teacher.apps.inbox',
    # Mandrilla app 
    'djrill'
)

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
   }
}


BASE_URL_SCHEMA = 'http://127.0.0.1:8000/'
# student url scheam
STUDENT_SITE = BASE_URL_SCHEMA
# remove slash
TEACHER_SITE = BASE_URL_SCHEMA[:-1]