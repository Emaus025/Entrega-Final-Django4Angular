from django.contrib import admin
from .models import Ensamble

@admin.register(Ensamble)
class EnsambleAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'director', 'activo']
    list_filter = ['activo', 'director']
    filter_horizontal = ['miembros', 'instrumentos']
    search_fields = ['nombre', 'director__username']
