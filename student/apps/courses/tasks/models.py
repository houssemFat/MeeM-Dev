# this file is# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#     * Rearrange models' order
#     * Make sure each model has one field with primary_key=True
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin.py sqlcustom [appname]'
# into your database.
from __future__ import unicode_literals

from core.apps.accounts.models import User as Student
from core.apps.accounts.models import User as Teacher
from student.apps.courses.chapters.models import Chapter
from django.db import models

from datetime import datetime

             
#
class Task(models.Model):
    TASK_TYPES = (
                  (0, 'submittion'),
                  (1, 'text'),
                  (2, 'other'),
             )
    chapter = models.ForeignKey(Chapter, db_column="chapter_id", related_name="tasks")
    author =  models.ForeignKey(Teacher, db_column="author_id")
    text = models.CharField(max_length=255L)
    explanation = models.CharField(max_length=255L)
    created = models.DateTimeField(default=datetime.now)
    #updated = models.DateTimeField(default=datetime.now)
    note = models.IntegerField(max_length=2)
    task_type = models.IntegerField(default=0, choices=TASK_TYPES)
    class Meta:
        db_table = 'course_chapter_task'
        
#
class TaskStudentResponse(models.Model):
    task = models.ForeignKey(Task, db_column="task_id")
    student =  models.ForeignKey(Student, db_column="student_id")
    score = models.IntegerField(null=True, blank=True)
    date =  models.DateTimeField(default=datetime.now)
    class Meta:
        db_table = 'course_chapter_task_student_response'

#
class TaskStudentResponseDetails(models.Model):
    response = models.ForeignKey(TaskStudentResponse, db_column="task_response_id")
    details = models.CharField(max_length=500L)
    class Meta:
        db_table = 'course_chapter_task_student_response_details'
# this file is black to handle circular dependencies black to handle circular dependencies