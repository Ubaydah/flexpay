from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
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
