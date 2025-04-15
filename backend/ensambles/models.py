from django.db import models
from crud1.models import Usuario
from instrumentos.models import Instrumento
from partituras.models import Partitura

class Ensamble(models.Model):
    nombre = models.CharField(max_length=100)
    director = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='ensambles_dirigidos')
    miembros = models.ManyToManyField(Usuario, related_name='ensambles_miembro')
    instrumentos = models.ManyToManyField(Instrumento, related_name='ensambles')
    partituras = models.ManyToManyField(Partitura, related_name='ensambles', blank=True)
    descripcion = models.TextField(blank=True)
    activo = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Ensamble'
        verbose_name_plural = 'Ensambles'
        ordering = ['-fecha_creacion']
