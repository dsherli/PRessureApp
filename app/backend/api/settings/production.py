import os

import environ

from .base import *

# Initialize environment variables
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

# Production overrides
DEBUG = False
# In production we expect ALLOWED_HOSTS set via env
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=["yourdomain.com"])

# Security settings you should enable in production
SECURE_SSL_REDIRECT = env.bool("SECURE_SSL_REDIRECT", default=True)
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = env.int("SECURE_HSTS_SECONDS", default=3600)
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Static files - whitenoise already in middleware
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
