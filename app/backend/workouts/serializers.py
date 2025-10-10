from decimal import Decimal

from django.db.models import Q
from rest_framework import serializers

from .models import Exercise, SetEntry, Workout, WorkoutExercise, WorkoutSession


class WorkoutSessionCreateSerializer(serializers.Serializer):
    workout_id = serializers.IntegerField(required=False, allow_null=True)

    def validate_workout_id(self, value):
        # Allow null/omitted (ad-hoc session)
        if value in (None, "", False):
            return None
        request = self.context.get("request")
        qs = Workout.objects.all()
        if request and request.user and request.user.is_authenticated:
            qs = qs.filter(Q(is_public=True) | Q(owner=request.user))
        else:
            qs = qs.filter(is_public=True)
        try:
            workout = qs.get(pk=value)
        except Workout.DoesNotExist:
            raise serializers.ValidationError("Invalid or unauthorized workout_id")
        return workout


class WorkoutSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutSession
        fields = ["id", "user", "workout", "started_at", "ended_at"]
        read_only_fields = fields


class SetEntryCreateSerializer(serializers.Serializer):
    order = serializers.IntegerField(required=False, allow_null=True, min_value=1)
    workout_exercise_id = serializers.IntegerField(required=False, allow_null=True)
    exercise_id = serializers.IntegerField(required=False, allow_null=True)
    reps = serializers.IntegerField(required=False, allow_null=True, min_value=0)
    weight = serializers.DecimalField(
        required=False, allow_null=True, max_digits=6, decimal_places=2
    )
    rir = serializers.IntegerField(required=False, allow_null=True, min_value=0)

    def validate(self, attrs):
        we_id = attrs.get("workout_exercise_id")
        ex_id = attrs.get("exercise_id")
        if we_id and ex_id:
            raise serializers.ValidationError(
                "Provide either workout_exercise_id or exercise_id, not both"
            )
        if not we_id and not ex_id:
            raise serializers.ValidationError(
                "workout_exercise_id or exercise_id is required"
            )
        # Fetch related objects and attach for the view
        session: WorkoutSession = self.context["session"]
        if we_id:
            try:
                we = WorkoutExercise.objects.select_related("workout").get(pk=we_id)
            except WorkoutExercise.DoesNotExist:
                raise serializers.ValidationError("Invalid workout_exercise_id")
            if session.workout and we.workout_id != session.workout_id:
                raise serializers.ValidationError(
                    "workout_exercise does not belong to the session's workout"
                )
            attrs["workout_exercise"] = we
        else:
            try:
                ex = Exercise.objects.get(pk=ex_id)
            except Exercise.DoesNotExist:
                raise serializers.ValidationError("Invalid exercise_id")
            attrs["exercise"] = ex
        return attrs


class SetEntrySerializer(serializers.ModelSerializer):
    weight = serializers.SerializerMethodField()
    exercise_id = serializers.SerializerMethodField()
    workout_exercise_id = serializers.SerializerMethodField()

    class Meta:
        model = SetEntry
        fields = [
            "id",
            "session",
            "order",
            "workout_exercise_id",
            "exercise_id",
            "reps",
            "weight",
            "rir",
        ]
        read_only_fields = ["id", "session"]

    def get_weight(self, obj: SetEntry):
        if obj.weight is None:
            return None
        try:
            return float(Decimal(obj.weight))
        except Exception:
            return str(obj.weight)

    def get_exercise_id(self, obj: SetEntry):
        return getattr(obj.exercise, "id", None)

    def get_workout_exercise_id(self, obj: SetEntry):
        return getattr(obj.workout_exercise, "id", None)


from rest_framework import serializers

from .models import SetEntry, WorkoutSession


class WorkoutSessionSerializer(serializers.ModelSerializer):

    # make sure session is tied to logged-in user when created
    class Meta:
        model = WorkoutSession
        fields = ["id", "user", "workout", "started_at", "ended_at"]
        read_only_fields = ["id", "user", "started_at"]

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


class SetEntrySerializer(serializers.ModelSerializer):

    class Meta:
        model = SetEntry
        fields = [
            "id",
            "session",
            "workout_exercise",
            "exercise",
            "order",
            "reps",
            "weight",
            "rir",
        ]
        read_only_fields = ["id", "session"]

    def validate(self, attrs):
        # reps positive, weight non-negative, rir between 0 and 10
        if attrs["reps"] < 1:
            raise serializers.ValidationError({"reps": "Reps must be positive."})
        if attrs["weight"] < 0:
            raise serializers.ValidationError(
                {"weight": "Weight must be non-negative."}
            )
        if attrs["rir"] < 0 or attrs["rir"] > 10:
            raise serializers.ValidationError({"rir": "RIR must be between 0 and 10."})

        return attrs

    def validate_session(self, session):
        # ensure you can only post to your own session
        request = self.context["request"]
        if session.user.id != request.user.id:
            raise serializers.ValidationError(
                "Cannot add sets to another user's session."
            )
        return session
