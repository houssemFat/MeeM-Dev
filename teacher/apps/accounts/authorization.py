from teacher.apps.accounts.models import Teacher

def is_teacher(request):
    user = request.user
    try :
        Teacher.objects.get(user=user.id)
        return True
    except Teacher.DoesNotExist:
        return False