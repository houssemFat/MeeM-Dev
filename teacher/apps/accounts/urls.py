from django.conf.urls import patterns, include, url
from . import views

urlpatterns = patterns('',
    url(r'^register/$', views.register, name='teacher_account_singup'),
    url(r'^login/$', views.login, name='teacher_account_login'),
    url(r'^logout/$', 'django.contrib.auth.views.logout',
                          {'next_page': '/teacher/'}, name="teacher_account_logout"),
    url(r'^password/reset/$', views.password_reset, name="teacher_account_reset_password"),
    url(r'^password/reset/done/$', views.password_reset_done, name="teacher_account_reset_password_done"),
    url(r'^password/reset/key/(?P<uidb36>[0-9A-Za-z]+)-(?P<key>.+)/$', views.password_reset_from_key, name="teacher_account_reset_password_from_key"),
    url(r'^profile/', include('teacher.apps.accounts.profile.urls')),
)