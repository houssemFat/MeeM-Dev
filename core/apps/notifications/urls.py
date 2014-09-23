from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls import patterns, url
import views

urlpatterns = patterns('',
                       # courses :
                       url(r'^$', views.default , name='core_apps_notification_default'),
                       url(r'^/show/$', views.show , name='core_apps_notification_default'),
                       )