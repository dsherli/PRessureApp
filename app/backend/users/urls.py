from django.http import JsonResponse
from django.urls import path

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
    # User authentication endpoints
    # path('auth/register/', views.register, name='register'),
    # path('auth/login/', views.login, name='login'),
    # path('auth/logout/', views.logout, name='logout'),
    # path('profile/', views.profile, name='profile'),
]
