from django.urls import path
from django.http import JsonResponse
from . import views

app_name = "workouts"


def workouts_index(_):
    return JsonResponse(
        {
            "app": "workouts",
            "endpoints": {
                "templates": "/api/workouts/templates/",
                "sessions": "/api/workouts/sessions/",
            },
        }
    )


urlpatterns = [
    path("", workouts_index, name="workouts-index"),
    # Workout endpoints
    # path('workouts/', views.workout_list, name='workout-list'),
    # path('workouts/<int:pk>/', views.workout_detail, name='workout-detail'),
    # path('exercises/', views.exercise_list, name='exercise-list'),
    # path('exercises/<int:pk>/', views.exercise_detail, name='exercise-detail'),
]
