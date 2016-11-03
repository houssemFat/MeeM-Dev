from django import forms
from django.utils.translation import ugettext_lazy as _


from django.db import models
from teacher.apps.collaboration.teams.models import Team  

from datetime import datetime
#task form user
class TeamForm(forms.Form):
    created_at = models.DateTimeField(_("created"), default=datetime.now())
    color = models.CharField(label=_("color"), max_length=6)
    name = models.CharField(label=_("name"), widget=forms.TextInput(attrs={'placeholder': _('Password'), 'autocomplete': 'off'}, render_value=True),
                        required=True)
    owner = None

    def clean(self):
        if self.owner is None :
            error = _("an owner must be assigned.")
            raise forms.ValidationError(error)
        return self.cleaned_data
    
    def clean_name(self):
        name = self.cleaned_data["name"]
        team = Team.objects.get(owner = self.owner, name = name)
        if team :
            error = _("duplicate name")
            raise forms.ValidationError(error)
        return self.cleaned_data
    
    def create(self, request):
        team = Team(owner=self.owner, name =  self.cleaned_data["name"])
        team.save()
        return team
    
    def update (self, request, team):
        team.name =  self.cleaned_data["name"]
        team.update()
        return team