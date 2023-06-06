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
        "id",
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
    encoders = {
        "technician": TechnicianListEncoder(),
    }


@require_http_methods(["GET", "POST"])
def technician_list(request, id=None):
    if request.method == "GET":
        if id is None:
            technicians = Technician.objects.all()
        else:
            technicians = Technician.objects.filter(id=id)
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder
        )
    else:
        content = json.loads(request.body)
        # try:
        #     tech = Technician.objects.get(id=content["technician"])
        #     content["technician"] = tech
        # except Technician.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid technician id"},
        #         status=400,
        #     )

        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False
        )

@require_http_methods(["DELETE", "GET"])
def delete_technician(request, id):
    if request.method == "DELETE":
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
    else:
        technician = Technician.objects.get(id=id)
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False
        )

@require_http_methods(["GET", "POST"])
def appointment_list(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            technician_id = content["technician"]
            technician = Technician.objects.get(id=technician_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"error": "Technician does not exist"},
                status=404
            )

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False
        )
