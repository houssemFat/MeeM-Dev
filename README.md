MeeM
=========

MeeM is a Mooc (massive open online courses) management web application.

  - Courses Management (Videos, chapters, documents, quizzes and Tasks)
  - Students (Tasks and peer reviews) management
  - Teachers collaboration and tasks management
  - Students statistics and evaluations

> The origin of meem was to provide a sample mooc plateforme for tunsian and arabic teachers to collaborate for providing ideas and new tools for education.

Sample Demo :
--------------
[Presentation]

Version
----

prototype

Tech
-----------

MeeM uses a number of open source projects to work properly:

* [Python] 
* [Django 1.7] - a nice a high-level Python Web framework that  encourages rapid development and clean, pragmatic design. 
* [MySQL] - db
* [Backbonejs] - Backbone.js is nice Javascript framework for MVC(Model, View, Controller) code structure and more.
* [Marionettejs] - composite application library for Backbone.js
* [Twitter Bootstrap] - great UI boilerplate for modern web apps.
* [FullCalendar] - A JavaScript event calendar. Customizable and open source.
* [momentjs] - Date & Time Javascript manipulation.
* [underscore] - is a JavaScript library that provides a whole mess of useful functional programming helpers without extending any built-in objects.
* [bootstrap3-wysihtml5] - Simple wysiwyg editor.
* [Djrill] - integrates the Mandrill transactional email service into Django.
* [jQuery] 


## Pre-Installation
 - install python (2.7)
 - install pip
 - pip install django
 
Installation
--------------


```sh
git clone git@github.com:houssemFat/MeeM-Dev.git (meem folder)
cd (meemfolder)
git pull dev
```

## Configuration

* Define the path to CommonJS and CommonCss folder , see [WWW]
* Define the media path 
* Configure database parametres
* Configure smtp or Mandrillapp parametres in file secret.py

in root folder
```sh
    python manage.py syncdb
    python manage.py runserver
```

License
----

MIT



[Django 1.7]:https://www.djangoproject.com/
[backbonejs]:http://backbonejs.org/
[python]:https://www.python.org/
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[fullcalendar]:http://fullcalendar.io/
[momentjs]:http://momentjs.com/
[marionettejs]:http://marionettejs.com/
[jQuery]:http://jquery.com
[underscore]:http://underscorejs.org/
[bootstrap3-wysihtml5]:https://github.com/schnawel007/bootstrap3-wysihtml5
[Djrill]:https://github.com/brack3t/Djrill
[MySQL]:http://www.mysql.com/
[WWW]:https://github.com/houssemFat/MeeM-Dev/tree/5322c75559fa1bbb985638b34a2d0af58d2afa27
[Presentation]:https://www.dropbox.com/s/uo5sfzayxj78inh/meem.wmv?dl=0
