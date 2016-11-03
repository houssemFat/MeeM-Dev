from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from core.apps.accounts.models import User

class StudentManager(models.Manager):
    def create_student(self, user):
        student = self.model(user=user, level=0, age=13)
        return student


class Student(models.Model):
    objects = StudentManager()
    user = models.OneToOneField(User, primary_key=True)
    level = models.CharField(max_length=2)
    age = models.IntegerField(max_length=2)
    class Meta:
        db_table = 'student'
    