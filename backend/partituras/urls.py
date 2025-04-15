from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PartituraViewSet

router = DefaultRouter()
router.register(r'partituras', PartituraViewSet)

urlpatterns = [
    path('', include(router.urls)),
]