from django.urls import path
from .views import (
    api_list_sale,
    api_list_salesperson,
    api_list_customer,
    api_show_salesperson,
    api_show_sale,
    api_show_customer,
    api_list_automobileVO,
    sold_auto
)

urlpatterns = [
    path('sales/', api_list_sale, name="api_list_sale"),
    path('salespeople/', api_list_salesperson, name="api_list_salesperson"),
    path("customers/", api_list_customer, name="api_list_customer"),
    path("salespeople/<int:id>/", api_show_salesperson, name="api_show_salesperson"),
    path("sales/<int:id>/", api_show_sale, name="api_show_sale"),
    path("customers/<int:id>/", api_show_customer, name="api_show_customer"),
    path("autos/", api_list_automobileVO, name="available_car_list"),
    path("autos/<str:vin>/", sold_auto, name="available_cars_update"),
]
