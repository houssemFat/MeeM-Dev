from django.db import models

class Country(models.Model):
    iso_code =  models.CharField(max_length=2, unique=True, default="TN")
    name =  models.CharField(max_length=50)
    local_name =  models.CharField(max_length=50)
    def __unicode__(self):
        return self.name
    
class Language(models.Model):
    code =  models.CharField(max_length=5, default=True, blank=True)
    value =  models.CharField(max_length=20, default=True, blank=True)
        
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
