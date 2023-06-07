function AppointmentList({ appointments }) {
    return(
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Vin</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                </tr>
            </thead>
            <tbody>

                {appointments.map(appointment => {
                    return (
                        <tr key={appointment.id}>
                            <td>{ appointment.vin }</td>
                            <td>{ appointment.customer }</td>
                            <td>{ appointment.date }</td>
                            <td>{ appointment.time }</td>
                            <td>{ appointment.technician }</td>
                            <td>{ appointment.reason }</td>

                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default AppointmentList;