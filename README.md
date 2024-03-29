# CarCar

CarCar is an application for handling your dealership needs. It can manage inventory, sales, and services for your automobiles.

Team:

* Joshua - Sales
* Matt - Service

## How to Run this App
 **Please make sure you have Docker, Git, and Node.js v18.16.0 or above**
1. Fork this repository.
2. Clone the respository to your local computer:
git clone <<repository.url.here>>
3. Run the following Docker commands to build and run the project:
```
docker volume create beta-data
docker-compose build
docker-compose up
```

**If running on MacOS, you will see an error warning about an environment variable names OS missing. You can ignore this.**

-After running these commands, make sure your Docker containers are running.

-You can view the project in your browser at http://localhost:3000/
![CarCar](/images/Car-Car.png)
# Diagram

![Diagram](/images/Project-Beta-Diagram.png)
​
# API Documentation

The following is how you can access endpoints to send and view data. This can be done through both your browser, and through Insomnia.
​</br>
</br>

## Manufacturers:
| Action | Method | URL |
|:----: | :----: | :----: |
|List Manufacturers | GET | http://localhost:8100/api/manufacturers/ |
|Create Manufacturer | POST | http://localhost:8100/api/manufacturers/ |
|Get Specific Manufacturer | GET | http://localhost:8100/api/manufacturers/id/ |
|Update Specific Manufacturer | PUT | http://localhost:8100/api/manufacturers/id/ |
|Delete Specific Manufacturer | DELETE | http://localhost:8100/api/manufacturers/id/ |

Data sent must be JSON, and in these formats:

Create manufacturer or Update manufacturer:
```json
{
  "name": "Chrysler"
}
```
This will return a JSON object like the following:
```json
{
	"href": "/api/manufacturers/1/",
	"id": 1,
	"name": "Chrysler"
}
```
When getting a list of the manufacturers, the JSON object will look like the following:
```json
{
	"manufacturers": [
		{
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Chrysler"
		},
	]
}
```

## Car Models
| Action | Method | URL |
|:----: | :----: | :----: |
|List Models | GET | http://localhost:8100/api/models/ |
|Create Model | POST | http://localhost:8100/api/models/ |
|Get Specific Model | GET | http://localhost:8100/api/models/id/ |
|Update Specific Model | PUT | http://localhost:8100/api/models/id/ |
|Delete Specific Model | DELETE | http://localhost:8100/api/models/id/ |

Data sent must be JSON, and in these formats:

Create models:
```json
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```
This will return a JSON object like the following:
```json
{
	"href": "/api/models/1/",
	"id": 1,
	"name": "Sebring",
	"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Chrysler"
	}
}
```
The manufacturer field is a reference to the manufacturer that the model is linked to.

When getting a list of the models, the JSON object will look like the following:
```json
{
	"models": [
		{
			"href": "/api/models/1/",
			"id": 1,
			"name": "300",
			"picture_url": "300pichere",
			"manufacturer": {
				"href": "/api/manufacturers/1/",
				"id": 1,
				"name": "Chrysler"
			}
		}
    ]
}
```
Update model:
-You can only update the name and/or picture url.
```json
{
  "name": "Sebring",
  "picture_url": "picture.urlhere.com"
}
```
This will return the following JSON:
```json
{
	"href": "/api/models/1/",
	"id": 1,
	"name": "Sebring",
	"picture_url": "picture.urlhere.co",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Chrysler"
	}
}
```

## Automobiles
| Action | Method | URL |
|:----: | :----: | :----: |
|List Automobiles | GET | http://localhost:8100/api/automobiles/ |
|Create Automobile | POST | http://localhost:8100/api/automobiles/ |
|Get Specific Automobile | GET | http://localhost:8100/api/automobiles/vin/ |
|Update Specific Automobile | PUT | http://localhost:8100/api/automobiles/vin/ |
|Delete Specific Automobile | DELETE | http://localhost:8100/api/automobiles/vin/ |

The vin is a unique number, and must be unique in order to create an autommobile. It does not have to be integers.

Data sent must be JSON, and in these formats:

Create Automobile:
```json
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```
This will return a JSON object like the following:
```json
{
	"href": "/api/automobiles/1C3CC5FB2AN120174/",
	"id": 1,
	"color": "red",
	"year": 2012,
	"vin": "1C3CC5FB2AN120174",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "Sebring",
		"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Chrysler"
		}
	},
	"sold": false
}
```
The model field is a reference to the model that the automobile is linked to.

