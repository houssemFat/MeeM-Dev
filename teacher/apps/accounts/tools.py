from core.apps.accounts.models import EmailAddress, EmailConfirmation, User
from django.contrib import messages
from django.contrib.auth import login
from django.conf import settings
from django.shortcuts  import resolve_url
from django.utils.translation import  to_locale, get_language
from django.http import HttpResponseRedirect
from django.shortcuts import render
import warnings
from datetime import timedelta
from datetime import datetime

from teacher.apps.accounts.models import Teacher
# import warnings
def create_new_teacher(request, user, form, commit=True):
        """
        Saves a new `User` instance using information provided in the
        signup form.
        """
        data = form.cleaned_data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        user = User.objects.create_teacher  (username, email, password)
        if commit:
            # Ability not to commit makes it easier to derive from
            # this adapter by adding
            user.save()
            student = Teacher.objects.create(user)
            student.save()
        return user

def send_email_confirmation(request, user, signup=False):
    """
    E-mail verification mails are sent:
    a) Explicitly: when a user signs up
    b) Implicitly: when a user attempts to log in using an unverified
    e-mail while EMAIL_VERIFICATION is mandatory.

    Especially in case of b), we want to limit the number of mails
    sent (consider a user retrying a few times), which is why there is
    a cooldown period before sending a new mail.
    """

    COOLDOWN_PERIOD = timedelta(minutes=3)
    email = user.email
    if email:
        try:
            email_address = EmailAddress.objects.get(user=user,
                                                     email__iexact=email)
            if not email_address.verified:
                send_email = not EmailConfirmation.objects \
                    .filter(sent__gt=datetime.now() - COOLDOWN_PERIOD,
                            email_address=email_address) \
                    .exists()
                if send_email:
                    email_address.send_confirmation(request,
                                                    signup=signup)
            else:
                send_email = False
        except EmailAddress.DoesNotExist:
            send_email = True
            email_address = EmailAddress.objects.add_email(request,
                                                           user,
                                                           email,
                                                           signup=signup,
                                                           confirm=True)
            assert email_address
            # At this point, if we were supposed to send an email we have sent it.
        if send_email:
            messages.info(request,
                          _(u"Confirmation e-mail sent to %(email)s") % {"email": email}
            )

def perform_login(request, user, redirect_url=None, signup=False, **kwargs):
    """
    Keyword arguments:

    signup -- Indicates whether or not sending the
    email is essential (during signup), or if it can be skipped (e.g. in
    case email verification is optional and we are only logging in).
    """
    # not is_active: social users are redirected to a template
    # local users are stopped due to form validation checking is_active
    # assert user.is_active
    # the user have a verified email
    has_verified_email = EmailAddress.objects.filter(user=user, verified=True).exists()

    if not has_verified_email:
        email = user.email
        set_user_message(request, messages.WARNING, 'confirmation',
                         'please check your email to active your account ' + email)
        send_email_confirmation(request, user, signup=signup)
        return render(request,
                      "tverification_sent.html",
                      {"email": email})
    else :
        # authentication backend, but I fail to see any added benefit
        # whereas I do see the downsides (having to bother the integrator
        # to set up authentication backend in settings.py
        if not hasattr(user, 'backend'):
            user.backend = "django.contrib.auth.backends.ModelBackend"
        login(request, user)
        to_locale(user.profile.lang.code or get_language())
        return HttpResponseRedirect(get_login_redirect_url(request))



def complete_signup(request, user, email_verification, success_url, signal_kwargs={}):
    return perform_login(request, user,
                         email_verification=email_verification,
                         signup=True,
                         redirect_url=success_url,
                         signal_kwargs=signal_kwargs)

def get_login_redirect_url(request):
        """
        Returns the default URL to redirect to after logging in.  Note
        that URLs passed explicitly (e.g. by passing along a `next`
        GET parameter) take precedence over the value returned here.
        """
        assert request.user.is_authenticated()
        url = getattr(settings, "LOGIN_REDIRECT_URLNAME", None)
        if url:
            warnings.warn("LOGIN_REDIRECT_URLNAME is deprecated, simply"
                          " use LOGIN_REDIRECT_URL with a URL name",
                          DeprecationWarning)
        else:
            url = settings.LOGIN_TEACHER_REDIRECT_URL
        return resolve_url(url)



def set_user_message(request, type, content):
        """
        set a django user message 
        """
        return messages.add_message(request, type, content)