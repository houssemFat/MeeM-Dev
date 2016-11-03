from django.conf.urls import patterns, url
from . import views

urlpatterns = patterns('',
    # default 
    url(r'^$', views.profile, name="teacher_profile_default"),
    url(r'^setlang/$', views.update_lang, name="account_profile_setlang"),
    url(r'^cover/upload/$', views.upload_cover)
)
