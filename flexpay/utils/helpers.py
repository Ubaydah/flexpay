import random
from django.core.mail import EmailMessage
from django.db.models import Sum
from rest_framework import status
from rest_framework.response import Response
from wallet.models import WalletTransaction


class Helper:
    @staticmethod
    def generate_unique_reference():
        number = random.randrange(11111111, 99999999, 8)
        reference = f"ref{number}"
        return reference

    @staticmethod
    def error_response(**details):
        code = details.get("code", 500)
        message = details.get("message", "Oops, Something broke on the server")
        response = {"status": "false", "message": message}
        return (code, response)

    @staticmethod
    def success_response(payload, message, code=200):
        code = status.HTTP_200_OK if code == 200 else status.HTTP_201_CREATED
        result = {"status": "True", "message": message, "data": payload}
        return (code, result)

    @staticmethod
    def send_employee_email(message, email):
        subject = "Welcome to FlexPay"
        mail = EmailMessage(subject, message, to=[email])
        mail.send()

    @staticmethod
    def get_balance(wallet):
        bal = WalletTransaction.objects.filter(wallet=wallet).aggregate(Sum("amount"))[
            "amount__sum"
        ]
        if bal == None:
            return 0.0
        return bal

    @staticmethod
    def view_handler(serializer_class, request, message):
        try:
            serializer = serializer_class(
                data=request.data, context={"request": request}
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(
                {"status": True, "message": message},
                status=status.HTTP_200_OK,
            )
        except ValueError as e:
            code, data = Helper.error_response(code=400, message=str(e))
            return Response(data=data, status=code)
