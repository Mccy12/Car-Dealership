from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods

from .models import Technician, Appointment, AutomobileVO, Status
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
        "id",
        "vin",
        "customer",
        "date_time",
        "reason",
        "status"
    ]


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
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
    # def get_extra_data(self, o):
    #     return {"status": o.statu}


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
def appointment_list(request, id=None):
    if request.method == "GET":
        if id is None:
            appointments = Appointment.objects.all()
        else:
            appointments = Appointment.objects.filter(id=id)
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
        print(content)
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False
        )

@require_http_methods(["DELETE"])
def delete_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.delete()
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False
        )
    except Appointment.DoesNotExist:
        return(
            JsonResponse({"message": "Appointment does not exist"})
        )

@require_http_methods(["PUT"])
def cancel_appointment(request, id):
    appointment = Appointment.objects.get(id=id)
    appointment.status = "CANCELED"
    appointment.save()
    return JsonResponse(
        appointment,
        encoder=AppointmentDetailEncoder,
        safe=False
    )

@require_http_methods(["PUT"])
def finish_appointment(request, id):
    appointment = Appointment.objects.get(id=id)
    appointment.status = "FINISHED"
    appointment.save()
    return JsonResponse(
        appointment,
        encoder=AppointmentDetailEncoder,
        safe=False
    )