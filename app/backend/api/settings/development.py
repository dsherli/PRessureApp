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

REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
}
