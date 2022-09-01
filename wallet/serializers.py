from rest_framework import serializers
from accounts.services.ovalfi import OvalFi


class ExchangeRateSerializer(serializers.Serializer):
    amount = serializers.FloatField()
    currency = serializers.CharField()

    def save(self):
        amount = self.validated_data["amount"]
        currency = self.validated_data["currency"]

        data = OvalFi.convert_currency(amount, currency)

        return data
