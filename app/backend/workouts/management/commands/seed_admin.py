from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from users.factories import create_superuser, create_user
from workouts.factories import seed_basic_demo


class Command(BaseCommand):
    help = "Seed the database with basic data for admin/demo. Creates superuser and demo content."

    def add_arguments(self, parser):
        parser.add_argument(
            "--no-superuser", action="store_true", help="Do not create admin superuser"
        )
        parser.add_argument(
            "--admin-username", default="admin", help="Superuser username"
        )
        parser.add_argument(
            "--admin-email", default="admin@example.com", help="Superuser email"
        )
        parser.add_argument(
            "--admin-password", default="admin", help="Superuser password"
        )
        parser.add_argument(
            "--users", type=int, default=2, help="Number of demo users to create"
        )
        parser.add_argument(
            "--no-sessions",
            action="store_true",
            help="Do not create example workout sessions (keeps seeding idempotent)",
        )

    def handle(self, *args, **options):
        User = get_user_model()

        if not options["no_superuser"]:
            su = create_superuser(
                username=options["admin_username"],
                email=options["admin_email"],
                password=options["admin_password"],
            )
            self.stdout.write(self.style.SUCCESS(f"Ensured superuser: {su.username}"))

        # Create some demo users and workouts
        for i in range(1, options["users"] + 1):
            username = f"demo{i}"
            user = User.objects.filter(username=username).first() or create_user(
                username=username, email=f"{username}@example.com", password="password"
            )
            ctx = seed_basic_demo(user, create_session=not options["no_sessions"])
            self.stdout.write(
                self.style.SUCCESS(
                    f"Seeded demo for {user.username}: {ctx['workout'].name}"
                )
            )

        # Also seed public content without a specific user
        ctx = seed_basic_demo(None, create_session=False)
        self.stdout.write(
            self.style.SUCCESS(f"Seeded public workout: {ctx['workout'].name}")
        )

        self.stdout.write(self.style.SUCCESS("Seeding complete."))
