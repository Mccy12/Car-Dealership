import React, { useState, useEffect } from "react"

function AppointmentForm({ loadAppointments, technicians }) {

    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [technician, setTechnician] = useState([]);
    const [reason, setReason] = useState('');

    useEffect(() => {
        async function getTechnicians() {
            const url = 'http://localhost:8080/api/technicians/'

            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json()
                setTechnician(data.technicians)
            }
        }
        getTechnicians();
    }, []);


    const handleAppointmentSubmit = async (e) => {
        e.preventDefault();

        const data = {
        vin,
        customer,
        date_time: `${date} ${time}`,
        technician,
        reason,
        }

        const appointmentUrl = 'http://localhost:8080/api/appointments/'
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(appointmentUrl, fetchConfig)

        if (response.ok) {
            const newAppointment = await response.json()

            loadAppointments();

            setVin('');
            setCustomer('');
            setDate('');
            setTime('');
            setTechnician('');
            setReason('');
        }
    }

    const handleVinChange = (e) => {
        setVin(e.target.value)
    }
    const handleCustomerChange = (e) => {
        setCustomer(e.target.value)
    }
    const handleDateChange = (e) => {
        setDate(e.target.value)
    }
    const handleTimeChange = (e) => {
        setTime(e.target.value)
    }
    const handleTechnicianChange = (e) => {
        setTechnician(e.target.value)
    }
    const handleReasonChange = (e) => {
        setReason(e.target.value)
    }


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create an appointment!</h1>
                    <form onSubmit={handleAppointmentSubmit} id="create-appointment-form">
                        <div className="form-floating mb-3">
                            <input value={vin} onChange={handleVinChange} placeholder="Automobile Vin" required type="text" name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">Automobile Vin</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={customer} onChange={handleCustomerChange} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={date} onChange={handleDateChange} placeholder="Date" required type="date" name="date" id="date" className="form-control" />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={time} onChange={handleTimeChange} placeholder="Time" required type="time" name="time" id="time" className="form-control" />
                            <label htmlFor="time">Time</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleTechnicianChange} required id="technician" name="technician" className="form-select">
                                <option value="">Choose a technician</option>
                                    {technicians.map(technician => {
                                        return (
                                            <option key={technician.id} value={technician.id}>
                                                {technician.first_name +  " " + technician.last_name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={reason} onChange={handleReasonChange} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AppointmentForm;