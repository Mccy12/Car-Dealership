from django.urls import path
from .views import technician_list, delete_technician, appointment_list

urlpatterns = [
    path("technicians/", technician_list, name="technician_list"),
    path("technicians/<int:id>", delete_technician, name="delete_technician"),
    path("appointments/", appointment_list, name="appointment_list"),
]