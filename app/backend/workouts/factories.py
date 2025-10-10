from decimal import Decimal

from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser

from .models import (
    Exercise,
    MuscleGroup,
    SetEntry,
    Workout,
    WorkoutExercise,
    WorkoutSession,
)

User = get_user_model()


DEFAULT_MUSCLE_GROUPS = [
    "Chest",
    "Back",
    "Shoulders",
    "Biceps",
    "Triceps",
    "Legs",
    "Glutes",
    "Hamstrings",
    "Quads",
    "Calves",
    "Core",
]


def get_or_create_muscle_groups(names: list[str] | None = None):
    names = names or DEFAULT_MUSCLE_GROUPS
    groups = []
    for n in names:
        mg, _ = MuscleGroup.objects.get_or_create(name=n)
        groups.append(mg)
    return groups


def create_exercise(name: str, primary_muscle: MuscleGroup, unit: str | None = None):
    unit = unit or Exercise.UNIT_LB
    ex, _ = Exercise.objects.get_or_create(
        name=name, primary_muscle=primary_muscle, defaults={"unit": unit}
    )
    return ex


def create_workout(
    name: str,
    owner: AbstractUser | None = None,
    primary: list[MuscleGroup] | None = None,
):
    workout, _ = Workout.objects.get_or_create(name=name, defaults={"owner": owner})
    if owner and not workout.owner:
        workout.owner = owner
        workout.save()
    if primary:
        workout.primary_muscle_groups.set(primary)
    return workout


def add_workout_exercise(
    workout: Workout,
    exercise: Exercise,
    order: int,
    sets: int | None = None,
    reps: int | None = None,
    weight: Decimal | float | None = None,
):
    we, _ = WorkoutExercise.objects.get_or_create(
        workout=workout,
        exercise=exercise,
        order=order,
        defaults={
            "default_sets": sets,
            "default_reps": reps,
            "default_weight": Decimal(str(weight)) if weight is not None else None,
        },
    )
    return we


def create_session(user: AbstractUser, workout: Workout | None = None):
    return WorkoutSession.objects.create(user=user, workout=workout)


def add_set(
    session: WorkoutSession,
    order: int,
    exercise: Exercise | None = None,
    workout_exercise: WorkoutExercise | None = None,
    reps: int | None = None,
    weight: Decimal | float | None = None,
    rir: int | None = None,
):
    return SetEntry.objects.create(
        session=session,
        order=order,
        exercise=exercise,
        workout_exercise=workout_exercise,
        reps=reps,
        weight=Decimal(str(weight)) if weight is not None else None,
        rir=rir,
    )


def seed_basic_demo(user: AbstractUser | None = None, create_session: bool = True):
    # Ensure muscle groups
    groups = get_or_create_muscle_groups()
    groups_by_name = {g.name: g for g in groups}

    # Create some exercises
    bench = create_exercise(
        "Bench Press", groups_by_name["Chest"], unit=Exercise.UNIT_LB
    )
    row = create_exercise("Barbell Row", groups_by_name["Back"], unit=Exercise.UNIT_LB)
    squat = create_exercise("Back Squat", groups_by_name["Legs"], unit=Exercise.UNIT_LB)

    # Workout template
    wo = create_workout(
        "Full Body A",
        owner=user,
        primary=[groups_by_name["Chest"], groups_by_name["Legs"]],
    )
    add_workout_exercise(wo, bench, 1, sets=3, reps=5, weight=135)
    add_workout_exercise(wo, row, 2, sets=3, reps=8, weight=95)
    add_workout_exercise(wo, squat, 3, sets=3, reps=5, weight=185)

    # Optional example session
    if user and create_session:
        session = create_session(user, wo)
        add_set(
            session,
            1,
            workout_exercise=wo.workout_exercises.get(order=1),
            reps=5,
            weight=135,
            rir=2,
        )
        add_set(
            session,
            2,
            workout_exercise=wo.workout_exercises.get(order=1),
            reps=5,
            weight=135,
            rir=1,
        )
        add_set(
            session,
            3,
            workout_exercise=wo.workout_exercises.get(order=1),
            reps=5,
            weight=135,
            rir=0,
        )
        return {"workout": wo, "session": session}

    return {"workout": wo}
