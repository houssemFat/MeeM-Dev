from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls import patterns, url
from . import views

urlpatterns = patterns('',
                       # courses :
                       url(r'^$', views.home , name='home'), 
                       )
urlpatterns += staticfiles_urlpatterns()