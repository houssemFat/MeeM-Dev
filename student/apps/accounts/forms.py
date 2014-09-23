from core.apps.accounts import tools
from django import forms
from django.utils.translation import ugettext_lazy as _

from core.apps.accounts.models import User as User
from  django.forms.util import ErrorList

from student.apps.accounts.models import Student
# create a new user
class StudentCreationForm(forms.Form):
    email = forms.EmailField(required=False)
    phone = forms.IntegerField(required=False)
    password = forms.CharField(required=True)
    username = forms.CharField(required=True)
    lastname = forms.CharField(required=True)
    authenticationType = forms.IntegerField(required=False)

    error_messages = {
                      'duplicate_email': _("A user with this email already exists."),
                      'duplicate_phone': _("A user with this phone number already exists."),
                      'choice_error': _("Please chosse between the two options."),
                      'password_mismatch': _("The two password fields didn't match."),
                      }
    class Meta:
        model = User
        fields = ("username", "lastname", "password")

    def check_authentication_choice(self):
        email = self.cleaned_data.get("email")
        phone = self.cleaned_data.get("phone")
        authType = self.cleaned_data.get("authenticationType")
        # check for authType = "email"
        if ((authType == 0) and (not email)):
            raise forms.ValidationError(self.email)
        else :
            # check for authType = "phone"
            if ((authType == 1) and (not phone)):
                raise forms.ValidationError(self.phone)
            else :
                # email
                if (authType == 0) :
                    try:
                        User.objects.get(email=email, is_manager=False)
                    except User.DoesNotExist:
                        return email
                    self._errors['email'] = ErrorList([self.error_messages['duplicate_email']])
                    return False
                # phone
                else :
                    try:
                        User.objects.get(phone=phone, is_manager=False)
                    except User.DoesNotExist:
                        return phone
                    self._errors[_("Phone")] = ErrorList([self.error_messages['duplicate_phone']])
                    return False
    
    
    def clean(self):
        self.check_authentication_choice ()
        if 'password1' in self.cleaned_data and 'password2' in self.cleaned_data:
            if self.cleaned_data['password1'] != self.cleaned_data['password2']:
                raise forms.ValidationError(_('password_matching'))
        return self.cleaned_data

    def save(self, request):
        user = User()
        from .tools import create_new_student, send_sms_confirmation
        from core.apps.accounts.tools import  setup_user_email, send_email_confirmation
        user = create_new_student(request, user, self)
        setup_user_email(request, user, [])
        
        if (user.auth_type == user.EMAIL):
            send_email_confirmation(request, user, signup=True)
        else :
            send_sms_confirmation (request, user, signup=True)
        return user

# login user
class LoginForm(forms.Form):
    login = forms.CharField(required=True)
    password = forms.CharField(required=True)
    remember = forms.BooleanField(required=False)

    user = None

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)

    def user_credentials(self):
        credentials = {}
        credentials["login"] = self.cleaned_data["login"]
        credentials["password"] = self.cleaned_data["password"]
        return credentials

    def clean(self):
        if self._errors:
            return
        user = authenticate(**self.user_credentials())
        if user:
            self.user = user
        else:
            error = _("The login and/or password you specified are not correct.")
            raise forms.ValidationError(error)
        return self.cleaned_data

    def login(self, request, redirect_url=None):
        ret = perform_login(request, self.user,
                            email_verification=app_settings.EMAIL_VERIFICATION,
                            redirect_url=redirect_url)
        if self.cleaned_data["remember"]:
            request.session.set_expiry(60 * 60 * 24 * 7 * 3)
        else:
            request.session.set_expiry(0)
        return ret


# reset form pass
class ResetPasswordForm(forms.Form):

    email = forms.EmailField(label=_("E-mail"),
                             required=True,
                             widget=forms.TextInput(attrs={"size": "30"}))

    def clean_email(self):
        email = self.cleaned_data["email"]
        email = get_helper()().clean_email(email)
        self.users = MyUser.objects \
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
            path = reverse("account_reset_password_from_key",
                           kwargs=dict(uidb36=int_to_base36(user.id),
                                       key=temp_key))
            url = 'http://%s%s' % (settings.SITE_PATH,
                                   path)
            context = {"user": user,
                       "password_reset_url": url}
            get_helper()().send_mail('accounts/professor/email/password_reset_key', email, context)
        return self.cleaned_data["email"]

