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

from student.apps.courses.models import Course
from student.apps.courses.documents.models import Document
from student.apps.courses.quizzes.models import Quiz
from datetime import datetime
# Model chapter describe the syllabus of a given course
class Chapter(models.Model):
    id = models.IntegerField(primary_key=True)
    course = models.ForeignKey(Course, db_column="course_id", related_name="chapters")
    parent = models.ForeignKey('Chapter', db_column="chapter_id", related_name="parent_chapter")
    author = models.ForeignKey(User, db_column="author_id")
    title = models.CharField(max_length=255L)
    about = models.CharField(max_length=255L)
    created = models.DateTimeField(null=True, blank=True)
    difficulty = models.IntegerField(null=True, blank=True)
    # related through
    documents = models.ManyToManyField(Document, through='ChapterDocument',  related_name='chapters')
    quizzes = models.ManyToManyField(Quiz, through='ChapterQuizz',  related_name='quizzes')
    
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = datetime.datetime.now ()
    class Meta:
        db_table = 'course_chapter'


class ChapterDocument(models.Model):
    document = models.ForeignKey(Document, db_column="document_id")
    chapter = models.ForeignKey(Chapter, db_column="chapter_id")
        
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created =  datetime.now ()
        return super(ChapterDocument, self).save(*args, **kwargs)
    class Meta:
        db_table = 'course_chapter_document'



class ChapterQuizz(models.Model):
    quiz = models.ForeignKey(Quiz, db_column="quiz_id", related_name="chapter")
    chapter = models.ForeignKey(Chapter, db_column="chapter_id", related_name="chapter")
    
    class Meta:
        db_table = 'course_chapter_quiz'
        unique_together = ('quiz', 'chapter',)