# Generated by Django 4.0.3 on 2023-06-06 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_alter_appointment_date_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='automobilevo',
            name='vin',
            field=models.CharField(max_length=100),
        ),
    ]