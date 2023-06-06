from django.urls import path
from .views import (
    technician_list,
    delete_technician,
    appointment_list,
    finish_appointment,
    cancel_appointment,
    delete_appointment
)

urlpatterns = [
    path("technicians/", technician_list, name="technician_list"),
    path("technicians/<int:id>", delete_technician, name="delete_technician"),
    path("appointments/", appointment_list, name="appointment_list"),
    path("appointments/<int:id>", delete_appointment, name="delete_appointment"),
    path("appointments/<int:id>/finish", finish_appointment, name="finish_appointment"),
    path("appointments/<int:id>/cancel", cancel_appointment, name="cancel_appointment"),

]