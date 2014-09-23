# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#     * Rearrange models' order
#     * Make sure each model has one field with primary_key=True
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin.py sqlcustom [appname]'
# into your database.
from __future__ import unicode_literals

from core.apps.accounts.models import User

from django.db import models

from datetime import datetime
from django.db.models.signals import post_save
from django.conf import settings
import random 


# get File url
def upload_cover_url(instance, filename):
    suffix = random.random ()
    return '/'.join([settings.MEDIA_ROOT, instance.course.author.username,   str(suffix)  + '-' + filename  ])

class  Course(models.Model):
    id = models.IntegerField(primary_key=True)
    author = models.ForeignKey(User, db_column="author_id", related_name ="courses")
    title = models.CharField(max_length=255L)
    about = models.TextField(blank=True)
    start_at = models.DateTimeField(null=True, db_column='from', blank=True) # Field renamed because it was a Python reserved word.
    end_at = models.DateTimeField(null=True, db_column='to', blank=True)
    last_update = models.DateField(default=datetime.now(), db_column='updated')
    created_at = models.DateField(default=datetime.now(), db_column='created')
    
    students = models.ManyToManyField(User, through='CourseSubscriber',  related_name='myclass')
    class Meta:
        db_table = 'course'



class CourseInformations(models.Model):
    course = models.OneToOneField(Course, db_column="course_id", related_name ="informations")
    cover = models.FileField (upload_to=upload_cover_url, db_column="cover")
    facebook_link = models.CharField(max_length=255L)
    twitter_link = models.CharField(max_length=255L)
    google_plus_link = models.CharField(max_length=255L)
    v_nbr = models.IntegerField(null=True, blank=True, db_column="views_nbr")
    
    class Meta:
        db_table = 'course_informations'

# Create your models here.
class CourseSubscriber(models.Model):
    course = models.ForeignKey(Course, db_column="course_id")
    student = models.ForeignKey(User, db_column="user_id")
    class Meta:
        db_table = 'course_subscriber'


class Category(models.Model):
    id = models.IntegerField(primary_key=True)
    value = models.CharField(max_length=255L, blank=True)
    followers = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = 'course_category'

class Level(models.Model):
    id = models.IntegerField(primary_key=True)
    label = models.CharField(max_length=255L)
    class Meta:
        db_table = 'course_level'


def my_callback(sender, instance, created, raw, using, **kwargs):
    if created:
        CourseInformations.objects.create(course = instance).save()
        return True
    return False
             
post_save.connect(my_callback, sender=Course)
