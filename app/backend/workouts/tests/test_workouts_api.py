import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from workouts.models import (
    Exercise,
    MuscleGroup,
    Workout,
)


@pytest.fixture
def client():
    return APIClient(enforce_csrf_checks=True)


@pytest.fixture
def user(db):
    User = get_user_model()
    return User.objects.create_user(
        username="tester", email="t@example.com", password="password"
    )


def csrf(client):
    resp = client.get("/api/users/auth/csrf/")
    assert resp.status_code == 200
    return resp.client.cookies.get("csrftoken").value


def login(client, user):
    token = csrf(client)
    resp = client.post(
        "/api/users/auth/login/",
        {"username": user.username, "password": "password"},
        format="json",
        HTTP_X_CSRFTOKEN=token,
    )
    assert resp.status_code == 200
    # refresh CSRF after login
    return csrf(client)


def test_templates_open(client, db):
    # create a public workout
    Workout.objects.create(name="Public W")
    resp = client.get("/api/workouts/templates/")
    assert resp.status_code == 200
    names = [w["name"] for w in resp.json()]
    assert "Public W" in names


def test_create_session_requires_auth(client, db):
    resp = client.post("/api/workouts/sessions/", {"workout_id": None}, format="json")
    assert resp.status_code in (401, 403)


def test_create_and_get_session(client, user, db):
    token = login(client, user)
    resp = client.post(
        "/api/workouts/sessions/",
        {"workout_id": None},
        format="json",
        HTTP_X_CSRFTOKEN=token,
    )
    assert resp.status_code == 201
    sid = resp.json()["id"]
    detail = client.get(f"/api/workouts/sessions/{sid}/")
    assert detail.status_code == 200
    assert detail.json()["id"] == sid


def test_add_set_validations(client, user, db):
    token = login(client, user)
    # create session
    s = client.post(
        "/api/workouts/sessions/",
        {"workout_id": None},
        format="json",
        HTTP_X_CSRFTOKEN=token,
    ).json()
    sid = s["id"]

    # both ids provided -> 400
    payload = {"order": 1, "workout_exercise_id": 1, "exercise_id": 1}
    r = client.post(
        f"/api/workouts/sessions/{sid}/sets/",
        payload,
        format="json",
        HTTP_X_CSRFTOKEN=token,
    )
    assert r.status_code == 400

    # happy path ad-hoc exercise: create a muscle/exercise first
    mg = MuscleGroup.objects.create(name="Chest")
    ex = Exercise.objects.create(name="Bench", primary_muscle=mg)
    r2 = client.post(
        f"/api/workouts/sessions/{sid}/sets/",
        {"order": 1, "exercise_id": ex.id, "reps": 5, "weight": 135, "rir": 1},
        format="json",
        HTTP_X_CSRFTOKEN=token,
    )
    assert r2.status_code == 201
    assert r2.json()["exercise_id"] == ex.id
