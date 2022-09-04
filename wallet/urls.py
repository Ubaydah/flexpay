from django.urls import path
from .views import ExchangeRateView, DepositView

urlpatterns = [
    path("exchange", ExchangeRateView.as_view()),
    path("deposit", DepositView.as_view()),
]
