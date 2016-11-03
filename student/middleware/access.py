import re

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse


class LoginRequiredMiddleware(object):
    BASE_STUDENT_URL  = '/student/'
    REQUIRED_LOGIN_URL = (
        r''+  BASE_STUDENT_URL + 'j/chapter/(.*)$',
        r''+  BASE_STUDENT_URL + 'j/question/(.*)$',
        r''+ BASE_STUDENT_URL + 'j/task/(.*)$'
    )
    """
    Middleware component that wraps the login_required decorator around
    matching URL patterns. To use, add the class to MIDDLEWARE_CLASSES and
    define LOGIN_REQUIRED_URLS and LOGIN_REQUIRED_URLS_EXCEPTIONS in your
    settings.py. For example:
    ------
    
    ------
    LOGIN_REQUIRED_URLS is where you define URL patterns; each pattern must
    be a valid regex.

    LOGIN_REQUIRED_URLS_EXCEPTIONS is, conversely, where you explicitly
    define any exceptions (like login and logout URLs).
    """
    def __init__(self):
        self.required = tuple(re.compile(url) for url in self.REQUIRED_LOGIN_URL)
        #self.exceptions = tuple(re.compile(url) for url in settings.LOGIN_REQUIRED_URLS_EXCEPTIONS)

    def process_view(self, request, view_func, view_args, view_kwargs):
        # No need to process URLs if user already logged in
        if request.user.is_authenticated():
            return None

        # An exception match should immediately return None
        #for url in self.exceptions:
            #if url.match(request.path):
                #return None

        # Requests matching a restricted URL pattern are returned
        # wrapped with the login_required decorator
        for url in self.required:
            if url.match(request.path):
                if request.is_ajax():
                    return HttpResponse (status=401)
                else :
                    return login_required(view_func)(request, *view_args, **view_kwargs)
        # Explicitly return None for all non-matching requests
        return None