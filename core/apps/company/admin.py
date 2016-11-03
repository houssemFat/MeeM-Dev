from django.contrib import admin

from models import Contact



#admin.site.unregister(User)
# Now register the new UserAdmin...
# ... and, since we're not using Django's builtin permissions,
# unregister the Group model from admin.
admin.site.register(Contact)