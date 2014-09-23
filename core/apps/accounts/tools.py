import random

from django.conf import settings
from django.contrib import messages
from django.core.validators import validate_email, ValidationError

from django.core.mail import EmailMultiAlternatives, EmailMessage
from django.db.models import EmailField

from django.utils.translation import ugettext_lazy as _
from django.utils.http import urlencode
from django.template.loader import render_to_string
from django.template import TemplateDoesNotExist
from django.utils.datastructures import SortedDict

try:
    from django.utils.encoding import force_text
except ImportError:
    from django.utils.encoding import force_unicode as force_text

#from .adapter import get_adapter

# In Python 2.5+, the sha library was deprecated in favor of hashlib.
try:
    import hashlib

    sha_constructor = hashlib.sha1
except ImportError:
    import sha

    sha_constructor = sha.new

from datetime import timedelta

try:
    from django.utils.timezone import now
except ImportError:
    from datetime import datetime

    now = datetime.now

###############################
# E-MAIL ADDRESS VERIFICATION #
###############################

# We use the same e-mail verification functions for account creation
# and password reset, but each takes a 'task' argument, which is either
# CREATE_TASK or RESET_TASK.




def send_email_confirmation(request, user, type="student", signup=False):
    """
    E-mail verification mails are sent:
    a) Explicitly: when a user signs up
    b) Implicitly: when a user attempts to log in using an unverified
    e-mail while EMAIL_VERIFICATION is mandatory.

    Especially in case of b), we want to limit the number of mails
    sent (consider a user retrying a few times), which is why there is
    a cooldown period before sending a new mail.
    """
    from .models import EmailAddress, EmailConfirmation

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
                    email_address.send_confirmation(request, type, signup=signup)
            else:
                send_email = False
        except EmailAddress.DoesNotExist:
            send_email = True
            email_address = EmailAddress.objects.add_email(request,
                                                           user,
                                                           type,
                                                           email,
                                                           signup=signup,
                                                           confirm=True)
            assert email_address
            # At this point, if we were supposed to send an email we have sent it.
        if send_email:
            messages.info(request,
                          _(u"Confirmation e-mail sent to %(email)s") % {"email": email}
            )
def format_email_subject(subject, context, site=None):
        # FIXME
        prefix = None
        if prefix is None:
            if site in context :
                site = context['site']#Site.objects.get_current()
                prefix = u"[{name}] ".format(name = site)
                return prefix + force_text(subject)
            else:
                return None
        else:
                return None
        
    
def send_mail(template_prefix, email, context):
        """
        Sends an e-mail to `email`.  `template_prefix` identifies the
        e-mail that is to be sent, e.g. "accounts/account/email/email_confirmation"
        """
        subject = render_to_string('{0}_subject.txt'.format(template_prefix), context)
        # remove superfluous line breaks
        subject = " ".join(subject.splitlines()).strip()
        subject = format_email_subject(subject, context)

        bodies = {}
        
        for ext in ['html', 'txt']:
            # get the body as txt file
            template_name = '{0}_message.{1}'.format(template_prefix, ext)
            try :
                bodies[ext] = render_to_string(template_name, context).strip()
            except TemplateDoesNotExist:
                if ext == 'txt' and not bodies:
                    # We need at least one body
                    raise
        if 'txt' in bodies:
            msg = EmailMultiAlternatives(subject,
                                         bodies['txt'],
                                         settings.EMAIL_NO_REPLY,
                                         [email])
            if 'html' in bodies:
                msg.attach_alternative(bodies['html'], 'text/html')
        else:
            msg = EmailMessage(subject,
                               bodies['html'],
                               settings.EMAIL_NO_REPLY,
                               [email])
            msg.content_subtype = 'html'  # Main content is now text/html
        msg.send()
        
def sync_user_email_addresses(user):
    """
    Keep user.email in sync with user.emailadress_set.
    Under some circumstances the user.email may not have ended up as
    an EmailAddress record, e.g. in the case of manually created admin
    users.
    """
    from .models import EmailAddress
    email = user.email
    if email and not EmailAddress.objects.filter(user=user,
                                                 email__iexact=email).exists():
        if  EmailAddress.objects.filter(email__iexact=email).exists():
            # Bail out
            return EmailAddress.objects.create(user=user,
                                    email=email,
                                    primary=False,
                                    verified=False)


def random_token(extra=None, hash_func=hashlib.sha256):
    if extra is None:
        extra = []
    bits = extra + [str(random.SystemRandom().getrandbits(512))]
    return hash_func("".join(bits).encode('utf-8')).hexdigest()


def generate_email_from_phone(phone):
    return str(phone) + '@meem-temp.tn';

def get_next_redirect_url (request, redirect_field_name):
    return str(redirect_field_name) + '@meem-temp.tn';

def pass_through_next_redirect_url(request, url, redirect_field_name):
    assert url.find("?") < 0  # TODO: Handle this case properly
    next_url = get_next_redirect_url(request, redirect_field_name)
    if next_url:
        url = url + '?' + urlencode({redirect_field_name: next_url})
    return url
def unstash_verified_email(request):
        ret = request.session.get('account_verified_email')
        request.session['account_verified_email'] = None
        return ret


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
        if settings.UNIQUE_EMAIL and EmailAddress.objects.filter(email__iexact=email).exists():
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
   
def setup_user_email(request, user, addresses):
    """
    Creates proper EmailAddress for the user that was just signed
    up. Only sets up, doesn't do any other handling such as sending
    out email confirmation mails etc.
    """
    from core.apps.accounts.models import EmailAddress

    assert EmailAddress.objects.filter(user=user).count() == 0
    priority_addresses = []
    # Is there a stashed e-mail?

    stashed_email = unstash_verified_email(request)
    if stashed_email:
        priority_addresses.append(EmailAddress(user=user,
                                               email=stashed_email,
                                               primary=True,
                                               verified=True))
    try :
        email = getattr(user, 'email')
        if email:
            priority_addresses.append(EmailAddress(user=user,
                                               email=email,
                                               primary=True,
                                               verified=False))
        else:
            raise Exception('Unknown template variable')
    
    except ValueError:
        raise Exception(ValueError)
    addresses, primary = cleanup_email_addresses(request,
                                                 priority_addresses
                                                 + addresses)
    for a in addresses:
        a.user = user
        a.save()
    if (primary
        and email
        and email.lower() != primary.email.lower()):
        user.email = primary.email
        user.save()
    return primary


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
