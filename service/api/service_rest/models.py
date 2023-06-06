from django.db import models


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

class AutomobileVO(models.Model):
    vin = models.PositiveBigIntegerField()
    sold = models.BooleanField()

class Appointment(models.Model):
    vin = models.PositiveBigIntegerField()
    customer = models.CharField(max_length=100)
    date_time = models.DateTimeField(auto_now_add=False)
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=100)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT
    )
