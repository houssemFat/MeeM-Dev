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
from student.apps.courses.chapters.models import Chapter
from student.apps.courses.documents.models import Document

from django.db import models
from django.conf import settings
from datetime import datetime


# get File url
def script_file_url(instance, filename):
    return '/'.join([settings.MEDIA_ROOT, instance.author.username, filename])

# Model chapter describe the syllabus of a given course
class Video(models.Model):
    chapter = models.ForeignKey(Chapter, db_column="chapter_id", related_name="videos")
    author = models.ForeignKey(User, db_column="author_id")
    title = models.CharField(max_length=255L)
    description = models.CharField(max_length=255L)
    script_file = models.FileField( upload_to=script_file_url)
    scriptname = models.CharField(max_length=255L, db_column="script_name")
    url = models.CharField(max_length=255L)
    created = models.DateTimeField(default=datetime.now)
    
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = datetime.now ()
        return super(Video, self).save(*args, **kwargs)
    
    class Meta:
        db_table = 'course_chapter_video'

class VideoDocument(models.Model):
    video = models.ForeignKey(Video, db_column="video_id", related_name="documents")
    document = models.ForeignKey(Document, db_column="document_id", related_name="videos")
    class Meta:
        db_table = 'course_chapter_video_document'