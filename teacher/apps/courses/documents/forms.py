from django import forms
from django.utils.translation import ugettext_lazy as _

from student.apps.courses.documents.models import Document, ChapterDocument



#Video file form
class DocumentForm(forms.Form):
    title = forms.CharField(label=_("File name"), required=True)
    course_document = forms.FileField(label=_("file"), required=True)
    
    def clean(self):
        # clean here
        return self.cleaned_data

    def create(self, request, user, chapter, file):
        newfile = Document(
                     author = user,
                     location =  file,
                     title = self.cleaned_data["title"]
                     )
        newfile.save()
        chapter_document = ChapterDocument(document=newfile, chapter=chapter)
        chapter_document.save ();
        return newfile
    
    def update(self, request, file):
        file.title = self.cleaned_data["title"]
        file.save()
        return file
