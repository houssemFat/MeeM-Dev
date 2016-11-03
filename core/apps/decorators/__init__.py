import logging
from functools import wraps

from django.views.decorators.http import require_http_methods
from django.http import Http404
from django.core.exceptions import PermissionDenied
from django.utils.decorators import  available_attrs
from django.contrib.contenttypes.models import ContentType

from core.apps.accounts.models import User

require_PUT = require_http_methods (['PUT'])
require_DELETE = require_http_methods (['DELETE'])


logger = logging.getLogger('django.request')

def require_request_attributes(attrs):
    """
    Decorator that check if a teacher can delete a course .  Usage::

        @require_request_attributes(['attr1', 'attr2', 'attr3'], type)
        def my_view(request, id):
            # 
            # ...

    Note that request methods should be in uppercase.
    """
    def decorator(func):
        @wraps(func, assigned=available_attrs(func))
        def inner(request, *args, **kwargs):
            data = getattr(request, request.method)
            for attr in attrs :
                if not attr in data :
                    raise KeyError
                    return Http404()
            return func(request, *args, **kwargs)
        return inner
    return decorator