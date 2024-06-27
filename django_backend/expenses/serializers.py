from rest_framework import serializers # type: ignore
from expenses.models import Expense, PaymentType


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'date', 'amount', 'reason', 'payment_type']


class PaymentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentType
        fields = ['payment_type']