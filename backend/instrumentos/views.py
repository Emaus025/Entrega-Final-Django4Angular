from rest_framework import viewsets
from .models import Instrumento
from .serializers import InstrumentoSerializer

class InstrumentoViewSet(viewsets.ModelViewSet):
    queryset = Instrumento.objects.all()
    serializer_class = InstrumentoSerializer
