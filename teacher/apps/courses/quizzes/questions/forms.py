from django import forms
from django.utils.translation import ugettext_lazy as _

from student.apps.courses.quizzes.models import  QuizQuestion, QuizQuestionResponse

def get_quiz_type (type):
    [item[0] for item in QuizQuestion.QUIZ_TYPES if item[1] == type]
    
#Quiz form
class QuizQuestionForm(forms.Form):
    question = forms.CharField(label=_("Text"), required=True)
    #explanation = forms.CharField(label=_("Explanation"), required=False)
    #help = forms.CharField(label=_("Help"), required=False)
    max_attempts = forms.IntegerField(label=_("Max attempts"), required=True)
    note = forms.IntegerField(label=_("Note"), required=True)
    with_input = forms.BooleanField(label=_("With Input"), required=False)
    order = forms.IntegerField(label=_("Order"), required=True)
    question_type = forms.CharField(label=_("Quiz type"), required=True)
    
    def clean(self):
        # clean here
        return self.cleaned_data

    def create(self, request, user, quiz):
        quiz = QuizQuestion(
                     author = user,
                     quiz = quiz,
                     question = self.cleaned_data["question"],
                     order = self.cleaned_data["order"],
                     note = self.cleaned_data["note"],
                     max_attempts = self.cleaned_data["max_attempts"],
                     question_type = get_quiz_type (self.cleaned_data["question_type"]),
                     )
        quiz.save()
        
        return quiz
    
    def update(self, request, quiz):
        quiz.text = self.cleaned_data["question"]
        quiz.note = self.cleaned_data["note"]
        quiz.max_attempts = self.cleaned_data["max_attempts"]
        quiz.question_type = get_quiz_type (self.cleaned_data["question_type"])

        quiz.save()
        return quiz

