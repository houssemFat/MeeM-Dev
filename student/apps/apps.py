from django.apps import apps as django_apps 
from django.apps import AppConfig

class AppConfig(AppConfig):
    label  = 'student_apps'
    name =  'student.apps'
    verbose_name = "student apps"