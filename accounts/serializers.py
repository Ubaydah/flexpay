from django.contrib.auth import get_user_model
from django.template.loader import render_to_string
from rest_framework import serializers
from .models import CompanyProfile, EmployeeeProfile
from accounts.services.ovalfi import OvalFi
from flexpay.utils.helpers import Helper


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
        user.is_employer = True
        user.save()

        reference, yield_id, customer_id = OvalFi.create_ovalfi_customer(
            str(company_name), str(phone_number), str(email)
        )
        CompanyProfile.objects.create(
            user=user,
            company_name=company_name,
            address=address,
            oval_reference=reference,
            yield_offering_id=yield_id,
            oval_customer_id=customer_id,
        )

        return user


class EmployeeRegisterSerializer(serializers.ModelSerializer):
    email = serializers.CharField()

    class Meta:
        model = EmployeeeProfile
        fields = ["name", "email", "role", "department", "salary"]

    def create(self, validated_data):
        auth_user = self.context["request"].user
        company = CompanyProfile.objects.get(user=auth_user)
        email = validated_data["email"]
        user = get_user_model()(email=email)
        user.is_active = False
        user.is_employee = True
        user.save()
        name = validated_data["name"]
        role = validated_data["role"]
        department = validated_data["department"]
        salary = validated_data["salary"]

        employee = EmployeeeProfile.objects.create(
            user=user,
            company=company,
            name=name,
            role=role,
            department=department,
            salary=salary,
            oval_reference="12345",
        )
        message = render_to_string(
            "email/employee-welcome.html",
            {
                "name": name,
            },
        )
        Helper.send_employee_email(message, email)

        return employee


class EmployeeSignupSerializer(serializers.ModelSerializer):
    email = serializers.CharField()
    password = serializers.CharField()
    phone_number = serializers.CharField()

    class Meta:
        model = EmployeeeProfile
        fields = ["name", "email", "phone_number", "password"]

    def save(self):
        email = self.validated_data["email"]
        password = self.validated_data["password"]
        name = self.validated_data["name"]
        phone_number = self.validated_data["phone_number"]
        try:
            user = get_user_model().objects.get(email=email)
        except get_user_model().DoesNotExist:
            raise ValueError("You don't have access to use this app")
        if user.is_active == True:
            raise ValueError("You already have an active account, login")
        user.set_password(password)
        user.phone_number = phone_number
        user.is_active = True
        user.save()

        reference, yield_id, customer_id = OvalFi.create_ovalfi_customer(
            str(name), str(phone_number), str(email)
        )

        employee = EmployeeeProfile.objects.get(user=user)
        employee.oval_reference = reference
        employee.oval_customer_id = customer_id
        employee.save()

        return employee
