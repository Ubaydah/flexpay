from django.urls import path
from .views import ExchangeRateView, DepositView, WalletDetailsView

urlpatterns = [
    path("exchange", ExchangeRateView.as_view()),
    path("deposit", DepositView.as_view()),
    path("details", WalletDetailsView.as_view()),
]
