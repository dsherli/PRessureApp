import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient


@pytest.fixture
def client():
    return APIClient(enforce_csrf_checks=True)


@pytest.fixture
def user(db):
    User = get_user_model()
    return User.objects.create_user(
        username="tester", email="t@example.com", password="password"
    )


def get_csrf(client):
    resp = client.get("/api/users/auth/csrf/")
    assert resp.status_code == 200
    return resp.client.cookies.get("csrftoken").value


def test_me_requires_auth(client):
    resp = client.get("/api/users/auth/me/")
    assert resp.status_code in (401, 403)


def test_login_and_me(client, user):
    csrf = get_csrf(client)
    resp = client.post(
        "/api/users/auth/login/",
        {"username": "tester", "password": "password"},
        format="json",
        HTTP_X_CSRFTOKEN=csrf,
    )
    assert resp.status_code == 200
    me = client.get("/api/users/auth/me/")
    assert me.status_code == 200
    assert me.json()["user"]["username"] == "tester"
