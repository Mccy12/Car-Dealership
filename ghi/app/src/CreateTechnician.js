import React, { useState, useEffect } from "react"

function TechnicianForm() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeID, setEmployeeID] = useState('');

    const handleFirstNameVhange = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }
    const handleEmployeeIDChange = (e) => {
        setEmployeeID(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {}

        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeID;

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

            setFirstName('');
            setLastName('');
            setEmployeeID('');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a technician</h1>
                    <form onSubmit={handleSubmit} id="create-technician-form">
                        <div className="form-floating mb-3">
                            <input value={firstName} onChange={handleFirstNameVhange} placeholder="First Name" required type="text" name="first_name" id="first_name" />
                            <label htmlFor="first_name" ></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={lastName} onChange={handleLastNameChange} placeholder="Last Name" required type="text" name="last_name" id="last_name" />
                            <label htmlFor="last_name"></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={employeeID} onChange={handleEmployeeIDChange} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" />
                            <label htmlFor="employee_id"></label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TechnicianForm;