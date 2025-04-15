from rest_framework import serializers
from .models import Ensamble
from crud1.serializer import UsuarioSerializer
from instrumentos.serializers import InstrumentoSerializer
from partituras.serializers import PartituraSerializer

class EnsambleSerializer(serializers.ModelSerializer):
    director_details = UsuarioSerializer(source='director', read_only=True)
    miembros_details = UsuarioSerializer(source='miembros', many=True, read_only=True)
    instrumentos_details = InstrumentoSerializer(source='instrumentos', many=True, read_only=True)
    partituras_details = PartituraSerializer(source='partituras', many=True, read_only=True)

    class Meta:
        model = Ensamble
        fields = ['id', 'nombre', 'director', 'director_details', 
                 'miembros', 'miembros_details', 
                 'instrumentos', 'instrumentos_details',
                 'partituras', 'partituras_details',
                 'fecha_creacion', 'descripcion', 'activo']
        read_only_fields = ['fecha_creacion']