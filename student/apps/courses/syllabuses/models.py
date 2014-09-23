# quiz models file
# created 01/08/2014
# update 07/09/2014
from __future__ import unicode_literals
from django.db import models

from core.apps.accounts.models import User as Student
from core.apps.accounts.models import User as Teacher
from student.apps.courses.models import Course

from datetime import datetime
#
class Syllabus(models.Model):
    course = models.ForeignKey(Course, db_column="course_id", related_name="syllabuses")
    author =  models.ForeignKey(Teacher, db_column="author_id")
    about = models.TextField()
    created_at = models.DateTimeField(default=datetime.now, db_column='created')
    last_updated = models.DateTimeField(default=datetime.now)
    order = models.IntegerField(max_length=2)
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = datetime.now ()
        self.last_updated = datetime.now ()
        return super(Syllabus, self).save(*args, **kwargs)
    
    class Meta:
        db_table = 'course_syllabus'
        ordering = ['order'] 
