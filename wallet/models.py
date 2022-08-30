from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from accounts.models import TimeStampAndUUIDBaseModel


class Wallet(TimeStampAndUUIDBaseModel):
    WALLET_TYPES = (
        ("employee", "employee"),
        ("company", "company"),
    )
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE
    )
    currency = models.CharField(max_length=50, default="USD")
    initial_bal = models.DecimalField(max_digits=200, decimal_places=3, default=0)
    earned_interest = models.DecimalField(max_digits=200, decimal_places=3, default=0)
    wallet_type = models.CharField(
        max_length=250, choices=WALLET_TYPES, default="company"
    )

    def __str__(self):
        return self.user.__str__()


class WalletTransaction(TimeStampAndUUIDBaseModel):

    TRANSACTION_TYPES = (
        ("deposit", "deposit"),
        ("transfer", "transfer"),
    )
    wallet = models.ForeignKey(Wallet, null=True, on_delete=models.CASCADE)
    transaction_type = models.CharField(
        max_length=200, null=True, choices=TRANSACTION_TYPES
    )
    description = models.CharField(max_length=250, null=True, blank=True)
    amount = models.DecimalField(max_digits=100, null=True, decimal_places=2)
    source = models.ForeignKey(
        Wallet, null=True, on_delete=models.CASCADE, related_name="source", blank=True
    )
    destination = models.ForeignKey(
        Wallet,
        null=True,
        on_delete=models.CASCADE,
        related_name="destination",
        blank=True,
    )
    status = models.CharField(max_length=100, default="pending")

    def __str__(self):
        return self.wallet.user.__str__()
