from django.http import HttpResponse
from django.conf import settings
from django.template.context import RequestContext
import os
from django.template.loader import get_template

def render(request, template_name, params = None, *args, **kwargs):
    """
    Replacement for render_to_response that uses RequestContext and sets an
    extra template variable, TEMPLATE_NAME.
    """
    dir = os.path.join(os.path.dirname(__file__), 'templates').replace('\\','/') + '/'
    template = get_template(dir + template_name)
    context_instance=RequestContext(request)
    if params is not None :
        context_instance=RequestContext(request, params)
    return HttpResponse (template.render(context_instance))
    # #FIXME, temporal function
    
def get_file_media_url (object, location = 'location'):
    path = ''
    if hasattr(object, location):
        try :
            location =  getattr(object, location)
            path = location.url.replace (settings.DISC_PATH, '')
            path = '/' + path.replace ('C%3A/WWW/', '')
        except ValueError :
            pass
    return path