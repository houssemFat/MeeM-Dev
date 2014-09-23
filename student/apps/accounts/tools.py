from core.apps.accounts.models import User as User
from django.utils.datastructures import SortedDict
from django.core.validators import validate_email, ValidationError
from django.db.models import EmailField
from django.core import urlresolvers

from student.apps.accounts.models import Student


import warnings
from . import settings as app_student_settings
from datetime import timedelta

try:
    from django.utils.timezone import now
except ImportError:
    from datetime import datetime

    now = datetime.now

def create_new_student(request, user, form, commit=True):
        """
        Saves a new `User` instance using information provided in the
        signup form.
        """
        data = form.cleaned_data
        username = data.get('username')
        email = data.get('email')
        phone = data.get('phone')
        password = data.get('password')
        auth_type = data.get('authenticationType')
        user = User.objects.create_student (username, email,  phone, auth_type, password)
        if commit:
            # Ability not to commit makes it easier to derive from
            # this adapter by adding
            user.save()
            student = Student.objects.create_student(user)
            student.save()
        return user

def get_email_confirmation_redirect_url(request):
        """
        The URL to return to after successful e-mail confirmation.
        """
        if request.user.is_authenticated():
            if app_student_settings.EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL:
                return \
                    app_student_settings.EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL
            else:
                return get_login_redirect_url(request)
        else:
            return app_student_settings.EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL

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
            url = app_student_settings.LOGIN_REDIRECT_URL
        return urlresolvers.reverse(url)
      
def cleanup_email_addresses(request, addresses):
    """
    Takes a list of EmailAddress instances and cleans it up, making
    sure only valid ones remain, without multiple primaries etc.

    Order is important: e.g. if multiple primary e-mail addresses
    exist, the first one encountered will be kept as primary.
    """
    # Let's group by `email`
    e2a = SortedDict()
    primary_addresses = []
    verified_addresses = []
    primary_verified_addresses = []
    for address in addresses:
        # Pick up only valid ones...
        email = valid_email_or_none(address.email)
        if not email:
            continue
            # ... and non-conflicting ones...
        from core.apps.accounts.models import EmailAddress
        if app_student_settings.UNIQUE_EMAIL and EmailAddress.objects.filter(email__iexact=email).exists():
            continue
        a = e2a.get(email.lower())
        if a:
            a.primary = a.primary or address.primary
            a.verified = a.verified or address.verified
        else:
            a = address
            a.verified = a.verified or is_email_verified(request,a.email)
            e2a[email.lower()] = a
        if a.primary:
            primary_addresses.append(a)
            if a.verified:
                primary_verified_addresses.append(a)
        if a.verified:
            verified_addresses.append(a)
        # Now that we got things sorted out, let's assign a primary
    if primary_verified_addresses:
        primary_address = primary_verified_addresses[0]
    elif verified_addresses:
        # Pick any verified as primary
        primary_address = verified_addresses[0]
    elif primary_addresses:
        # Okay, let's pick primary then, even if unverified
        primary_address = primary_addresses[0]
    elif e2a:
        # Pick the first
        primary_address = e2a.keys()[0]
    else:
        # Empty
        primary_address = None
        # There can only be one primary
    for a in e2a.values():
        a.primary = primary_address.email.lower() == a.email.lower()
    return list(e2a.values()), primary_address

def stash_verified_email(request, email):
        request.session['account_verified_email'] = email


def is_email_verified(request, email):
        """
        Checks whether or not the email address is already verified
        beyond allauth scope, for example, by having accepted an
        invitation before signing up.
        """
        ret = False
        verified_email = request.session.get('account_verified_email')
        if verified_email:
            ret = verified_email.lower() == email.lower()
        return ret


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
    from core.apps.accounts.models import EmailAddress, EmailConfirmation
    from django.conf import settings

    COOLDOWN_PERIOD = timedelta(minutes=3)
    email = user.email
    if email:
        try:
            email_address = EmailAddress.objects.get(user=user,
                                                     email__iexact=email)
            if not email_address.verified:
                send_email = not EmailConfirmation.objects \
                    .filter(sent__gt=now() - COOLDOWN_PERIOD,
                            email_address=email_address) \
                    .exists()
                if send_email:
                    email_address.send_confirmation(request, settings.STUDENT_SITE, 'student', signup=signup)
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
        """if send_email:
            messages.info(request,
                          _(u"Confirmation e-mail sent to %(email)s") % {"email": email}
            )
        """


def send_sms_confirmation(request, user, signup=False):
    """
    E-mail verification mails are sent:
    a) Explicitly: when a user signs up
    b) Implicitly: when a user attempts to log in using an unverified
    e-mail while PHONE_VALIDATION is mandatory.

    Especially in case of b), we want to limit the number of mails
    sent (consider a user retrying a few times), which is why there is
    a cooldown period before sending a new mail.
    """
    request.session['phone_verification'] = user.phone

def valid_email_or_none(email):
    ret = None
    try:
        if email:
            validate_email(email)
            if len(email) <= EmailField().max_length:
                ret = email
    except ValidationError:
        pass
    return ret