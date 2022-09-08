from django.db.models import Sum
from rest_framework import serializers
from accounts.models import CompanyProfile, EmployeeeProfile
from accounts.services.ovalfi import OvalFi
from flexpay.utils.helpers import Helper
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
                status="success",
            )

            return data
        else:
            raise ValueError("An error occured")


class WalletDetailsSerializer(serializers.ModelSerializer):
    balance = serializers.SerializerMethodField()

    def get_balance(self, obj):
        bal = Helper.get_balance(obj)
        return bal

    class Meta:
        model = Wallet
        fields = ["id", "currency", "balance"]


class WalletTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalletTransaction
        fields = ["id", "transaction_type", "description", "amount", "created_at"]


class WithdrawalSerializer(serializers.Serializer):
    amount = serializers.FloatField()
    description = serializers.CharField()

    def save(self):
        user = self.context["request"].user
        amount = self.validated_data["amount"]
        description = self.validated_data["description"]
        wallet = Wallet.objects.get(user=user)
        bal = Helper.get_balance(wallet)
        if amount > bal:
            raise ValueError("Insufficient funds in wallet")
        WalletTransaction.objects.create(
            wallet=wallet,
            transaction_type="withdrawal",
            description=description,
            amount=-amount,
            status="success",
        )

        return wallet


class EmployeeTransferSerializer(serializers.Serializer):
    amount = serializers.FloatField()
    employee_id = serializers.CharField()
    description = serializers.CharField()

    def save(self):
        user = self.context["request"].user
        amount = self.validated_data["amount"]
        description = self.validated_data["description"]
        employee_id = self.validated_data["employee_id"]
        try:
            company = CompanyProfile.objects.get(user=user)
            user_wallet = Wallet.objects.get(user=user)
            employee = EmployeeeProfile.objects.get(id=employee_id, company=company)
            employee_wallet = Wallet.objects.get(user=employee.user)
            user_bal = Helper.get_balance(user_wallet)
            if amount > user_bal:
                raise ValueError("Insufficient funds in wallet")
            WalletTransaction.objects.create(
                wallet=user_wallet,
                transaction_type="transfer",
                description=description,
                amount=-amount,
                source=user_wallet,
                destination=employee_wallet,
                status="success",
            )

            WalletTransaction.objects.create(
                wallet=employee_wallet,
                transaction_type="transfer",
                description=description,
                amount=amount,
                source=user_wallet,
                destination=employee_wallet,
                status="success",
            )
        except Exception as e:
            raise ValueError(str(e))


class TransferSerializer(serializers.Serializer):
    amount = serializers.FloatField()
    currency = serializers.CharField()
    account_number = serializers.CharField()
    bank_name = serializers.CharField()
    description = serializers.CharField()
    routing_number = serializers.CharField()

    def save(self):
        user = self.context["request"].user
        amount = self.validated_data["amount"]
        currency = self.validated_data["currency"]
        account_number = self.validated_data["account_number"]
        bank_name = self.validated_data["bank_name"]
        description = self.validated_data["description"]
        routing_number = self.validated_data["routing_number"]

        if user.is_employer == True:
            company = CompanyProfile.objects.get(user=user)
            customer_id = company.oval_customer_id
            name = company.company_name
            address = company.address
            data = OvalFi.initiate_transfer(
                customer_id=customer_id,
                amount=amount,
                currency=currency,
                account_number=account_number,
                bank_name=bank_name,
                name=name,
                address=address,
                description=description,
                routing_number=routing_number,
            )
            wallet = Wallet.objects.get(user=user)
            bal = Helper.get_balance(wallet)
            if amount > bal:
                raise ValueError("Insufficient funds in wallet")
            WalletTransaction.objects.create(
                wallet=wallet,
                transaction_type="transfer",
                description=description,
                amount=amount,
                source=wallet,
            )

            return data
        elif user.is_employee == True:
            employee = EmployeeeProfile.objects.get(user=user)
            customer_id = employee.oval_customer_id
            name = employee.name
            address = "null"
            data = OvalFi.initiate_transfer(
                customer_id=customer_id,
                amount=amount,
                currency=currency,
                account_number=account_number,
                bank_name=bank_name,
                name=name,
                address=address,
                description=description,
                routing_number=routing_number,
            )
            wallet = Wallet.objects.get(user=user)
            bal = Helper.get_balance(wallet)
            if amount > bal:
                raise ValueError("Insufficient funds in wallet")
            WalletTransaction.objects.create(
                wallet=wallet,
                transaction_type="transfer",
                description=description,
                amount=amount,
                status="success",
                source=wallet,
            )

            return data
        else:
            raise ValueError("An error occured")
