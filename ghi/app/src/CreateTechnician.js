import React, { useState } from "react"

function TechnicianForm({ loadTechnicians }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeID, setEmployeeID] = useState('');

    async function handleTechnicianSubmit(e) {
        e.preventDefault()

        const data = {
        first_name: firstName,
        last_name: lastName,
        employee_id: employeeID,
        }
        const addTechnicianUrl = 'http://localhost:8080/api/technicians/'
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(addTechnicianUrl, fetchConfig)

        if (response.ok) {
            const newTech = await response.json();

            loadTechnicians();

            setFirstName('');
            setLastName('');
            setEmployeeID('');
        }
    }
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }
    const handleEmployeeIDChange = (e) => {
        setEmployeeID(e.target.value)
    }


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a technician</h1>
                    <form onSubmit={handleTechnicianSubmit} id="create-technician-form">
                        <div className="form-floating mb-3">
                            <input value={firstName} onChange={handleFirstNameChange} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                            <label htmlFor="first_name" >First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={lastName} onChange={handleLastNameChange} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={employeeID} onChange={handleEmployeeIDChange} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" className="form-control" />
                            <label htmlFor="employee_id">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TechnicianForm;