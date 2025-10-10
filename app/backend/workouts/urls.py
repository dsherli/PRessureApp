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


from .views import ProtectedWriteExample

urlpatterns = [
    path("", workouts_index, name="workouts-index"),
    path("protected-write/", ProtectedWriteExample.as_view(), name="protected-write"),
]
