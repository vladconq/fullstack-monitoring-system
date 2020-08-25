from rest_framework import serializers
from .models import Limitation


class LimitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Limitation
        fields = '__all__'


