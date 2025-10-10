from django.contrib import admin

from .models import (
    Exercise,
    MuscleGroup,
    SetEntry,
    Workout,
    WorkoutExercise,
    WorkoutSession,
)


@admin.register(MuscleGroup)
class MuscleGroupAdmin(admin.ModelAdmin):
    list_display = ("name", "description")
    search_fields = ("name",)


@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ("name", "primary_muscle", "unit")
    list_filter = ("unit", "primary_muscle")
    search_fields = ("name",)


class WorkoutExerciseInline(admin.TabularInline):
    model = WorkoutExercise
    extra = 1


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ("name", "is_public", "owner")
    list_filter = ("is_public",)
    search_fields = ("name",)
    filter_horizontal = ("primary_muscle_groups", "secondary_muscle_groups")
    inlines = [WorkoutExerciseInline]


class SetEntryInline(admin.TabularInline):
    model = SetEntry
    extra = 0


@admin.register(WorkoutSession)
class WorkoutSessionAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "workout", "started_at", "ended_at")
    list_filter = ("started_at", "ended_at")
    search_fields = ("user__username", "workout__name")
    inlines = [SetEntryInline]


@admin.register(WorkoutExercise)
class WorkoutExerciseAdmin(admin.ModelAdmin):
    list_display = (
        "workout",
        "order",
        "exercise",
        "default_sets",
        "default_reps",
        "default_weight",
    )
    list_filter = ("workout", "exercise")
    ordering = ("workout", "order")


@admin.register(SetEntry)
class SetEntryAdmin(admin.ModelAdmin):
    list_display = ("session", "order", "exercise", "reps", "weight", "rir")
    list_filter = ("session", "exercise")
    ordering = ("session", "order")
