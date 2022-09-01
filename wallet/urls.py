from django.urls import path
from .views import ExchangeRateView

urlpatterns = [
    path("exchange", ExchangeRateView.as_view()),
]
