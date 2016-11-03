import logging
from functools import wraps

from django.http import HttpResponseNotAllowed
from django.core.exceptions import PermissionDenied
from django.utils.decorators import  available_attrs
from django.contrib.contenttypes.models import ContentType
from django.db.models.loading import get_model
from core.apps.accounts.models import User



logger = logging.getLogger('django.request')

def can_view(model, related_name, app_label=None):
    """
    Decorator that check if a teacher can view an object .  Usage::

        @can_view(ModelType, related)
        def my_view(request, id):
            # 
            # ...

    Note that app_label label must point to the app that contains models.
    """
    def decorator(func):
        @wraps(func, assigned=available_attrs(func))
        def inner(request, *args, **kwargs):
            user = User.objects.get(pk=request.user.id)
            ct =  ContentType.objects.get(model=model, app_label=app_label)
            model_class = ct.model_class()
            object  = model_class.objects.get(pk=kwargs['id'])
            if getattr(object, related_name).id != user.id :
                raise PermissionDenied
                return HttpResponseNotAllowed()
            return func(request, *args, **kwargs)
        return inner
    return decorator


def can_edit(model, related_name, app_label=None):
    """
    Decorator that check if a teacher can edit an object .  Usage::

        @can_view(ModelType, related)
        def my_view(request, id):
            # 
            # ...

    Note that request methods should be in uppercase.
    """
    def decorator(func):
        @wraps(func, assigned=available_attrs(func))
        def inner(request, *args, **kwargs):
            user = User.objects.get(pk=request.user.id)
            ContentType.objects.clear_cache()
            ct =  ContentType.objects.get(model=model, app_label=app_label)
            model_class = ct.model_class()
            object  = model_class.objects.get(pk=kwargs['id'])
            if getattr(object, related_name).id != user.id :
                raise PermissionDenied
                return HttpResponseNotAllowed()
            return func(request, *args, **kwargs)
        return inner
    return decorator