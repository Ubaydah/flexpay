from django.db.models import Sum
from rest_framework import serializers
from accounts.models import CompanyProfile, EmployeeeProfile
from accounts.services.ovalfi import OvalFi
from .models import Wallet, WalletTransaction


class ExchangeRateSerializer(serializers.Serializer):
    amount = serializers.FloatField()
    currency_from = serializers.CharField()
    currency_to = serializers.CharField()

    def save(self):
        amount = self.validated_data["amount"]
        currency_from = self.validated_data["currency_from"]
        currency_to = self.validated_data["currency_to"]

        data = OvalFi.convert_currency(amount, currency_from, currency_to)

        return data


class DepositSerializer(serializers.Serializer):
    amount = serializers.FloatField()
    description = serializers.CharField()

    def save(self):
        user = self.context["request"].user
        amount = self.validated_data["amount"]
        description = self.validated_data["description"]

        if user.is_employer == True:
            company = CompanyProfile.objects.get(user=user)
            customer_id = company.oval_customer_id

            data = OvalFi.initiate_deposit(customer_id, amount)
            wallet = Wallet.objects.get(user=user)
            WalletTransaction.objects.create(
                wallet=wallet,
                transaction_type="deposit",
                description=description,
                amount=amount,
            )

            return data
        elif user.is_employee == True:
            employee = EmployeeeProfile.objects.get(user=user)
            customer_id = employee.oval_customer_id

            data = OvalFi.initiate_deposit(customer_id, amount)
            wallet = Wallet.objects.get(user=user)
            WalletTransaction.objects.create(
                wallet=wallet,
                transaction_type="deposit",
                description=description,
                amount=amount,
            )

            return data
        else:
            raise ValueError("An error occured")


class WalletDetailsSerializer(serializers.ModelSerializer):
    balance = serializers.SerializerMethodField()

    def get_balance(self, obj):
        bal = WalletTransaction.objects.filter(wallet=obj).aggregate(Sum("amount"))[
            "amount__sum"
        ]
        print(bal)
        if bal == None:
            return 0.0
        return bal

    class Meta:
        model = Wallet
        fields = ["id", "currency", "balance"]
