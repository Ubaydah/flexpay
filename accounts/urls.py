from django.urls import path
from .views import (
    CompanyRegister,
    CompanyLogin,
    CreateEmployee,
    EmployeeSignup,
    EmployeeLogin,
)

urlpatterns = [
    path("company", CompanyRegister.as_view()),
    path(
        "company/login",
        CompanyLogin.as_view(),
    ),
    path("company/employee", CreateEmployee.as_view()),
    path("employee", EmployeeSignup.as_view()),
    path("employee/login", EmployeeLogin.as_view()),
]
