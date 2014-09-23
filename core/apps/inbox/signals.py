import django.dispatch

recieved = django.dispatch.Signal(providing_args=["message", "author", "distinator",  "request"])
