from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls import patterns, url
from . import views

urlpatterns = patterns('',
                       url(r'^contact/$', views.contact_us, name='company_contact_us'),
                       url(r'^business/$', views.business, name='company_business'),
                       url(r'^usage-terms/$', views.terms_of_use, name='company_terms_of_use'),
                       url(r'^privacy/$', views.privacy, name='company_privacy'),
                       url(r'^team/$', views.team, name='company_team'),
                       )
urlpatterns += staticfiles_urlpatterns()