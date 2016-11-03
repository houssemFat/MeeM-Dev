from django.views.static import  serve as original
from time import time
from django.utils.http import http_date


"""
Views and functions for serving static files. These are only to be used during
development, and SHOULD NOT be used in a production setting.

"""
try:
    from urllib.parse import unquote
except ImportError:     # Python 2
    from urllib import unquote


def serve(request, path, document_root=None, show_indexes=False):
    response = original(request, path, document_root, show_indexes)
    then = time () + 1
    response['Expires'] = http_date (then)
    response['Cache-Control'] = 'public,max-age=%s' % int(1)
    return response
