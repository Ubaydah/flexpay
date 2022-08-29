from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import CompanyProfile
from .services import OvalFi


class CompanyRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.CharField()
    password = serializers.CharField()
    phone_number = serializers.CharField()

    class Meta:
        model = CompanyProfile
        fields = ["id", "email", "password", "company_name", "address", "phone_number"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        company_name = validated_data["company_name"]
        phone_number = validated_data["phone_number"]
        address = validated_data["address"]
        email = validated_data["email"]
        user = get_user_model()(email=email, phone_number=phone_number)
        user.set_password(validated_data["password"])
        user.save()

        reference, yield_id = OvalFi.create_ovalfi_customer(
            str(company_name), str(phone_number), str(email)
        )
        CompanyProfile(
            user=user,
            company_name=company_name,
            address=address,
            oval_reference=reference,
            yield_offering_id=yield_id,
        )

        return user
