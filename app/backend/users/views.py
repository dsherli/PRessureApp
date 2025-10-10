from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User


def _user_payload(user: User) -> dict:
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "fitness_level": user.fitness_level,
        "preferred_units": user.preferred_units,
        "gender": user.gender,
    }


@method_decorator(ensure_csrf_cookie, name="get")
class CsrfView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"detail": "CSRF cookie set"})


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data or {}
        username = data.get("username", "").strip()
        email = data.get("email", "").strip()
        password = data.get("password", "")

        if not username or not password:
            return Response(
                {"detail": "username and password required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"detail": "username already taken"}, status=status.HTTP_400_BAD_REQUEST
            )

        user = User(username=username, email=email)
        user.set_password(password)
        user.save()

        # Log them in immediately (session cookie)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)

        return Response({"user": _user_payload(user)}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data or {}
        username = data.get("username")
        password = data.get("password")

        if not username and data.get("email"):
            # allow email login by resolving username
            try:
                username = User.objects.get(email=data["email"]).username
            except User.DoesNotExist:
                pass

        if not username or not password:
            return Response(
                {"detail": "username (or email) and password required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(request, username=username, password=password)
        if user is None:
            return Response(
                {"detail": "invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )

        auth_login(request, user)
        return Response({"user": _user_payload(user)})


class LogoutView(APIView):
    def post(self, request):
        auth_logout(request)
        return Response({"detail": "logged out"})


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"user": _user_payload(request.user)})
