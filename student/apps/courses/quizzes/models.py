# quiz models file
# created 01/08/2014
# update 07/09/2014
from __future__ import unicode_literals
from django.db import models

from core.apps.accounts.models import User as Student
from core.apps.accounts.models import User as Teacher
from student.apps.courses.models import Course

from datetime import datetime
QUIZ_DISPLAY_TYPES = (
                  (0, 'list'),
                  (1, 'slide'),
             )
""" #TODO """
#add title quiz 
class Quiz(models.Model):
    course = models.ForeignKey(Course, db_column="course_id", related_name="quizzes")
    author =  models.ForeignKey(Teacher, db_column="author_id")
    released = models.BooleanField(default=False)
    about = models.TextField()
    created_at = models.DateTimeField(default=datetime.now, db_column='created')
    in_grade = models.BooleanField(default=True)
    is_timed = models.BooleanField(default=False)
    duration = models.IntegerField(max_length=3)
    last_updated = models.DateTimeField(default=datetime.now)
    note = models.IntegerField(max_length=3)
    max_attempts = models.IntegerField(max_length=2, default=3)
    display_type = models.IntegerField(default=0, choices=QUIZ_DISPLAY_TYPES)
    due_at = models.DateTimeField(default=datetime.now)
    end_at = models.DateTimeField(default=datetime.now)
    
    class Meta:
        db_table = 'course_quiz'
#
class QuizQuestion(models.Model):
    QUIZ_TYPES = (
                  (0, 'multiple'),
                  (1, 'unique'),
                  (2, 'input_choice'),
                  (3, 'other'),
             )
    quiz = models.ForeignKey(Quiz, db_column="quiz_id", related_name="questions")
    author =  models.ForeignKey(Teacher, db_column="author_id", related_name="created_quizzes")
    question = models.CharField(max_length=255L)
    respnse_explanation = models.CharField(max_length=255L)
    created_at = models.DateTimeField(default=datetime.now, db_column='created')
    last_updated = models.DateTimeField(default=datetime.now)
    order = models.IntegerField(default=3, max_length=2)
    note = models.IntegerField(max_length=2)
    max_attempts = models.IntegerField(max_length=2, default=3)
    question_type = models.IntegerField(default=0, choices=QUIZ_TYPES)
    class Meta:
        db_table = 'course_quiz_question'
        
#
class QuizQuestionResponse(models.Model):
    question = models.ForeignKey(QuizQuestion, db_column="question_id", related_name="responses")
    author =  models.ForeignKey(Teacher, db_column="author_id", related_name="created_responses")
    response = models.CharField(max_length=255L)
    is_true = models.BooleanField (default=False)
    order = models.IntegerField()
    class Meta:
        db_table = 'course_quiz_question_response'
        order_with_respect_to = 'question'
#
class QuizStudentResponse(models.Model):
    quiz_question = models.ForeignKey(Quiz, db_column="quiz_question_id")
    student =  models.ForeignKey(Student, db_column="student_id", related_name="quizzes_responses")
    score = models.IntegerField(default=0)
    class Meta:
        db_table = 'course_quiz_student_response'

#
class QuizStudentResponseDetails(models.Model):
    response = models.ForeignKey(QuizStudentResponse, db_column="quiz_response_id")
    details = models.TextField()
    class Meta:
        db_table = 'course_quiz_student_response_details'
# this file is black to handle circular dependencies