import random
from django.core.mail import EmailMessage
from rest_framework import status


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
        status_code = status.HTTP_200_OK if code == 200 else status.HTTP_201_CREATED
        result = {"status": "True", "message": message, "data": payload}
        return (code, result)

    @staticmethod
    def send_employee_email(message, email):
        subject = "Welcome to FlexPay"
        mail = EmailMessage(subject, message, to=[email])
        mail.send()
