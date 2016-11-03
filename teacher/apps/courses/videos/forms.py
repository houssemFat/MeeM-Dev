from django import forms
from django.utils.translation import ugettext_lazy as _

from student.apps.courses.videos.models import Video, VideoFile


#Video form
class VideoForm(forms.Form):
    title = forms.CharField(label=_("title"), required=True)
    url = forms.CharField(label=_("url"), required=True)
    description = forms.CharField(label=_("description"))
    
    def clean(self):
        # clean here
        return self.cleaned_data

    def create(self, request, user, chapter):
        video = Video(
                     author = user,
                     chapter = chapter,
                     url = self.cleaned_data["url"],
                     title = self.cleaned_data["title"],
                     description = self.cleaned_data["description"]
                     )
        video.save()
        return video
    
    def update(self, request, video):
        #remove old file
        video.title = self.cleaned_data["title"]
        video.url = self.cleaned_data["url"]
        video.description = self.cleaned_data["description"]

        video.save()
        return video

#Video form
class VideoScriptForm(forms.Form):
    title = forms.CharField(label=_("title"), required=True)
    url = forms.CharField(label=_("url"), required=True)
    script_file = forms.FileField(label=_("script"), required=True)
    
    def clean(self):
        # clean here
        return self.cleaned_data

    def create(self, request, user, chapter, file):
        video = Video(
                     author = user,
                     chapter = chapter,
                     script_file =  file,
                     scriptname = file.name,
                     url = self.cleaned_data["url"],
                     title = self.cleaned_data["title"]
                     )
        video.save()
        return video
    
def update(self, request, video, file):
    #remove old file 
    import os
    import urllib
    try :
        os.remove(urllib.unquote(video.script_file.url))
    except OSError :
        pass
        
    
    video.title = self.cleaned_data["title"]
    video.url = self.cleaned_data["url"]
    video.script_file = file
    video.scriptname = file.name
    video.save()
    return video

