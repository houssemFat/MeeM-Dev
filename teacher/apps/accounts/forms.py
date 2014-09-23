from django import forms
from django.contrib.auth import authenticate
from django.db.models import Q
from django.utils.http import int_to_base36
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.tokens import default_token_generator
from django.core.urlresolvers import reverse
from django.conf  import settings 
from django.core.exceptions import ObjectDoesNotExist

from core.apps.accounts.models import User, EmailAddress
from teacher.apps.accounts.models import Teacher, TeacherProfile
from core.apps.accounts.tools import setup_user_email, send_email_confirmation

#login user
class LoginForm(forms.Form):
    email = forms.EmailField(
        widget=forms.TextInput(attrs={'placeholder': _('E-mail address'), 'class': 'form-control'}), required=True)
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': _('Password'), 'autocomplete': 'off'}, render_value=False),
        required=True)
    remember = forms.BooleanField(label=_("Remember Me"),
                                  required=False)

    user = None

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)

    def user_credentials(self):
        credentials = {}
        credentials["email"] = self.cleaned_data["email"]
        credentials["password"] = self.cleaned_data["password"]
        return credentials

    def clean(self):
        if self._errors:
            return
        user = authenticate(**self.user_credentials())
        if user:
            try :
                teacher = Teacher.objects.get(user=user)
                if teacher: 
                    self.user = user
            except ObjectDoesNotExist :
                error = _("You have been register as student, please register as teacher.")
                raise forms.ValidationError(error)
            
        else:
            error = _("The login and/or password you specified are not correct.")
            raise forms.ValidationError(error)
        return self.cleaned_data

    def login(self, request, redirect_url=None):
        from .tools import perform_login
        ret = perform_login(request, self.user, redirect_url, False)
        if self.cleaned_data["remember"]:
            request.session.set_expiry(60 * 60 * 24 * 7 * 3)
        else:
            request.session.set_expiry(0)
        return ret


# create a new user
class TeacherUpgradeForm(forms.Form):
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': _('Password'), 'autocomplete': 'off'}, render_value=False),
        required=True)
    cin = forms.IntegerField(
        widget=forms.TextInput(attrs={'placeholder': _('CIN'), 'class': 'form-control'}), required=True)
   
    
    def __init__(self,  *args, **kwargs):
        intital = kwargs.pop('initial')
        self.request = intital.pop('request')
        return super(TeacherUpgradeForm, self).__init__(*args, **kwargs)
    
    def clean_password(self):
        password = self.cleaned_data.get('password', None)
        if not password:
            raise forms.ValidationError(_("Empty Password."))
        if not self.request.user.check_password(password):
            raise forms.ValidationError('Invalid password')
        return password
    
    
    
    def save(self, request):
        try : 
            user = User.objects.get(pk=request.user.id)
            Teacher.objects.create(user=user, cin=self.cleaned_data.get('cin'))
            # TODO: Add request?
            #super(UserCreationForm, self).save(user)
            # TODO: Move into adapter `save_user` ?
            setup_user_email(request, user, [])
            return user
        except User.DoesNotExist :
            raise forms.ValidationError('This user doesn\'t exist password')
        

# create a new user
class TeacherCreationForm(forms.Form):
    username = forms.CharField(label=_("Username"),
                               max_length=35,
                               widget=forms.TextInput(
                                   attrs={'placeholder': _('Username'), 'autocomplete': 'off', 'direction': 'rtl'}))
    email = forms.EmailField(
        widget=forms.TextInput(attrs={'placeholder': _('E-mail address'), 'class': 'form-control'}), required=True)
    password1 = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': _('Password'), 'autocomplete': 'off'}, render_value=False),
        required=True)
    password2 = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': _("Password (again)")}, render_value=False), required=True)

    error_messages = {
        'duplicate_email': _("A user with that email already exists."),
        'password_mismatch': _("The two password fields didn't match."),
    }
    class Meta:
        model = User
        fields = ("username", "email")

    def clean_username(self):
        username = self.cleaned_data.get("username")
        if username:
            return username
        raise forms.ValidationError(_("Empty Username."))

    def clean_email(self):
        email = self.cleaned_data.get("email")
        try:
            EmailAddress.objects.get(email=email)
        except EmailAddress.DoesNotExist:
            return email
        raise forms.ValidationError(self.error_messages['duplicate_email'])
    
    def clean(self):
        if 'password1' in self.cleaned_data and 'password2' in self.cleaned_data:
            if self.cleaned_data['password1'] != self.cleaned_data['password2']:
                raise forms.ValidationError(_('password_matching'))
        return self.cleaned_data

    def save(self, request):
        user = User()
        from .tools import create_new_teacher
        user = create_new_teacher(request, user, self)
        # save the new teacher account
        # TODO : Add request?
        # super (UserCreationForm, self).save(user)
        # TODO: Move into adapter `save_user` ?
        setup_user_email(request, user, [])
        return user


# reset form pass
class ResetPasswordForm(forms.Form):

    email = forms.EmailField(
                            required=True,
                            widget=forms.TextInput(attrs={"size": "50", 'placeholder': _('E-mail address'), 'class': 'form-control'}))

    def clean_email(self):
        email = self.cleaned_data["email"]
        self.users = User.objects \
            .filter(Q(email__iexact=email)
                    | Q(emailaddress__email__iexact=email)).distinct()
        if not self.users.exists():
            raise forms.ValidationError(_("The e-mail address is not assigned"
                                          " to any user account"))
        return self.cleaned_data["email"]

    def save(self, **kwargs):
        email = self.cleaned_data["email"]
        token_generator = kwargs.get("token_generator",
                                     default_token_generator)

        for user in self.users:
            temp_key = token_generator.make_token(user)

            # save it to the password reset model
            # password_reset = PasswordReset(user=user, temp_key=temp_key)
            # password_reset.save()

            # send the password reset email
            path = reverse("teacher_account_reset_password_from_key",
                           kwargs=dict(uidb36=int_to_base36(user.id),
                                       key=temp_key))
            url = 'http://%s%s' % (settings.TEACHER_SITE, path)
            context = {"user": user,  "password_reset_url": url}
            from core.apps.accounts.tools import  send_mail
            send_mail('taccount/email/password_reset_key', email, context)
        return self.cleaned_data["email"]




class ResetPasswordKeyForm(forms.Form):

    password1 = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': _('Password'), 'autocomplete': 'off', 'class': 'form-control'}, render_value=False),
        required=True)
    password2 = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': _('retype Password'), 'autocomplete': 'off', 'class': 'form-control'}, render_value=False),
        required=True)

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop("user", None)
        self.temp_key = kwargs.pop("temp_key", None)
        super(ResetPasswordKeyForm, self).__init__(*args, **kwargs)

    # FIXME: Inspecting other fields -> should be put in def clean(self) ?
    def clean_password2(self):
        if ("password1" in self.cleaned_data
                and "password2" in self.cleaned_data):
            if (self.cleaned_data["password1"]
                    != self.cleaned_data["password2"]):
                raise forms.ValidationError(_("You must type the same"
                                              " password each time."))
        return self.cleaned_data["password2"]

    def save(self):
        # set the new user password
        user = self.user
        user.set_password(self.cleaned_data["password1"])
        user.save()

def init_profile (user):
    teacher = Teacher.objects.create(user=user)
    teacher.save()
    privacy = TeacherProfile.objects.create(teacher=teacher)
    privacy.save()
    
