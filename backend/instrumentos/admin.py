from django.contrib import admin
from .models import Instrumento

@admin.register(Instrumento)
class InstrumentoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo')
    list_filter = ('tipo',)
    search_fields = ('nombre', 'descripcion')
