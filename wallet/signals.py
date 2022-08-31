from django.db.models.signals import post_save
from .models import Wallet
from django.dispatch import receiver
from django.conf import settings


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_wallet(sender, instance, created, **kwargs):
    if created and instance.is_employer == True:
        Wallet.objects.create(user=instance, wallet_type="company")
    elif created and instance.is_employee == True:
        Wallet.objects.create(user=instance, wallet_type="employee")
