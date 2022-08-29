import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken
from .managers import CustomUserManager


class TimeStampAndUUIDBaseModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    id = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )

    class Meta:
        abstract = True


class CustomUser(AbstractUser, TimeStampAndUUIDBaseModel):
    """
    custom user created with email as the username field
    """

    username = None
    email = models.EmailField(_("email address"), unique=True)
    phone_number = models.CharField(max_length=100, null=True, blank=True)
    is_employer = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}
