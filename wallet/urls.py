from django.urls import path
from .views import (
    ExchangeRateView,
    DepositView,
    WalletDetailsView,
    WalletTransactionView,
    WithdrawalView,
    EmployeeTransferView,
    TransferView,
)

urlpatterns = [
    path("exchange", ExchangeRateView.as_view()),
    path("deposit", DepositView.as_view()),
    path("details", WalletDetailsView.as_view()),
    path("transactions", WalletTransactionView.as_view()),
    path("withdrawal", WithdrawalView.as_view()),
    path("employee/transfer", EmployeeTransferView.as_view()),
    path("transfer", TransferView.as_view()),
]
