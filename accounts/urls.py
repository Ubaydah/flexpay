from django.urls import path
from .views import CompanyRegister, CompanyLogin, CreateEmployee

urlpatterns = [
    path("company", CompanyRegister.as_view()),
    path(
        "company/login",
        CompanyLogin.as_view(),
    ),
    path("company/employee", CreateEmployee.as_view()),
]
