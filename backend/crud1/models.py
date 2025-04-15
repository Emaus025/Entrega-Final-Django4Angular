from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    username = None
    correo = models.EmailField(unique=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'correo'
    REQUIRED_FIELDS = ['nombre', 'apellido']

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
