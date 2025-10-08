from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.test import TestCase
from workouts.models import (
    Exercise,
    MuscleGroup,
    SetEntry,
    Workout,
    WorkoutExercise,
    WorkoutSession,
)


class ModelFieldValidationTests(TestCase):
    def test_exercise_requires_name(self):
        mg = MuscleGroup.objects.create(name="Quads")
        e = Exercise(name="", primary_muscle=mg)
        with self.assertRaises(ValidationError):
            e.full_clean()

    def test_unit_choice_valid(self):
        mg = MuscleGroup.objects.create(name="Quads")
        e = Exercise(name="Test", primary_muscle=mg, unit="kg")
        # field-level validation
        e.full_clean()  # should not raise


User = get_user_model()


class ModelIntegrationTests(TestCase):
    def test_create_workout_and_session_and_sets(self):
        user = User.objects.create_user(username="u1", password="p")
        mg = MuscleGroup.objects.create(name="Quads")
        ex = Exercise.objects.create(name="Squat", primary_muscle=mg)

        workout = Workout.objects.create(name="Leg day", owner=user)
        we = WorkoutExercise.objects.create(workout=workout, exercise=ex, order=1)

        session = WorkoutSession.objects.create(user=user, workout=workout)
        set1 = SetEntry.objects.create(
            session=session, workout_exercise=we, order=1, reps=8, weight=100
        )

        self.assertEqual(session.sets.count(), 1)
        self.assertEqual(set1.reps, 8)
