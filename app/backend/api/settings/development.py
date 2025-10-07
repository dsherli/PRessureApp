from .base import *

# Local development overrides
DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

# Development email/backend
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Optional: local dev additions
INSTALLED_APPS += [
    # "debug_toolbar",
]
MIDDLEWARE += [
    # "debug_toolbar.middleware.DebugToolbarMiddleware",
]
