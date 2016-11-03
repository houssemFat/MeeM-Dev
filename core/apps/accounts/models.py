
from django.utils.translation import get_language
from django.db import models, IntegrityError, transaction

from django.db.models.signals import post_save
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser)
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from django.core.urlresolvers import reverse
from django.utils.encoding import python_2_unicode_compatible
from datetime import timedelta, datetime
from django.db.models import Q
from django.conf import settings

from .tools import random_token

from core.apps.public.models import Language, Country, Region, State

import random

# get File url
def upload_cover(instance, filename):
    suffix = random.random ()
    return '/'.join([settings.MEDIA_ROOT, instance.user.username,   str(suffix)  + '-' + filename  ])




class UserManager(BaseUserManager):
    def create_student(self, username, email,  phone=None, auth_type = 0,  password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        _email = email
        if not email:
            if auth_type == User().EMAIL :
                raise ValueError('Users must have an email address')
            from .tools import generate_email_from_phone
            if not phone :
                raise ValueError('Users must have an email address')
            else :
                _email = generate_email_from_phone (phone)
        
        user = self.model(email=UserManager.normalize_email(_email), 
                          username=username,
                          phone=phone,
                          auth_type = auth_type
                          )
        
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_teacher(self, username, email, password,  phone=None, auth_type = 0 ):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        _email = email
        if not email:
            if auth_type == User.EMAIL :
                raise ValueError('Users must have an email address')
            from .tools import generate_email_from_phone
            if not phone :
                raise ValueError('Users must have an email address')
            else :
                _email = generate_email_from_phone (phone)
        
        user = self.model(email=UserManager.normalize_email(_email), 
                          username=username,
                          phone=phone,
                          auth_type = auth_type
                          )
        
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, email, phone=None, auth_type = 0, password=None):
        
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(username=username, email=email, password=password, phone=phone, auth_type=auth_type )
        user.auth_type = auth_type
        user.phone = phone
        user.is_admin = True
        user.is_active = True
        #user.is_superuser = True
        user.save(using=self._db)
        return user
    
    def create_user(self, username, email=None, password=None, **extra_fields):
        """
        Creates and saves a User with the given username, email and password.
        """
        now = timezone.now()
        if not username:
            raise ValueError('The given username must be set')
        email = UserManager.normalize_email(email)
        user = self.model(username=username, email=email,
                          is_staff=False, is_active=True, is_superuser=False,
                          last_login=now, date_joined=now, **extra_fields)

        user.set_password(password)
        return user

class User(AbstractBaseUser):
    EMAIL = 0
    PHONE = 1
    AUTHENTICATION_CHOICES = (
        (EMAIL, 'email'),
        (PHONE, 'phone'),
    )
    email = models.EmailField(
        #verbose_name='email address',
        max_length=255,
        unique=True,
        db_index=True,
    )
    username = models.CharField(max_length=35, blank=False)
    phone = models.IntegerField(
        max_length=20,
        unique=True,
        db_index=True,
    )
    auth_type = models.IntegerField(default=0, choices=AUTHENTICATION_CHOICES)
    is_active = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=datetime.now)
    name = models.CharField(max_length=35, blank=True)
    lastname = models.CharField(max_length=35, blank=True   )
    
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __unicode__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
    class Meta:
        db_table = 'accounts_user'
        
