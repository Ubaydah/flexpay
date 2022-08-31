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
            "yield_offering_id": yield_id
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
