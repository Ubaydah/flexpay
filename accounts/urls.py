from django.urls import path
from .views import CompanyRegister

urlpatterns = [path("company", CompanyRegister.as_view())]
