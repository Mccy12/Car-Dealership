function TechnicianList({ technicians }) {
    return(
        <div>
        <h1>Technicians</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>

                {technicians.map(technician => {
                    return (
                        <tr key={technician.id}>
                            <td>{ technician.employee_id }</td>
                            <td>{ technician.first_name }</td>
                            <td>{ technician.last_name }</td>

                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
    );
}

export default TechnicianList;