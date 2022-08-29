from django.urls import path
from .views import CompanyRegister, CompanyLogin

urlpatterns = [
    path("company", CompanyRegister.as_view()),
    path(
        "company/login",
        CompanyLogin.as_view(),
    ),
]
