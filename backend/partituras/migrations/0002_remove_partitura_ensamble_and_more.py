# Generated by Django 4.2 on 2025-04-11 16:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('partituras', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='partitura',
            name='ensamble',
        ),
        migrations.RemoveField(
            model_name='partitura',
            name='instrumentos',
        ),
        migrations.RemoveField(
            model_name='partitura',
            name='usuario',
        ),
    ]
