from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # courses :
    url(r'^j/course/', include('student.apps.courses.urls')), # courses :
    url(r'^course/', include('student.apps.courses.urls')), 
    
    # chapter :
    url(r'^j/chapter/', include('student.apps.courses.chapters.urls')), 
    
    # question :
    url(r'^j/question/', include('student.apps.courses.chapters.urls')), 
    
    # accounts:
    url(r'^account/', include('student.apps.accounts.urls')),
    url(r'^logout/$', 'django.contrib.auth.views.logout',
                          {'next_page': '/'}, name="user_account_logout"),
    
    # else :
    url(r'^$', include('student.apps.dashboard.urls')), 
    
)