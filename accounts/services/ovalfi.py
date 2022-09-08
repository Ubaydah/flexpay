from hashlib import sha256
import json
import requests
from django.conf import settings
from flexpay.utils.helpers import Helper


class OvalFi:
    @staticmethod
    def create_ovalfi_customer(name, phone_number, email):

        reference = Helper.generate_unique_reference()
        signature = f"{settings.OVALFI_API_KEY}{reference}"
        hashed_signature = str(sha256(signature.encode("utf-8")).hexdigest())
        header = {
            "Authorization": f"Bearer {settings.OVALFI_TOKEN}",
            "Signature": hashed_signature,
            "Content-Type": "application/json",
        }
        yield_id = settings.OVALFI_YIELD_ID
        payload = {
            "name": name,
            "mobile_number": phone_number,
            "email": email,
            "reference": reference,
            "yield_offering_id": yield_id,
        }
        data = json.dumps(payload)
        response = requests.post(
            f"{settings.OVALFI_BASE_URL}/customer", headers=header, data=data
        )
        print(response.text)
        if response.ok:
            response_dict = json.loads(response.text)
            customer_id = response_dict["data"]["id"]
            return reference, yield_id, customer_id
        else:
            raise ValueError("An error occured")

    @staticmethod
    def convert_currency(amount, currency_from, currency_to):
        header = {
            "Authorization": f"Bearer {settings.OVALFI_TOKEN}",
            "Content-Type": "application/json",
        }

        response = requests.get(
            f"{settings.OVALFI_BASE_URL}/transfer/detail?amount={amount}&currency={currency_from}&destination_currency={currency_to}",
            headers=header,
        )
        print(response.text)
        if response.ok:
            response_dict = json.loads(response.text)
            amount = response_dict["data"]["amount"]
            return amount
        else:
            raise ValueError("An error occured")

    @staticmethod
    def initiate_deposit(customer_id, amount):
        reference = Helper.generate_unique_reference()
        signature = f"{settings.OVALFI_API_KEY}{reference}"
        hashed_signature = str(sha256(signature.encode("utf-8")).hexdigest())
        print(hashed_signature)
        header = {
            "Authorization": f"Bearer {settings.OVALFI_TOKEN}",
            "Signature": hashed_signature,
            "Content-Type": "application/json",
        }

        payload = {"customer_id": customer_id, "reference": reference, "amount": amount}
        data = json.dumps(payload)
        response = requests.post(
            f"{settings.OVALFI_BASE_URL}/deposit", headers=header, data=data
        )
        print(response.text)
        if response.ok:
            response_dict = json.loads(response.text)
            return response_dict["data"]
        else:
            raise ValueError("An error occured")

    @staticmethod
    def initiate_transfer(**details):
        reference = Helper.generate_unique_reference()
        signature = f"{settings.OVALFI_API_KEY}{reference}"
        hashed_signature = str(sha256(signature.encode("utf-8")).hexdigest())
        header = {
            "Authorization": f"Bearer {settings.OVALFI_TOKEN}",
            "Signature": hashed_signature,
            "Content-Type": "application/json",
        }
        print(hashed_signature)
        customer_id = details.get("customer_id")
        amount = details.get("amount")
        currency = details.get("currency", "USD")
        account_number = details.get("account_number")
        bank_name = details.get("bank_name")
        name = details.get("name")
        address = details.get("address")
        description = details.get("description")
        routing_number = details.get("routing_number")
        payload = {
            "customer_id": customer_id,
            "amount": amount,
            "currency": currency,
            "destination": {
                "bank_details": {
                    "account_number": account_number,
                    "routing_number": routing_number,
                    "bank_name": bank_name,
                    "country": "Nigeria",
                    "is_within_us": "yes",
                },
                "personal_details": {
                    "name": name,
                    "country": "Nigeria",
                    "city": "Lagos",
                    "address": address,
                },
            },
            "reason": description,
            "reference": reference,
        }
        data = json.dumps(payload)
        response = requests.post(
            f"{settings.OVALFI_BASE_URL}/transfer", headers=header, data=data
        )
        print(response.text)
        if response.ok:
            response_dict = json.loads(response.text)
            return response_dict["data"]
        else:
            raise ValueError("An error occured")
