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
from core.apps.courses.models import Course
from django.db import models
# Model chapter describe the syllabus of a given course
class CourseGroup(models.Model):
    id = models.IntegerField(primary_key=True)
    course = models.ForeignKey(Course, db_column="course_id")
    admin = models.ForeignKey(User, db_column="admin_id")
    title = models.CharField(max_length=255L)
    about = models.CharField(max_length=255L)
    created_at = models.DateField(null=True, blank=True)
    class Meta:
        db_table = 'course_group'

class CourseGroupUser(models.Model):
    id = models.IntegerField(primary_key=True)
    group = models.ForeignKey(CourseGroup, db_column="group_id")
    member = models.ForeignKey(User, db_column="author_id")
    joined_at = models.DateField(null=True, blank=True)
    class Meta:
        db_table = 'course_group_user'

class CourseGroupActivity(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.ForeignKey(CourseGroup, db_column="author_id")
    content = models.CharField(max_length=255L)
    start_at = models.DateField(null=True, blank=True)
    end_at = models.DateField(null=True, blank=True)
    class Meta:
        db_table = 'course_group_user_activity'