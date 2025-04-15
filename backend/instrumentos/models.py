from django.db import models

class Instrumento(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=50, choices=[
        ('VIENTO', 'Instrumento de Viento'),
        ('CUERDA', 'Instrumento de Cuerda'),
        ('PERCUSION', 'Instrumento de Percusión'),
        ('ELECTRONICO', 'Instrumento Electrónico')
    ])
    descripcion = models.TextField(blank=True)
    imagen = models.ImageField(upload_to='instrumentos/', null=True, blank=True)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Instrumento'
        verbose_name_plural = 'Instrumentos'