When getting a list of the models, the JSON object will look like the following:
```json
{
	"autos": [
		{
			"href": "/api/automobiles/1C3CC5FB2AN120174/",
			"id": 1,
			"color": "red",
			"year": 2012,
			"vin": "1C3CC5FB2AN120174",
			"model": {
				"href": "/api/models/1/",
				"id": 1,
				"name": "Sebring",
				"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
				"manufacturer": {
					"href": "/api/manufacturers/1/",
					"id": 1,
					"name": "Chrysler"
				}
			},
			"sold": false
		}
	]
}
```

Update Automobile:
-You can only update the color and/or year of the automobile
-You must input the correct vin to be able to update the automobile.
```json
{
  "color": "blue",
  "year": 2023
}
```

##Service Microservice
-This microserver tracks both the technicians who service the cars, and the appointments customers make. It allows you to input which technician will be working on a particular customers car, along with the cars information. It will also track VIP status, which is determined by if the car was sold at this dealership.

## Technicians
| Action | Method | URL |
|:----: | :----: | :----: |
|List Technicians | GET | http://localhost:8100/api/technicians/ |
|Create a Technician | POST | http://localhost:8100/api/technicians/ |
|Get Specific Technician | GET | http://localhost:8100/api/technicians/id/ |
|Delete Specific Technician | DELETE | http://localhost:8100/api/technicians/id/ |


Create Technician: This will add a technician to the database. You will input the technicians' first name, last name, and employee id in the following format:
```json
{
	"first_name": "Fredfred",
	"last_name": "Burger",
	"employee_id": "123"
}
```
-Employee id can be any character, so feel free to use letters and numbers.

This will give you the following JSON object:
```json
{
	"id": 1,
	"first_name": "Fredfred",
	"last_name": "Burger",
	"employee_id": "1"
}
```
-The id field is an internal tracker for the specific technician. It is created when the technician is added to the system.

List Technician: This will generate a list of technicians currently in the database. The response will look like the following:
```json
{
	"technicians": [
		{
			"id": 1,
			"first_name": "Fredfred",
			"last_name": "Burger",
			"employee_id": "1"
		},
    ]
}
```
Get a specific Technician: This will grab the information for a specific technician, identified by the id field. The response will look like the following:
```json
{
	"id": 1,
	"first_name": "Fredfred",
	"last_name": "Burger",
	"employee_id": "1"
}
```

Delete a Technician: This will delete a technician and their information from the database. When you delete the technician, you must specify the id field specific to them. The response will look like the following:
```json
{
	"id": null,
	"first_name": "Fredfred",
	"last_name": "Burger",
	"employee_id": "1"
}
```
The id field returns null, showing it has been removed from the database, as well as the details of the specific technician.

## Appointments
| Action | Method | URL |
|:----: | :----: | :----: |
|List Appointments | GET | http://localhost:8100/api/appointments/ |
|Create an Appointment | POST | http://localhost:8100/api/appointments/ |
|Change status to Finished | PUT | http://localhost:8100/api/appointments/if/finish |
|Change status to Canceled | PUT | http://localhost:8100/api/appointments/id/cancel |
|Delete Specific Appointment | DELETE | http://localhost:8100/api/appointments/id/ |

List appointment: This will generate a list of all the current appointments in the following response.
```json
{
	"appointments": [
		{
			"id": 13,
			"vin": "1234567",
			"customer": "TestCustomer12",
			"date_time": "3000-02-03T08:26:49+00:00",
			"reason": "TestReason12",
			"status": "",
			"technician": {
				"id": 1,
				"first_name": "test1",
				"last_name": "test1",
				"employee_id": "1"
			},
			"is_vip": true
		},
    ]
}
```
The id is generated by the system on the appointment creation. The vin is the vin of the customers automobile. Customer is the name of the customer, and the date_time field is when the appointment will take place. The application takes this date_time object from the forms two inputs of date and time, and combines them for this. Reason is the reason for the service appointment, and status is pending until updated to be either finished or canceled. The technician field is the data for the technician assigned to the appointment. Finally, is_vip is either true or false depending on if the vin matches a vin number from the list of automobiles the dealership currently has or has sold. This is done with the Automobile VO, which pulls the vin number from the automobiles using a poller.

Create Appointment: This will create an appointment. Use the following format for the JSON:
```json
{
	"vin": "42",
	"customer": "Fredfred",
	"date_time": "3000-02-03 08:26:49",
	"reason": "Oil Change",
	"status": "",
	"technician": 1
}
```
The status can be left blank, as the following PUT requests will alter it. Technician is specified by the id of the technician. This will produce the following response:
```json
{
	"id": 1,
	"vin": "42",
	"customer": "Fredfred",
	"date_time": "3000-02-03T08:26:49+00:00",
	"reason": "Burger",
	"status": "",
	"technician": {
		"id": 1,
		"first_name": "test1",
		"last_name": "test1",
		"employee_id": "1"
	},
	"is_vip": true
}
```
The id is automatically generated by the system when the appointment is created.

