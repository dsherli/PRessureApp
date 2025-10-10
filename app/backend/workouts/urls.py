from django.http import JsonResponse
from django.urls import path

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


from .views import (
    ProtectedWriteExample,
    SessionSetListCreate,
    WorkoutSessionDetail,
    WorkoutSessionListCreate,
    WorkoutTemplateList,
)

urlpatterns = [
    path("", workouts_index, name="workouts-index"),
    path("templates/", WorkoutTemplateList.as_view(), name="workout-templates"),
    path("sessions/", WorkoutSessionListCreate.as_view(), name="workout-sessions"),
    path(
        "sessions/<int:pk>/",
        WorkoutSessionDetail.as_view(),
        name="workout-session-detail",
    ),
    path(
        "sessions/<int:pk>/sets/",
        SessionSetListCreate.as_view(),
        name="workout-session-sets",
    ),
    path("protected-write/", ProtectedWriteExample.as_view(), name="protected-write"),
]
