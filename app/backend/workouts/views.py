from decimal import Decimal

from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import SetEntry, Workout, WorkoutSession
from .serializers import (
    SetEntryCreateSerializer,
    SetEntrySerializer,
    WorkoutSessionCreateSerializer,
    WorkoutSessionSerializer,
)


def _decimal_to_number(value: Decimal | None):
    if value is None:
        return None
    try:
        return float(value)
    except Exception:
        return str(value)


def _serialize_workout(w: Workout) -> dict:
    return {
        "id": w.id,
        "name": w.name,
        "description": w.description,
        "is_public": w.is_public,
        "owner_id": getattr(w.owner, "id", None),
        "primary_muscle_groups": list(
            w.primary_muscle_groups.values_list("name", flat=True)
        ),
    }


def _serialize_session(s: WorkoutSession, include_sets: bool = False) -> dict:
    data = {
        "id": s.id,
        "user_id": getattr(s.user, "id", None),
        "workout_id": getattr(s.workout, "id", None),
        "started_at": s.started_at,
        "ended_at": s.ended_at,
    }
    if include_sets:
        data["sets"] = [
            _serialize_set(se)
            for se in s.sets.select_related("workout_exercise", "exercise").all()
        ]
    return data


def _serialize_set(se: SetEntry) -> dict:
    return {
        "id": se.id,
        "session_id": se.session_id,
        "order": se.order,
        "workout_exercise_id": getattr(se.workout_exercise, "id", None),
        "exercise_id": getattr(se.exercise, "id", None),
        "reps": se.reps,
        "weight": _decimal_to_number(se.weight),
        "rir": se.rir,
    }


class WorkoutTemplateList(APIView):
    """Public workout templates (plus user's own if authenticated)."""

    def get(self, request):
        q = Q(is_public=True)
        if request.user.is_authenticated:
            q |= Q(owner=request.user)
        workouts = Workout.objects.filter(q).distinct().order_by("name")
        return Response([_serialize_workout(w) for w in workouts])


class WorkoutSessionListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        sessions = (
            WorkoutSession.objects.filter(user=request.user)
            .select_related("workout")
            .order_by("-started_at")
        )
        data = WorkoutSessionSerializer(sessions, many=True).data
        return Response(data)

    def post(self, request):
        ser = WorkoutSessionCreateSerializer(
            data=request.data, context={"request": request}
        )
        ser.is_valid(raise_exception=True)
        workout = ser.validated_data.get(
            "workout_id"
        )  # we return the Workout instance in validator
        s = WorkoutSession.objects.create(user=request.user, workout=workout)
        return Response(WorkoutSessionSerializer(s).data, status=201)


class WorkoutSessionDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk: int):
        s = get_object_or_404(WorkoutSession.objects.filter(user=request.user), pk=pk)
        base = WorkoutSessionSerializer(s).data
        sets = SetEntrySerializer(
            s.sets.select_related("workout_exercise", "exercise").all(), many=True
        ).data
        base["sets"] = sets
        return Response(base)


class SessionSetListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk: int):
        s = get_object_or_404(WorkoutSession.objects.filter(user=request.user), pk=pk)
        sets = s.sets.select_related("workout_exercise", "exercise").all()
        return Response([_serialize_set(se) for se in sets])

    def post(self, request, pk: int):
        s = get_object_or_404(WorkoutSession.objects.filter(user=request.user), pk=pk)

        ser = SetEntryCreateSerializer(data=request.data, context={"session": s})
        ser.is_valid(raise_exception=True)
        order = ser.validated_data.get("order")
        if order is None:
            last = s.sets.order_by("-order").first()
            order = (last.order + 1) if last else 1
        se = SetEntry.objects.create(
            session=s,
            workout_exercise=ser.validated_data.get("workout_exercise"),
            exercise=ser.validated_data.get("exercise"),
            order=order,
            reps=ser.validated_data.get("reps"),
            weight=ser.validated_data.get("weight"),
            rir=ser.validated_data.get("rir"),
        )
        return Response(_serialize_set(se), status=201)


class ProtectedWriteExample(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        return Response({"ok": True, "user": request.user.username})
