from django.db import models
from django.core.exceptions import ObjectDoesNotExist

class Status(models.Model):
    name = models.CharField(max_length=10, unique=True)
    def __str__(self):
        return self.name


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=100)
    sold = models.BooleanField()

class Appointment(models.Model):

    vin = models.CharField(max_length=100)
    customer = models.CharField(max_length=100)
    date_time = models.DateTimeField(auto_now_add=False)
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=200, null=True)

    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE
    )

    def finish(self):
        status = Status.objects.get(name="FINISHED")
        self.status = status
        self.save()

    def cancel(self):
        status = Status.objects.get(name="CANCELED")
        self.status = status
        self.save()
