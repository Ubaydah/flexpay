from asyncio import start_unix_server
from django.contrib.auth import get_user_model, authenticate
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CompanyProfile, CustomUser
from .serializers import CompanyRegistrationSerializer


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
            return Response(
                {"status": False, "message": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )


class CompanyLogin(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = authenticate(email=email, password=password)
            if not user:
                return Response(
                    {"status": False, "message": "Invalid credentials, try again"},
                    status=400,
                )
            if user.is_active == False:
                return Response(
                    {"status": False, "message": "Account disabled, contact admin"},
                    status=400,
                )
            if user.is_employer == False:
                return Response(
                    {"status": False, "message": "you don't have a company account"},
                    status=403,
                )
            user.last_login = timezone.now()
            user.save()
            company = CompanyProfile.objects.get(user=user)
            data = {
                "id": user.id,
                "email": user.email,
                "company_name": company.company_name,
                "balance": company.balance,
                "tokens": {"access": user.tokens()["access"]},
                "last_login": user.last_login,
            }
            return Response(
                {"status": True, "message": "login successful", "data": data}
            )
        except get_user_model().DoesNotExist:
            return Response(
                {"status": False, "message": "No active account with this details"},
                status=400,
            )
