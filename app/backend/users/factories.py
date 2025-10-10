import random
from datetime import date, timedelta

from core.choices import ExperienceLevel, Gender, Units
from django.contrib.auth import get_user_model

User = get_user_model()


def random_date_of_birth(min_age=18, max_age=65):
    today = date.today()
    age = random.randint(min_age, max_age)
    start = today.replace(year=today.year - age)
    # random day within the year
    return start - timedelta(days=random.randint(0, 364))


def create_user(
    username: str, email: str | None = None, password: str = "password", **extra
):
    email = email or f"{username}@example.com"
    defaults = {
        "first_name": username.capitalize(),
        "last_name": "User",
        "date_of_birth": random_date_of_birth(),
        "height": round(random.uniform(1.5, 2.0), 2),
        "weight": round(random.uniform(60, 100), 1),
        "fitness_level": random.choice([*ExperienceLevel.values]),
        "preferred_units": random.choice([*Units.values]),
        "gender": random.choice([*Gender.values]),
        "is_active": True,
    }
    defaults.update(extra)
    user, created = User.objects.get_or_create(username=username, defaults=defaults)
    if created:
        user.email = email
        user.set_password(password)
        user.save()
    return user


def create_superuser(username="admin", email="admin@example.com", password="admin"):
    user, _ = User.objects.get_or_create(
        username=username,
        defaults={
            "email": email,
            "is_staff": True,
            "is_superuser": True,
            "first_name": "Admin",
            "last_name": "User",
        },
    )
    if not user.is_superuser:
        user.is_staff = True
        user.is_superuser = True
    user.set_password(password)
    user.save()
    return user
