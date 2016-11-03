from django.conf.urls import patterns, url, include
from . import views

urlpatterns = patterns('',
    # POST / GET (list) 
    url(r'^$', views.default, name="teacher_quizzes_view_default"),   
    # PUT / DELETE / GET (item)
    url(r'^(?P<id>[0-9]+)/$', views.rud, name="teacher_quizzes_view_rud"),
)