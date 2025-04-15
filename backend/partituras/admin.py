from django.contrib import admin
from .models import Partitura

@admin.register(Partitura)
class PartituraAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'compositor', 'dificultad', 'fecha_creacion')
    list_filter = ('dificultad', 'fecha_creacion')
    search_fields = ('titulo', 'compositor')
