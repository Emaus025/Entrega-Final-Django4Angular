from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InstrumentoViewSet

router = DefaultRouter()
router.register(r'instrumentos', InstrumentoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]