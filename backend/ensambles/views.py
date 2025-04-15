from rest_framework import viewsets
from .models import Ensamble
from .serializers import EnsambleSerializer

class EnsambleViewSet(viewsets.ModelViewSet):
    queryset = Ensamble.objects.all()
    serializer_class = EnsambleSerializer
