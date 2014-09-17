"""
Django settings for surrealestate project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
from os import environ
from urlparse import urlparse

BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'nokeyforyou'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
    'django.core.context_processors.static',
    'django.core.context_processors.request',
    'django.contrib.messages.context_processors.messages'
)

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
    'django.template.loaders.eggs.Loader',
)

# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    'surrealestate',
    'dajax',
    'dajaxice',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'surrealestate.urls'

WSGI_APPLICATION = 'surrealestate.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'name',
        'USER': 'user',
        'PASSWORD': 'password',
        'HOST': 'host',
        'PORT': 'port',
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/New_York'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/static/'
# PROJECT_PATH = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = ''

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'css'),
    os.path.join(BASE_DIR, 'fonts'),
    os.path.join(BASE_DIR, 'img'),
    os.path.join(BASE_DIR, 'img/Alamo Square'),
    os.path.join(BASE_DIR, 'img/Area Four'),
    os.path.join(BASE_DIR, 'img/East Cambridge'),
    os.path.join(BASE_DIR, 'img/Financial District'),
    os.path.join(BASE_DIR, 'img/Lakeside'),
    os.path.join(BASE_DIR, 'img/Midtown'),
    os.path.join(BASE_DIR, 'img/Mission District'),
    os.path.join(BASE_DIR, 'img/MIT'),
    os.path.join(BASE_DIR, 'img/Murray Hill'),
    os.path.join(BASE_DIR, 'img/Riverside'),
    os.path.join(BASE_DIR, 'img/Soho'),
    os.path.join(BASE_DIR, 'img/Upper West Side'),
    os.path.join(BASE_DIR, 'js'),
    os.path.join(BASE_DIR, 'dajax'),
    os.path.join(BASE_DIR, 'dajaxice'),
)

# STATICFILES_FINDERS = (
#     'dajaxice.finders.DajaxiceFinder',
# )


# Parse database configuration from $DATABASE_URL
import dj_database_url
DATABASES['default'] =  dj_database_url.config()

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(BASE_DIR, 'templates'),
)
