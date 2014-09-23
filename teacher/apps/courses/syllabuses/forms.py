from django import forms
from django.utils.translation import ugettext_lazy as _

from student.apps.courses.syllabuses.models import Syllabus
from datetime import datetime

#Quiz form
class SyllabusForm(forms.Form):
    title = forms.CharField(label=_("title"), required=True)
    about = forms.CharField(label=_("About"), required=False)
    order = forms.IntegerField(label=_("Order"), required=True)
    
    def clean(self):
        # clean here
        return self.cleaned_data

    def create(self, request, user, course):
        syllabus = Syllabus(
                     author = user,
                     course = course,
                     title = self.cleaned_data["title"],
                     about = self.cleaned_data["about"],
                     order = self.cleaned_data["order"],
                     )
        syllabus.save()
        return syllabus
    
    def update(self, request, syllabus):
        syllabus.title = self.cleaned_data["title"]
        syllabus.about = self.cleaned_data["about"]
        syllabus.order = self.cleaned_data["order"]

        syllabus.save()
        return syllabus