class Profile(models.Model):
    user = models.OneToOneField(User, db_column="user_id")
    lang = models.ForeignKey(Language, db_column="lang_id")
    country = models.ForeignKey(Country, db_column="country_id", blank=True, null=True)
    state = models.ForeignKey(State, db_column="state_id", blank=True, null=True)
    region = models.ForeignKey(Region, db_column="region_id", blank=True, null=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    bio = models.CharField(max_length=255, null=True, blank=True)
    skills = models.CharField(max_length=255, null=True,  blank=True)
    hobbies = models.CharField(max_length=255, null=True,  blank=True)
    cover = models.FileField(upload_to=upload_cover, null=True,  blank=True)
    twitter_link = models.CharField(max_length=255, null=True,  blank=True)
    facebook_link = models.CharField(max_length=255, null=True,  blank=True)
    google_plus_link = models.CharField(max_length=255, null=True,  blank=True)
    
    class Meta:
        db_table = 'accounts_profile'

class AccountSettings(models.Model):
    user = models.OneToOneField(User, db_column="user_id")
    is_phone_public = models.BooleanField(default=False)
    is_adresse_public = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'accounts_settings'

class NotificationsSettings(models.Model):
    user = models.OneToOneField(User, db_column="user_id")
    at_comment = models.BooleanField(default=False)
    at_course = models.BooleanField(default=False)
    is_msg_author_event = models.BooleanField(default=False)
    is_msg_follower_event = models.BooleanField(default=False)
    is_msg_user_follow = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'accounts_notifications_settings'
     
@python_2_unicode_compatible
class EmailAddressManager(models.Manager):
    def add_email(self, request, user, type, email, **kwargs):
        confirm = kwargs.pop("confirm", False)
        signup = kwargs.pop("signup", False)
        try:
            email_address = self.create(user=user, email=email, **kwargs)
        except IntegrityError:
            return None
        else:
            if confirm and not email_address.verified:
                email_address.send_confirmation(request, type, signup=signup)
            return email_address

    def get_primary(self, user):
        try:
            return self.get(user=user, primary=True)
        except self.model.DoesNotExist:
            return None

    def get_users_for(self, email):
        # this is a list rather than a generator because we probably want to
        # do a len() on it right away
        return [address.user for address in self.filter(verified=True,
                                                        email=email)]
    def __str__(self):
        return ""
    
@python_2_unicode_compatible
class EmailAddress(models.Model):
    user = models.ForeignKey(User, related_name = "emails")
    email = models.EmailField(unique=True)
    verified = models.BooleanField(default=False)
    primary = models.BooleanField(default=False)

    objects = EmailAddressManager()

    class Meta:
        verbose_name = _("email address")
        verbose_name_plural = _("email addresses")
        db_table = 'accounts_emailaddress'

    def __str__(self):
        return u"%s (%s)" % (self.email, self.user)

    def set_as_primary(self, conditional=False):
        old_primary = EmailAddress.objects.get_primary(self.user)
        if old_primary:
            if conditional:
                return False
            old_primary.primary = False
            old_primary.save()
        self.primary = True
        self.save()
        """ #TODO """
        #utils.user_email(self.user, self.email)
        
        self.user.save()
        return True

    def send_confirmation(self, request, type = 'student', signup=False):
        confirmation = EmailConfirmation.create(self)
        confirmation.send(request,  type , signup=signup)
        return confirmation

    def change(self, request, new_email, confirm=True):
        """
        Given a new email address, change self and re-confirm.
        """
        with transaction.commit_on_success():
            """ #TODO """
            #utils.user_email(self.user, self.email)
        
            #B$P
            self.user.save()
            self.email = new_email
            self.verified = False
            self.save()
            if confirm:
                self.send_confirmation(request)

@python_2_unicode_compatible
class EmailConfirmationManager(models.Manager):
    def all_expired(self):
        return self.filter(self.expired_q())

    def all_valid(self):
        return self.exclude(self.expired_q())

    def expired_q(self):
        sent_threshold = timezone.now() \
                         - timedelta(days=3)
        return Q(sent__lt=sent_threshold)

    def delete_expired_confirmations(self):
        self.all_expired().delete()
        
    def __str__(self):
        return u"%s (%s)" % (self.email_address, self.created)

@python_2_unicode_compatible
class EmailConfirmation(models.Model):
    email_address = models.ForeignKey(EmailAddress)
    created = models.DateTimeField(default=timezone.now)
    sent = models.DateTimeField(null=True)
    key = models.CharField(max_length=64, unique=True)

    objects = EmailConfirmationManager()

    class Meta:
        verbose_name = _("email confirmation")
        verbose_name_plural = _("email confirmations")
        db_table = 'accounts_emailconfirmation'

    def __str__(self):
        return u"confirmation for %s" % self.email_address

    @classmethod
    def create(cls, email_address):
        key = random_token([email_address.email])
        return cls._default_manager.create(email_address=email_address, key=key)

    def key_expired(self):
        expiration_date = self.sent + datetime.timedelta(days=3)
        return expiration_date <= timezone.now()

    key_expired.boolean = True

    def confirm(self, request):
        if not self.key_expired() and not self.email_address.verified:
            email_address = self.email_address
            email_address.verified = True
            email_address.set_as_primary(conditional=True)
            email_address.save()
            return email_address

    def send(self, request,  type="teacher",  signup=False, **kwargs):
        #current_site = kwargs["site"] if "site" in kwargs else Site.objects.get_current()
        activate_url = reverse("account_" + type + "_confirm_email", args=[self.key])
        activate_url = request.build_absolute_uri(activate_url)
        args = {
            "user": self.email_address.user,
            "activate_url": activate_url,
            "site": None,
            "key": self.key,
        }
        if signup:
            email_template = 'accounts/' + type  +  '/email/email_confirmation_signup'
        else:
            email_template = 'accounts/' + type  +  '/email/email_confirmation'
        from .tools import send_mail
        send_mail(email_template,self.email_address.email, args)
        self.sent = timezone.now()
        self.save()


User.backend = 'django.contrib.auth.backends.ModelBackend'

def my_callback(sender, instance, created, raw, using, **kwargs):
    if created:
        user_lang = None
        try :
            user_lang = Language.objects.get(code=get_language())
        except Language.DoesNotExist :
            user_lang = Language.objects.get(code='ar')
        profile = Profile.objects.create(user= instance, lang = user_lang)
        settings = AccountSettings.objects.create(user= instance)
        profile.save()
        settings.save()
        return True
    return False
             
post_save.connect(my_callback, sender=User)
