from string import lower, split

from django import template
from django.conf import settings

register = template.Library()

@register.simple_tag
def get_student_js_global_vars():
    base = settings.BASE_URL_SCHEMA
    glob =   'hostUrl  :  "' +  base +  'static/",'
    glob +=  'scriptsUrl :  "' +  base +  'static/js",'
    glob +=  'appCommoUrl : "common/views/",'
    glob +=  'locale  :  "ar",' 
    glob +=  'getBaseUrl : function () {return __CONFIG__.baseUrl + \'js\' }'
    return glob


@register.simple_tag
def get_teacher_js_global_vars():
    base = settings.BASE_URL_SCHEMA
    glob =   'hostUrl  :  "' +  base +  'static/",'
    glob +=  'scriptsUrl :  "' +  base +  'static/t/js",'
    glob +=  'appCommoUrl : "common/views/",'
    glob +=  'locale  :  "ar",' 
    glob +=  'getBaseUrl : function () {return __CONFIG__.baseUrl + \'js\' }'
    return glob


