# This is an auto-generated Django model module.
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
class Assignement(models.Model):
    ASSIGNEMENT_TYPES = (
                  (0, 'file'),
                  (1, 'text'),
                  (2, 'file_multiple'),
             )
    chapter = models.ForeignKey(Chapter, db_column="chapter_id", related_name="assignements")
    author =  models.ForeignKey(Teacher, db_column="author_id")
    text = models.CharField(max_length=255L)
    explanation = models.CharField(max_length=255L)
    created_at = models.DateTimeField(default=datetime.now)
    max_attempts = models.IntegerField(default=3, max_length=2)
    note = models.IntegerField(max_length=2)
    assignement_type = models.IntegerField(default=0, choices=ASSIGNEMENT_TYPES)
    is_anonymous = models.BooleanField(default=False)
    class Meta:
        db_table = 'teacher_course_chapter_assignement'


class AssignementStudentResponse(models.Model):
    assignement = models.ForeignKey(Assignement, db_column="assignement_id")
    posted_at = models.DateTimeField(default=datetime.now)
    class Meta:
        db_table = 'teacher_course_chapter_assignement_response'

class AssignementStudentResponseDetails(models.Model):
    response = models.ForeignKey(AssignementStudentResponse, db_column="assignement_details_id")
    details = models.CharField(max_length=500L)
    class Meta:
        db_table = 'teacher_course_chapter_assignement_response_details'
# this file is black to handle circular dependencies
class AssignementStudentCorrection(models.Model):
    response = models.ForeignKey(AssignementStudentResponse, db_column="assignement_response_id")
    reviser = models.ForeignKey(Student, db_column="reviser_id")
    posted_at = models.ForeignKey(Student, db_column="reviser_id")
    note = models.IntegerField()
    
    class Meta:
        db_table = 'teacher_course_chapter_assignement_correction'
        # this file is black to handle circular dependencies
class AssignementStudentCorrectionDetails(models.Model):
    correction = models.ForeignKey(AssignementStudentCorrection, db_column="assignement_response_id")
    details = models.CharField(max_length=500L)
    class Meta:
        db_table = 'teacher_course_chapter_assignement_correction_details'
