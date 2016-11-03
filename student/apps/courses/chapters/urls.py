from django.conf.urls import patterns, include, url
from . import views


urlpatterns = patterns('',
    # user is out
    url(r'^(?P<id>\d+)/stats/$', views.statistics, name="chapter_statistics"),
    url(r'^(?P<id>\d+)/$', views.view, name="chapter_view"),   
)