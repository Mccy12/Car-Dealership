# Generated by Django 4.0.3 on 2023-06-07 21:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0008_alter_appointment_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='vin',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='autovin', to='service_rest.automobilevo'),
        ),
    ]
