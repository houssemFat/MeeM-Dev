from django.db import models

from datetime import datetime


class Contact(models.Model):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        db_index=True,
    )
    name = models.CharField(max_length=35, blank=False)
    text = models.CharField(max_length=1000, blank=False)
    is_anonymous = models.BooleanField(default=True)
    user_id = models.IntegerField(blank=True)
    posted_at = models.DateField(default=datetime.now())
    ip_address = models.GenericIPAddressField()
    
    def __unicode__(self):
        return self.name
    
    class Meta:
        db_table = 'company_contact'