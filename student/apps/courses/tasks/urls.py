from django.conf.urls import patterns, include, url
from . import views


urlpatterns = patterns('',
    # user is out
    url(r'^(?P<id>\d+)/submit/$', views.submit, name="question_submit"),
    url(r'^(?P<id>\d+)/$', views.view, name="question_view"),   
)