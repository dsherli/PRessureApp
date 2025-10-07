from django.contrib.auth.models import AbstractUser
from django.db import models

from core.choices import ExperienceLevel, Units, Gender


class User(AbstractUser):
    first_name = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField(null=True, blank=True)
    height = models.FloatField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    fitness_level = models.CharField(
        max_length = 20,
        choices = ExperienceLevel.choices,
        default = ExperienceLevel.BEGINNER
    )
    preferred_units = models.CharField(
        max_length=10,
        choices=Units.choices,
        default=Units.IMPERIAL,
    )
    gender = models.CharField(
        max_length = 20,
        choices = Gender.choices,
        blank = True,
        null = True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username