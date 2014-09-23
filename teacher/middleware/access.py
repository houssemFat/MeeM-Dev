import re

from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.http import HttpResponse, Http404
from django.core.urlresolvers import reverse, resolve
from django.contrib import messages
from teacher.apps.accounts.authorization import is_teacher
from teacher.apps.accounts.tools import set_user_message


class LoginRequiredMiddleware(object):
    BASE_TEACHER_URL  = '/teacher/'
    REQUIRED_LOGIN_URL = (
        r''+  BASE_TEACHER_URL + '(.*)$',
    )
    LOGIN_REQUIRED_URLS_EXCEPTIONS = (
        r''+  BASE_TEACHER_URL + 'account/login/(.*)$',
        r''+  BASE_TEACHER_URL + 'account/register/(.*)$',
        r''+  BASE_TEACHER_URL + 'account/logout/(.*)$',
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
        self.exceptions = tuple(re.compile(url) for url in self.LOGIN_REQUIRED_URLS_EXCEPTIONS)

    def process_view(self, request, view_func, view_args, view_kwargs):
        #FIXME check for teacher
        # No need to process URLs if user already logged in
        
        
        # An exception match should immediately return None
        for url in self.exceptions:
            if url.match(request.path):
                requested_url = resolve (request.path)
                try :
                    name = requested_url.url_name
                    if name == 'teacher_account_logout' :
                        return None
                    if request.user.is_authenticated() and is_teacher(request):
                        set_user_message(request, messages.INFO, "your are already logged In")
                        return redirect ('/teacher/')
                except Exception, e:
                    raise Http404
                return None

        
        for url in self.required:
            if url.match(request.path):
                if not is_teacher (request):
                    return redirect ('/teacher/account/login')
                else :
                    return login_required(view_func)(request, *view_args, **view_kwargs)
        # Explicitly return None for all non-matching requests
        return None