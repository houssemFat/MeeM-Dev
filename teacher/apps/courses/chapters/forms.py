from django import forms
from django.utils.translation import ugettext_lazy as _

from student.apps.courses.chapters.models import Chapter



#Chapter form
class ChapterForm(forms.Form):
    start = forms.DateTimeField(label=_("start date"), required=True)
    end = forms.DateTimeField(label=_("end date"),  required=True)
    title = forms.CharField(label=_("title"), max_length=255, required=True)
    color = forms.CharField(label=_("color"), max_length=6)

    def clean(self):
        # clean here
        return self.cleaned_data

    def create(self, request, user):
        event = Chapter(
                     creator = user, 
                     start = self.cleaned_data["end"],
                     end =  self.cleaned_data["start"],
                     color = self.cleaned_data["color"],
                     title = self.cleaned_data["title"]
                     )
        event.save()
        return event
    
    def update(self, request, event):
        event.start = self.cleaned_data["start"]
        event.end =  self.cleaned_data["end"]
        event.color = self.cleaned_data["color"]
        event.title = self.cleaned_data["title"]
        event.save()
        return event
