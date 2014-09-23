from django.conf.urls import patterns, include, url
import  views

urlpatterns = patterns('',
    # courses :
    url(r'^$', views.list , name='list'), 
    # chapters /chapter/parentCourse:
    url(r"^(?P<id>\d+)/", views.view, name='view'), 
    # chapters /chapter/parentCourse:
    url(r'^(?P<id>\w+)/subscribe$', views.subscribe, name='app_course_subscribe'), 
)