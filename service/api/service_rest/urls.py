from django.urls import path
from .views import technician_list, delete_technician

urlpatterns = [
    path("technicians/", technician_list, name="technician_list"),
    path("technicians/<int:id>", delete_technician, name="delete_technician"),
]