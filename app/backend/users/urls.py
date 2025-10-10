from django.http import JsonResponse
from django.urls import path

from .views import CsrfView, LoginView, LogoutView, MeView, RegisterView

app_name = "users"


def users_index(_):
    return JsonResponse(
        {
            "app": "users",
            "endpoints": {
                "list": "/api/users/",
                "detail": "/api/users/<id>/",
            },
        }
    )


urlpatterns = [
    path("", users_index, name="users-index"),
    # Auth endpoints (session + CSRF)
    path("auth/csrf/", CsrfView.as_view(), name="csrf"),
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/logout/", LogoutView.as_view(), name="logout"),
    path("auth/me/", MeView.as_view(), name="me"),
]
