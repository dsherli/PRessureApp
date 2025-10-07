from django.db import models


class Units(models.TextChoices):
    METRIC = "metric", "Metric (kg, m)"
    IMPERIAL = "imperial", "Imperial (lb, ft)"


class ExperienceLevel(models.TextChoices):
    BEGINNER = "beginner", "Beginner"
    INTERMEDIATE = "intermediate", "Intermediate"
    ADVANCED = "advanced", "Advanced"


class Gender(models.TextChoices):
    MALE = "male", "Male"
    FEMALE = "female", "Female"
    OTHER = "other", "Other"
    UNDISCLOSED = "undisclosed", "Prefer not to say"
from django.db import models

class Units(models.TextChoices):
    METRIC = "metric", "Metric (kg, cm)"
    IMPERIAL = "imperial", "Imperial (lbs, inches)"

class ExperienceLevel(models.TextChoices):
    BEGINNER = "beginner", "Beginner"
    INTERMEDIATE = "intermediate", "Intermediate"
    ADVANCED = "advanced", "Advanced"

class Gender(models.TextChoices):
    MALE = "male", "Male"
    FEMALE = "female", "Female"
    OTHER = "other", "Other"