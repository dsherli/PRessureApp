"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def health(_):
    return JsonResponse({"Ok": True})


def api_root(_):
    return JsonResponse(
        {
            "message": "Welcome to PRessure App API",
            "version": "1.0",
            "endpoints": {"health": "/health/", "admin": "/admin/", "api": "/api/"},
        }
    )


def api_index(_):
    # a small machine-friendly index for /api/
    return JsonResponse(
        {
            "api": "PRessure App API",
            "version": "1.0",
            "endpoints": {
                "health": "/health/",
                "users": "/api/users/",
                "workouts": "/api/workouts/",
            },
        }
    )


urlpatterns = [
    path("", api_root, name="api-root"),
    path("admin/", admin.site.urls),
    path("health/", health, name="health"),
    # API index and explicit subpaths so /api/ and /api/<app>/ work predictably
    path("api/", api_index, name="api-index"),
    path("api/users/", include("users.urls")),
    path("api/workouts/", include("workouts.urls")),
]