Change appointment status to Finished: This will change the status of the appointment to Finished. It will return this response:
```json
{
	"id": 1,
	"vin": "42",
	"customer": "Fredfred",
	"date_time": "3000-02-03T08:26:49+00:00",
	"reason": "Burger",
	"status": "FINISHED",
	"technician": {
		"id": 1,
		"first_name": "test1",
		"last_name": "test1",
		"employee_id": "1"
	},
	"is_vip": true
}

```

Change appointment status to Canceled: This will change the status of the appointment to Canceled. It will return this response:
```json
{
	"id": 1,
	"vin": "42",
	"customer": "Fredfred",
	"date_time": "3000-02-03T08:26:49+00:00",
	"reason": "Burger",
	"status": "CANCELED",
	"technician": {
		"id": 1,
		"first_name": "test1",
		"last_name": "test1",
		"employee_id": "1"
	},
	"is_vip": true
}
```
Delete appointment: This will delete the appointment at the given id. The response will look like this:
```json
{
	"id": null,
	"vin": "654321",
	"customer": "DerfDerf",
	"date_time": "2023-06-16T18:42:00+00:00",
	"reason": "Nine",
	"status": null,
	"technician": {
		"id": 5,
		"first_name": "DerfFred",
		"last_name": "Burreg",
		"employee_id": "12321"
	},
	"is_vip": true
}
```


## Sales microservice
The Sales Microservice is able to create customers, salespeople and a sale. Customers and Salepeople are both included in the characteristics of a sale of automobiles. It also lists customers, salespeople, sales, and salespeople history. It should also poll from autmobile data by the VIN to create sales as well as salespeople history.


Within the Sales microservice there are four models:

1. AutomobileVO

    - Value Object that represents the VIN and sold of the automobile model which is polled from the microservice.

2. Customer

    - The customers first name, last name, address, and phone number

3. SalesPerson

    - The Sales Person's first name, last name and employee id

4. Sales

    - Already registered salesperson, customer, and automobile are required for this sale, as well as the price of the the automobile.

__Sales Port: 8090__

***Customer RESTful API endpoints***
| Request Method  | Url                         | Action                                  |
| ----------------|:---------------------------:| :--------------------------------------------:|
| GET             | /api/customers    | Obtains a list of customers         |
| POST            | /api/customers    | Creates a new customer     |
| GET             | /api/customers/id# | Obtains individual customer's details |

example JSON
```json
{
	"name": "Josh Contreras",
	"address": "123 main",
	"phone_number": 123456789
}
```

example output
```json
{
	"first_name": "Josh",
	"last_name": "Contreras",
	"address": "123 main street",
	"phone_number": 123456789,
	"id": 1
}
```


</br>
</br>

***SalesPerson RESTful API endpoints***
| Request Method  | Url                   | What it does                            |
| ----------------|:---------------------:| :--------------------------------------:|
| GET             | /api/salespeople/    | Obtains a list of salespeople          |
| POST            | /api/salespeople/    | Creates a new salesperson     |
| GET             | /api/salesperson/id# | Sales Person details |

example JSON
```json
{
	"first_name": "Josh",
	"last_name": "Contreras",
	"employee_id": 117
}
```

example output
```json
{
	"first_name": "Josh",
	"last_name": "Contreras",
	"employee_id": 117,
	"id": 1
}
```

</br>
</br>

***Sales RESTful API endpoints***
| Request Method  | Url                   | Action                            |
| ----------------|:---------------------:| :--------------------------------------:|
| GET             | /api/sales/     | List sales          |
| POST            | /api/sales/     | Creates a new sale      |
| GET             | /api/sales/id#  | Obtains individual sale details  |
| DELETE          | /api/sales/id#  | Deletes a sale record    |

example JSON
```json
{
	"sales_person": 1,
	"customer": 1,
	"automobile": "12345",
	"price": "117000"
}
```

example output
```json
{
	"sales_person": {
		"first_name": "Josh",
		"last_name": "Contreras",
		"employee_id": 117,
		"id": 1
	},
	"customer": {
		"first_name": "Josh",
		"last_name": "Contreras",
		"address": "123 main street",
		"phone_number": 123456789,
		"id": 1
	},
	"automobile": {
		"vin": "12345",
		"color": "blue",
		"year": 2019,
		"sold": false,
		"id": 1
	},
	"price": "117000",
	"id": 1
}
```
