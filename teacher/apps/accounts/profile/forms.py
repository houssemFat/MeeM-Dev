from django import forms
from django.utils.translation import ugettext_lazy as _



#Cover file form
class ProfileInfosForm(forms.Form):
    bio = forms.CharField(label=_("Bio"), required=False)
    hobbies = forms.CharField(label=_("Hobbies"), required=False)
    skills = forms.CharField(label=_("Skills"), required=False)
    username = forms.CharField(label=_("Username"), required=False)
    name = forms.CharField(label=_("Name"), required=False)
    lastname = forms.CharField(label=_("LastName"), required=False)
    facebook_link = forms.CharField(label=_("Facebook Profile"), required=False)
    twitter_link = forms.CharField(label=_("Twitter usename"), required=False)
    google_plus_link = forms.CharField(label=_("Google plus page"), required=False)
    
    def clean(self):
        # clean here
        return self.cleaned_data
    
    def update_infos(self, request, user):
        name = self.cleaned_data['name'] or ""
        if len(name):
            user.name = name
        lastname = self.cleaned_data['lastname'] or ""
        if len(lastname):
            user.lastname = lastname
        username = self.cleaned_data['username'] or ""
        if len(lastname):
            user.username = username
        user.save()
        
        profile = user.profile
        profile.bio = self.cleaned_data['bio']
        profile.skills = self.cleaned_data['skills']
        profile.hobbies = self.cleaned_data['hobbies']
        profile.facebook_link = self.cleaned_data['facebook_link']
        profile.twitter_link = self.cleaned_data['twitter_link']
        profile.google_plus_link = self.cleaned_data['google_plus_link']
        profile.save()
        
        return file


#Cover file form
class CoverForm(forms.Form):
    cover_file = forms.FileField(label=_("file"), required=True)

    def clean(self):
        # clean here
        return self.cleaned_data
    
    def upload_cover(self, request, user, cover):
        user.profile.cover = cover
        user.profile.save()
        return user.profile