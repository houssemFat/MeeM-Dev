from django import forms

from django.utils.dateparse import parse_datetime
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import  ValidationError
from student.apps.courses.documents.models import Document

from student.apps.courses.models import Course
from dateutil import parser


from datetime import datetime 
# create a new user
class CourseForm(forms.Form):
    title = forms.CharField(label=_("Title"), min_length=6, required=True)
    about = forms.CharField(label=_("about"), min_length=50, required=True)
    facebook_link = forms.CharField(label=_("Facebook link"), required=False)
    twitter_link = forms.CharField(label=_("Twitter link"), required=False)
    google_plus_link = forms.CharField(label=_("Twitter link"), required=False)
    
    end_at = ''
    start_at = ''
    
    class Meta:
        model = Course
    
    error_messages = {
        'error_dates': _("the start date is before the end date."),
    }
    
    def __init__(self, *args, **kwargs):
        super(CourseForm, self).__init__(*args, **kwargs)
        data = args[0]
        self.end_at  = parser.parse(data['end_at'])
        self.start_at  = parser.parse(data['start_at'])
        
    def clean(self):
        start_at = self.start_at
        end_at = self.end_at
        if end_at < start_at :
            raise forms.ValidationError()
        return self.cleaned_data
    
      
    def create(self,  user):
        course = Course(
                        title = self.cleaned_data['title'],
                        about = self.cleaned_data['about'],
                        author = user,
                        start_at = self.start_at,
                        end_at = self.end_at  )
        course.save ()
        self.update_course_infos (course)
        return course
    
    def update(self,  course):
        course.title = self.cleaned_data['title']
        course.about = self.cleaned_data['about']
        course.start_at = self.start_at
        course.end_at = self.end_at
        course.last_updated = datetime.now
        course.save ()
        self.update_course_infos (course)
        return course
    
    def update_course_infos (self, course):
        course_info = course.informations 
        course_info.google_plus_link = self.cleaned_data['google_plus_link']
        course_info.facebook_link = self.cleaned_data['facebook_link']
        course_info.twitter_link = self.cleaned_data['twitter_link']
        course_info.save () 
    
class DeletCourseForm(forms.Form):
    password = forms.CharField(required=True)

    def __init__(self, user, data=None):
        self.user = user
        super(DeletCourseForm, self).__init__(data=data)

    def clean_password(self):
        password = self.cleaned_data.get('password', None)
        if not self.user.check_password(password):
            raise ValidationError('Invalid password')


# DocumentForm
class DocumentForm(forms.Form):
    title = forms.CharField(label=_("File name"), required=True)
    file = forms.FileField(label=_("file"), required=True)
    
    def clean(self):
        # clean here
        return self.cleaned_data

    def create(self, request, user, file):
        newfile = Document(
                     author = user,
                     title = self.cleaned_data["title"],
                     location =  file
                     )
        newfile.save()
        return newfile


# DocumentForm
class CoverForm(forms.Form):
    cover_file = forms.FileField(label=_("Image "), required=True)
    
    def clean(self):
        # clean here
        return self.cleaned_data

    def update_course_cover(self, request, course, image):
        course.informations.cover = image 
        course.informations.save ()
        return course.informations