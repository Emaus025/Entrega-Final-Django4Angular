# Generated by Django 4.2 on 2025-04-11 16:35

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('ensambles', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ensamble',
            options={'ordering': ['-fecha_creacion'], 'verbose_name': 'Ensamble', 'verbose_name_plural': 'Ensambles'},
        ),
        migrations.AddField(
            model_name='ensamble',
            name='fecha_creacion',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
