from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EnsambleViewSet

router = DefaultRouter()
router.register(r'ensambles', EnsambleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]