# Generated by Django 4.2 on 2025-04-11 03:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('instrumentos', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Ensamble',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('descripcion', models.TextField(blank=True)),
                ('activo', models.BooleanField(default=True)),
                ('director', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ensambles_dirigidos', to=settings.AUTH_USER_MODEL)),
                ('instrumentos', models.ManyToManyField(related_name='ensambles', to='instrumentos.instrumento')),
                ('miembros', models.ManyToManyField(related_name='ensambles_miembro', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Ensamble',
                'verbose_name_plural': 'Ensambles',
            },
        ),
    ]
