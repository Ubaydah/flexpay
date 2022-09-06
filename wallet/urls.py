from django.urls import path
from .views import (
    ExchangeRateView,
    DepositView,
    WalletDetailsView,
    WalletTransactionView,
    WithdrawalView,
)

urlpatterns = [
    path("exchange", ExchangeRateView.as_view()),
    path("deposit", DepositView.as_view()),
    path("details", WalletDetailsView.as_view()),
    path("transactions", WalletTransactionView.as_view()),
    path("withdrawal", WithdrawalView.as_view()),
]