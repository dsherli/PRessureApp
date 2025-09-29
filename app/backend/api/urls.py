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


urlpatterns = [
    path("", api_root, name="api-root"),
    path("admin/", admin.site.urls),
    path("health/", health, name="health"),
    path("api/", include("users.urls")),
    path("api/", include("workouts.urls")),
]
