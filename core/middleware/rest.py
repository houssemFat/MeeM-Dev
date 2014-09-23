from django.http import QueryDict

#SOURCE http://baxeico.wordpress.com/2014/06/25/put-and-delete-http-requests-with-django-and-jquery/
# we added some modification related to the Meta Key name
# please @see: request.META
class HttpPostTunnelingMiddleware(object):
    def process_request(self, request):
        http_method  = ""
        if request.META.has_key('HTTP_X_METHODOVERRIDE') : 
            http_method = request.META['HTTP_X_METHODOVERRIDE']
        if request.META.has_key('HTTP_X_HTTP_METHOD_OVERRIDE') :
            http_method = request.META['HTTP_X_HTTP_METHOD_OVERRIDE']
            if http_method != "" :
                method = http_method.upper()
                # append post form
                if method in ( 'PUT', 'DELETE' ):
                    request.method = method
                    request.META['REQUEST_METHOD'] = method
                    data = QueryDict(request.body)
                    setattr(request, method, data)
                    # see django middleware csrf line process_view
                    request.META['HTTP_X_CSRFTOKEN'] = data["csrfmiddlewaretoken"]
        return None