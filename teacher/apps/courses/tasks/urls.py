from django.conf.urls import patterns, url
from . import views

urlpatterns = patterns('',
    # POST / GET (list) 
    url(r'^$', views.default, name="teacher_tasks_view_default"),   
    # PUT / DELETE / GET (item)
    url(r'^(?P<id>[0-9]+)/$', views.rud, name="teacher_tasks_view_rud"),
)