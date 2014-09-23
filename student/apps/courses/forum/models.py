from __future__ import unicode_literals


from django.db import models
from core.apps.accounts.models import User
from student.apps.courses.models import Course
from django.utils.datetime_safe import datetime

# forum
class CourseForum(models.Model):
    course = models.ForeignKey(Course, db_column="course_id", related_name="forums")
    author = models.ForeignKey(User, db_column="author_id", related_name="forums")
    title = models.TextField()
    description = models.TextField()
    created_at = models.DateTimeField(default=datetime.now())
    class Meta:
        db_table = 'course_forum'

# threads
class CourseForumThread(models.Model):
    forum = models.ForeignKey(CourseForum, db_column="topic_id")
    author = models.ForeignKey(User, db_column="author_id")
    votes_nbr = models.IntegerField(default=0)
    content = models.TextField()
    created_at = models.DateTimeField(default=datetime.now())
    class Meta:
        db_table = 'course_forum_thread'
