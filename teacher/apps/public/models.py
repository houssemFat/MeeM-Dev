from django.db import models
from django.utils.translation import gettext as _

class Country(models.Model):
    iso_code =  models.CharField(max_length=2, unique=True, default="TN")
    name =  models.CharField(max_length=50)
    local_name =  models.CharField(max_length=50)
    
    def __unicode__(self):
        return self.name

class State(models.Model):
    country = models.ForeignKey(Country)
    name =  models.CharField(max_length=50)
    
    def __unicode__(self):
        return self.name

class Region(models.Model):
    state = models.ForeignKey(State)
    name = models.CharField(max_length=50)
    
    def __unicode__(self):
        return self.name

class Contact(models.Model):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        db_index=True,
    )
    name = models.CharField(max_length=35, blank=False)
    text = models.CharField(max_length=1000, blank=False)

    def __unicode__(self):
       return self.name