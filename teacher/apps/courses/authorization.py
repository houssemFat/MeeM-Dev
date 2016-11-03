from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
try:
    from django.utils.importlib import import_module
except ImportError:
    from importlib import import_module


def can_delete(user, course):
    if user.is_admin:
        return True
    return user == course.author

