from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods

from .models import Technician, Appointment, AutomobileVO
from common.json import ModelEncoder

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "customer",
        "date_time",
        "reason",
        "status",
        "technician",
    ]


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "customer",
        "date_time",
        "reason",
        "status",
        "technician",
    ]


@require_http_methods(["GET", "POST"])
def technician_list(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False
        )

@require_http_methods(["DELETE"])
def delete_technician(request, id):
    try:
        technician = Technician.objects.get(id=id)
        technician.delete()
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False
        )
    except Technician.DoesNotExist:
        return(
            JsonResponse({"message": "Technician does not exist"})
        )