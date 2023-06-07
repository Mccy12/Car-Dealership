from django.db import models

# Create your models here.
from django.urls import reverse

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=50, unique=True)
    sold = models.BooleanField(default=False)

class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=50)

class SalesPerson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=50)

class Sale(models.Model):

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobiles",
        on_delete=models.PROTECT
    )
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales",
        on_delete=models.PROTECT
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customers",
        on_delete=models.PROTECT
    )
    price = models.CharField(max_length=100)

#    def get_api_url(self):
 #       return reverse("api_show_sales", kwargs={"pk": self.pk})
