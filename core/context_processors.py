from django.conf import  settings
def baseurl(request):
    """
    Return a BASE_URL_SHEMA template context for the current request.
    """     
    return {'BASE_HOST_URL': settings.BASE_URL_SCHEMA}