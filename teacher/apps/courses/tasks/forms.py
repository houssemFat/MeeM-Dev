from django import forms
from django.utils.translation import ugettext_lazy as _

from student.apps.courses.tasks.models import Task


#Task form
class TaskForm(forms.Form):
    text = forms.CharField(label=_("Text"), required=True)
    explanation = forms.CharField(label=_("Explanation"), required=False)
    note = forms.IntegerField(label=_("Note"), required=True)
    task_type = forms.IntegerField(label=_("Task type"), required=True)
    
    def clean(self):
        # clean here
        return self.cleaned_data

    def create(self, request, user, chapter):
        task = Task(
                     author = user,
                     chapter = chapter,
                     text = self.cleaned_data["text"],
                     explanation = self.cleaned_data["explanation"],
                     note = self.cleaned_data["note"],
                     task_type = self.cleaned_data["task_type"],
                     )
        task.save()
        return task
    
    def update(self, request, task):
        task.text = self.cleaned_data["text"]
        task.explanation = self.cleaned_data["explanation"]
        task.note = self.cleaned_data["note"]
        task.task_type = self.cleaned_data["task_type"]

        task.save()
        return task
