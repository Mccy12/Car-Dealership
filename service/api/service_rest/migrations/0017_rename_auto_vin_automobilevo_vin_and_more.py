# Generated by Django 4.0.3 on 2023-06-08 18:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0016_rename_vin_automobilevo_auto_vin_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='automobilevo',
            old_name='auto_vin',
            new_name='vin',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='auto_vin',
        ),
        migrations.AddField(
            model_name='appointment',
            name='auto',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='auto', to='service_rest.automobilevo'),
        ),
    ]
