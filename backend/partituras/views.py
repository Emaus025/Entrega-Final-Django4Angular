from rest_framework import viewsets
from .models import Partitura
from .serializers import PartituraSerializer

class PartituraViewSet(viewsets.ModelViewSet):
    queryset = Partitura.objects.all()
    serializer_class = PartituraSerializer
