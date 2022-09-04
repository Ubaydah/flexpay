from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import DepositSerializer, ExchangeRateSerializer
from flexpay.utils.helpers import Helper


class ExchangeRateView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ExchangeRateSerializer

    def post(self, request):
        try:
            serializer = ExchangeRateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = serializer.save()

            return Response(
                {"status": True, "message": "conversion successsful", "amount": data},
                status=status.HTTP_200_OK,
            )
        except ValueError as e:
            code, data = Helper.error_response(code=400, message=str(e))
            return Response(data=data, status=code)


class DepositView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DepositSerializer

    def post(self, request):
        try:
            serializer = DepositSerializer(
                data=request.data, context={"request": request}
            )
            serializer.is_valid(raise_exception=True)
            data = serializer.save()

            return Response(
                {"status": True, "message": "deposit successsful", "data": data},
                status=status.HTTP_200_OK,
            )
        except ValueError as e:
            code, data = Helper.error_response(code=400, message=str(e))
            return Response(data=data, status=code)
