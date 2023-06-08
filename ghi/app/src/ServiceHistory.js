import { useState } from "react";


function ServiceList({ appointments }) {

    const [query, setQuery] = useState('')

    return(
        <div>
        <input type="text" placeholder="Search" className="Search" onChange={e=> setQuery(e.target.value)} />
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
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>

                {appointments.filter(appointment=>appointment.vin.includes(query)).map(appointment => {
                    let date = new Date(appointment.date_time).toLocaleDateString()
                    let time = new Date(appointment.date_time).toLocaleTimeString()

                    return (

                        <tr key={appointment.id}>
                            <td>{ appointment.vin }</td>
                            <td>{ appointment.is_vip ? 'Yes' : 'No' }</td>
                            <td>{ appointment.customer }</td>
                            <td>{ date }</td>
                            <td>{ time }</td>
                            <td>{ `${appointment.technician.first_name} ${appointment.technician.last_name}`}</td>
                            <td>{ appointment.reason }</td>
                            <td>{ appointment.status }</td>

                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
    );
}

export default ServiceList;