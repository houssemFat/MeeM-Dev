from django import forms
from django.utils.translation import ugettext_lazy as _
from .models import Contact


class ContactUsForm(forms.Form):
    email = forms.EmailField(
        widget=forms.TextInput(attrs={'placeholder': _('E-mail address'), 'class': 'form-control'}), required=True)
    name = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': _('username')}), required=True)
    text = forms.CharField(
        widget=forms.Textarea(attrs={'placeholder': _('object for contact us')}), required=True)

    def __init__(self, *args, **kwargs):
        super(ContactUsForm, self).__init__(*args, **kwargs)

    def clean(self):
        return self.cleaned_data

    def save(self, request):
        email = self.cleaned_data['email']
        text = self.cleaned_data['name']
        name = self.cleaned_data['text']
        user_id = None
        if not request.user.is_anonymous ():
            user_id = request.user.id
        # #FIXME ip_adresse = request.get_ip()
        contact = Contact.objects.create(email=email, text=text, name=name, user_id= user_id)
        return contact