from django import forms
from django.utils.translation import ugettext_lazy as _

from student.apps.courses.quizzes.models import Quiz,  QuizQuestionResponse


#Quiz response form
class QuizQuestionResponseForm(forms.Form):
    title = forms.CharField(label=_("File name"), required=True)
    quiz_file = forms.FileField(label=_("file"), required=True)
    
    def clean(self):
        # clean here
        return self.cleaned_data

    def create(self, request, user, quiz, file):
        response = QuizQuestionResponse(
                     author = user,
                     quiz = quiz,
                     title = self.cleaned_data["title"]
                     )
        response.save()
        return response
    
    def update(self, request, file):
        file.title = self.cleaned_data["title"]
        file.save()
        return file
