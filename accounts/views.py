import django_filters
from django.utils import timezone
from django.template.loader import render_to_string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, filters
from .models import CompanyProfile, CustomUser, EmployeeeProfile
from .permissions import EmployerAccess
from .serializers import (
    CompanyRegistrationSerializer,
    EmployeeRegisterSerializer,
    EmployeeSignupSerializer,
    EmployeeViewSerializer,
)
from accounts.services.auth_user import AuthService
from flexpay.utils.helpers import Helper


class CompanyRegister(APIView):
    queryset = CustomUser
    serializer_class = CompanyRegistrationSerializer

    def post(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(
                {"status": True, "message": "company registration successsful"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            code, data = Helper.error_response(code=400, message=str(e))
            return Response(data=data, status=code)


class CompanyLogin(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            user = AuthService.login_handler(email, password)

            if user.is_employer == False:
                code, data = Helper.error_response(
                    code=400, message="You don't have a company account"
                )
                return Response(data=data, status=code)
            user.last_login = timezone.now()
            user.save()
            company = CompanyProfile.objects.get(user=user)
            data = {
                "id": user.id,
                "email": user.email,
                "company_name": company.company_name,
                "tokens": {"access": user.tokens()["access"]},
                "last_login": user.last_login,
            }
            code, result = Helper.success_response(data, "login successful")
            return Response(data=result, status=code)

        except ValueError as e:
            code, data = Helper.error_response(code=400, message=str(e))
            return Response(data=data, status=code)


class CreateEmployee(APIView):
    serializer_class = EmployeeRegisterSerializer
    queryset = EmployeeeProfile
    permission_classes = [(IsAuthenticated & EmployerAccess)]

    def post(self, request):
        try:
            serializer = self.serializer_class(
                data=request.data, context={"request": request}
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(
                {"status": True, "message": "employee registration successsful"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            code, data = Helper.error_response(code=400, message=str(e))
            return Response(data=data, status=code)


class EmployeeSignup(APIView):
    serializer_class = EmployeeSignupSerializer
    queryset = EmployeeeProfile

    def post(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            employee = serializer.save()

            data = {
                "id": employee.id,
                "email": employee.user.email,
                "name": employee.name,
                "role": employee.role,
                "company_name": employee.company.company_name,
            }
            code, result = Helper.success_response(data, "signup successful")
            return Response(data=result, status=code)

        except ValueError as e:
            code, data = Helper.error_response(code=400, message=str(e))
            return Response(data=data, status=code)


class EmployeeLogin(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            user = AuthService.login_handler(email, password)

            if user.is_employee == False:
                code, data = Helper.error_response(
                    code=400, message="You don't have an employee account"
                )
                return Response(data=data, status=code)
            user.last_login = timezone.now()
            user.save()
            employee = EmployeeeProfile.objects.get(user=user)
            data = {
                "id": user.id,
                "email": user.email,
                "name": employee.name,
                "role": employee.role,
                "company_name": employee.company.company_name,
                "tokens": {"access": user.tokens()["access"]},
                "last_login": user.last_login,
            }
            code, result = Helper.success_response(data, "login successful")
            return Response(data=result, status=code)

        except ValueError as e:
            code, data = Helper.error_response(code=400, message=str(e))
            return Response(data=data, status=code)


class ListEmployees(ListAPIView):
    permission_classes = [(IsAuthenticated & EmployerAccess)]
    serializer_class = EmployeeViewSerializer
    queryset = EmployeeeProfile
    filter_backends = (
        filters.SearchFilter,
        django_filters.rest_framework.DjangoFilterBackend,
    )
    filterset_fields = ["department"]
    search_fields = ["name"]

    def get_queryset(self):
        user = self.request.user
        company = CompanyProfile.objects.get(user=user)
        return self.queryset.objects.filter(company=company).order_by("id")
