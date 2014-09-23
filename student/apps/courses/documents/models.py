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
from django.conf import settings

from datetime import datetime
import random 
      
# get File url
def upload_file_url(instance, filename):
    suffix = random.random ()
    
    return '/'.join([settings.MEDIA_ROOT, instance.author.username,   str(suffix)  + '-' + filename  ])

class Document(models.Model):
    author = models.ForeignKey(User, db_column="author_id", related_name="documents")
    title = models.CharField(max_length=255L)
    location = models.FileField( upload_to=upload_file_url)
    created = models.DateTimeField(default=datetime.now, db_column="created")
        
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created =  datetime.now ()
        return super(Document, self).save(*args, **kwargs)
    class Meta:
        db_table = 'course_document'
