from rest_framework import serializers
from .models import Partitura

class PartituraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partitura
        fields = '__all__'
        extra_kwargs = {
            'archivo_pdf': {'required': False}
        }