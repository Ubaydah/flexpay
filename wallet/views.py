from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Wallet, WalletTransaction
from .serializers import (
    DepositSerializer,
    ExchangeRateSerializer,
    WalletDetailsSerializer,
    WalletTransactionSerializer,
)
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


class WalletDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wallet = Wallet.objects.get(user=request.user)
        data = WalletDetailsSerializer(wallet).data
        return Response(data)


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


class WalletTransactionView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = WalletTransactionSerializer
    queryset = WalletTransaction

    def get_queryset(self):
        user = self.request.user
        wallet = Wallet.objects.get(user=user)
        return self.queryset.objects.filter(wallet=wallet).order_by("created_at")
