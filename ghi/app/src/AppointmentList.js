function AppointmentList({ appointments, loadAppointments }) {


    return(
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Vin</th>
                    <th>Is Vip?</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map(appointment => {
                    let date = new Date(appointment.date_time).toLocaleDateString()
                    let time = new Date(appointment.date_time).toLocaleTimeString()

                    async function handleCancelSubmit(event) {
                        event.preventDefault();
                        const cancelUrl = `http://localhost:8080/api/appointments/${appointment.id}/cancel`
                        const fetchConfigCancel = {
                            method: "PUT"
                        }
                        const response = await fetch(cancelUrl, fetchConfigCancel);

                        loadAppointments();

                    }
                    async function handleFinishSubmit(event) {
                        event.preventDefault();
                        const cancelUrl = `http://localhost:8080/api/appointments/${appointment.id}/finish`
                        const fetchConfigFinish = {
                            method: "PUT"
                        }
                        const response = await fetch(cancelUrl, fetchConfigFinish);

                        loadAppointments();

                    }



                    return (

                        <tr key={appointment.id}>
                            <td>{ appointment.vin }</td>
                            <td>{ appointment.is_vip }</td>
                            <td>{ appointment.customer }</td>
                            <td>{ date }</td>
                            <td>{ time }</td>
                            <td>{ `${appointment.technician.first_name} ${appointment.technician.last_name}`}</td>
                            <td>{ appointment.reason }</td>
                            <td>
                                <button className="btn btn-primary" onClick={handleFinishSubmit}>Finish</button>
                                <button className="btn btn-danger" onClick={handleCancelSubmit}>Cancel</button>
                            </td>

                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default AppointmentList;