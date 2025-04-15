from django.db import models

class Partitura(models.Model):
    titulo = models.CharField(max_length=100)
    compositor = models.CharField(max_length=100)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    archivo_pdf = models.FileField(upload_to='partituras/')
    descripcion = models.TextField(blank=True)
    dificultad = models.CharField(max_length=20, choices=[
        ('PRINCIPIANTE', 'Principiante'),
        ('INTERMEDIO', 'Intermedio'),
        ('AVANZADO', 'Avanzado')
    ])

    def __str__(self):
        return f"{self.titulo} - {self.compositor}"

    class Meta:
        ordering = ['-fecha_creacion']
        verbose_name = 'Partitura'
        verbose_name_plural = 'Partituras'
