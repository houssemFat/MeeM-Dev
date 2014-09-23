from django import forms
from django.utils.translation import ugettext_lazy as _

from student.apps.courses.forum.models import CourseForum #, CourseForumThread


#Quiz form
class CourseForumForm(forms.Form):
    title = forms.CharField(label=_("Text"), required=True)
    description = forms.CharField(label=_("Explanation"), required=False)
    
    def clean(self):
        # clean here
        return self.cleaned_data

    def create(self, request, user, course):
        quiz = CourseForum(
                     author = user,
                     course = course,
                     title = self.cleaned_data["title"],
                     description = self.cleaned_data["description"]
                     )
        quiz.save()
        return quiz
    
    def update(self, request, quiz):
        quiz.title = self.cleaned_data["text"]
        quiz.description = self.cleaned_data["description"]
        quiz.save()
        return quiz
