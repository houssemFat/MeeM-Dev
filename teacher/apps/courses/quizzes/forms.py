from django import forms
from django.http import Http404
from django.utils.translation import ugettext_lazy as _

from dateutil import parser

from student.apps.courses.quizzes.models import Quiz
from student.apps.courses.chapters.models import ChapterQuizz, Chapter
from student.apps.courses.models import Course


#Quiz form
class QuizForm(forms.Form):
    about = forms.CharField(label=_("About"))
    explanation = forms.CharField(label=_("Explanation"), required=False)
    max_attempts = forms.IntegerField(label=_("Max attempts"), required=True)
    note = forms.IntegerField(label=_("Note"), required=True)
    in_grade = forms.BooleanField(label=_("In grade"), required=False)
    is_timed = forms.BooleanField(label=_("Is Timed"),  required=False)
    display_type = forms.IntegerField(label=_("Display type"), required=True)
    duration = forms.IntegerField(label=_("Duration"), required=True)
    

    end_at = ''
    due_at = ''
    
    def clean(self):
        due_at = self.due_at
        end_at = self.end_at
        if end_at < due_at :
            raise forms.ValidationError()
        return self.cleaned_data
    
    def __init__(self, *args, **kwargs):
        super(QuizForm, self).__init__(*args, **kwargs)
        data = args[0]
        self.end_at  = parser.parse(data['end_at'])
        self.due_at  = parser.parse(data['due_at'])

    def create(self, request, user):
        course = None
        chapter = None
        from_chapter = False
        if 'chapter_id' in request.POST :
            from_chapter = True
            try :
                chapter = Chapter.objects.get(pk= request.POST['chapter_id'])
                course = chapter.course
            except Chapter.DoesNotExist, e:
                return e
        elif 'course_id' in request.POST :
            try :
                course = Course.objects.get(pk = request.POST['course_id'])
            except Course.DoesNotExist, e:
                return e
        else :
            raise Http404()
        try :
            quiz = Quiz(
                         author = user,
                         course = course,
                         about = self.cleaned_data["about"],
                         note = self.cleaned_data["note"],
                         max_attempts = self.cleaned_data["max_attempts"],
                         display_type = self.cleaned_data["display_type"],
                         in_grade = self.cleaned_data["in_grade"],
                         is_timed = self.cleaned_data["is_timed"],
                         duration = self.cleaned_data["duration"],
                         due_at = self.due_at,
                         end_at = self.end_at 
                         )
            quiz.save()
            if from_chapter :
                ChapterQuizz.objects.create(quiz=quiz, chapter=chapter)
        except Exception , e :
            return e
        return quiz
    
    def update(self, request, quiz):
        quiz.about = self.cleaned_data["about"]
        quiz.note = self.cleaned_data["note"]
        quiz.max_attempts = self.cleaned_data["max_attempts"]
        quiz.display_type = self.cleaned_data["display_type"]
        quiz.in_grade = self.cleaned_data["in_grade"]
        quiz.is_timed = self.cleaned_data["is_timed"]
        quiz.duration = self.cleaned_data["duration"]
        quiz.due_at = self.due_at
        quiz.end_at = self.end_at 

        quiz.save()
        return quiz
