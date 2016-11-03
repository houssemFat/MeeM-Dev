from django import forms

from django.contrib.contenttypes.models import ContentType

from core.apps.inbox.models import Message


class MessageForm(forms.ModelForm):

    class Meta:
        model = Message
        fields = [
            "object", "message"
        ]

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop("request", None)
        self.user = kwargs.pop("user")
        super(MessageForm, self).__init__(*args, **kwargs)
        
    def save(self, commit=True):
        message = super(MessageForm, self).save(commit=False)
        message.body = self.cleaned_data['message']
        message.object = self.cleaned_data['object']
        message.author = self.user.id
        message.distinator = self.user.id
        if self.user is not None and not self.user.is_anonymous():
            message.author = self.user
        if commit:
            message.save()
        return message
