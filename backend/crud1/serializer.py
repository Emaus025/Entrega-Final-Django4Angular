from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'correo', 'nombre', 'apellido', 'fecha_registro']
        read_only_fields = ['id', 'fecha_registro']
