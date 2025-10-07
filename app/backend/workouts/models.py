from django.db import models
from django.conf import settings  # user model

class MuscleGroup(models.Model):
    name = models.CharField(max_length=64, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Workout(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    primary_muscle_groups = models.ManyToManyField(MuscleGroup, blank=True)
    secondary_muscle_groups = models.ManyToManyField(MuscleGroup, related_name="secondary_exercises", blank=True)
    is_public = models.BooleanField(default=True)

    def __str__(self):
        return self.name
        
class Exercise(models.Model):
    name = models.CharField(max_length=64)
    primary_muscle = models.ForeignKey(MuscleGroup, on_delete=models.PROTECT, related_name="primary_exercises")
    UNIT_KG = "kg"
    UNIT_LB = "lb"
    UNIT_SEC = "sec"
    UNIT_CHOICES = [
        (UNIT_KG, "Kilograms"),
        (UNIT_LB, "Pounds"),
        (UNIT_SEC, "Seconds"),
    ]

    unit = models.CharField(max_length=16, choices=UNIT_CHOICES, default=UNIT_LB)

    def __str__(self):
        return self.name
    
class WorkoutExercise(models.Model):
    workout = models.ForeignKey(Workout, related_name="workout_exercises", on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    default_reps = models.PositiveIntegerField(null=True, blank=True)
    default_sets = models.PositiveIntegerField(null=True, blank=True)
    default_weight =models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.workout.name} - {self.order}: {self.exercise.name}"

class WorkoutSession(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    workout = models.ForeignKey(Workout, null=True, blank=True, on_delete=models.SET_NULL)
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)

    def duration_seconds(self):
        if self.ended_at:
            return int((self.ended_at - self.started_at).total_seconds())
        return None

    def __str__(self):
        return f"Session {self.id} by {self.user}"

class SetEntry(models.Model):
    session = models.ForeignKey(WorkoutSession, related_name="sets", on_delete=models.CASCADE)
    workout_exercise = models.ForeignKey(WorkoutExercise, null=True, blank=True, on_delete=models.SET_NULL)
    exercise = models.ForeignKey(Exercise, null=True, blank=True, on_delete=models.SET_NULL)
    order = models.PositiveIntegerField(default=0)
    reps = models.PositiveIntegerField(null=True, blank=True)
    weight = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    rir = models.PositiveSmallIntegerField(null=True, blank=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"Set {self.order} for session {self.session_id}"