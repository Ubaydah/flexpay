from rest_framework import serializers
from accounts.services.ovalfi import OvalFi


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
