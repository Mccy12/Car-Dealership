
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Sale, AutomobileVO, SalesPerson, Customer

# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class SaleEncoder(ModelEncoder):
    model = Sale,
    properties = [
        "id",
        "automobile",
        "sales_person",
        "customer",
        "price",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
    }


@require_http_methods(["GET"])
def api_list_automobileVO(request):
    if request.method == "GET":
        autos = AutomobileVO.objects.filter(sold=False)
        return JsonResponse(
            {"autos": autos},
            encoder=AutomobileVOEncoder,
        )


@require_http_methods(["PUT"])
def sold_auto(request, vin):
    if request.method == "PUT":
        data = json.loads(request.body)
        AutomobileVO.objects.filter(vin=vin).update(**data)
        auto = AutomobileVO.objects.get(vin=vin)
        return JsonResponse(
            auto,
            encoder=AutomobileVOEncoder,
            safe=False,
            status=200,
        )



@require_http_methods(["GET", "POST"])
def api_list_salesperson(request):
    if request.method == "GET":
        salespeople = SalesPerson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalesPersonEncoder,
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
        )
        except:
            response = JsonResponse(
                {"message": "Cannot be created"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET", "DELETE"])
def api_show_salesperson(request, pk):
    if request.method == "GET":
        try:
            sales_person = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales Person Does Not Exist"},
                status=404,
            )
    else:
        try:
            count, _ = SalesPerson.objects.get(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales Person Does Not Exist"},
                status=404
            )

@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_show_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Customer Input"},
                status=400
            )
    else:
        count, _ = Customer.objects.get(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_sale(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
        )

    else:
        content = json.loads(request.body)

        try:
            vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid vin"},
                status=400,
            )
        try:
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer id"},
                status=400,
            )
        try:
            sales_person_id = content["sales_person"]
            sales_person = SalesPerson.objects.get(id=sales_person_id)
            content["sales_person"] = sales_person
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson id"},
                status=400,
            )

        sales = Sale.objects.create(**content)
        return JsonResponse(
            sales,
            encoder=SaleEncoder,
            safe=False
        )


@require_http_methods(["GET", "DELETE"])
def api_show_sale(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sales Record does not exist"},
                status=404
            )
    else:
        request.method == "DELETE"
        count, _ = Sale.objects.get(id=id).delete()
        return JsonResponse({"deleted": count > 0})
