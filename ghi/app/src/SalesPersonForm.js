import React from 'react'

class SalesPersonForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: "",
            last_name:"",
            employee_id: "",
        };
        this.handleFirst_nameChange = this.handleFirst_nameChange.bind(this)
        this.handleLast_nameChange = this.handleLast_nameChange.bind(this)
        this.handleEmployee_idChange = this.handleEmployee_idChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };


        const salesPersonUrl = 'http://localhost:8090/api/salespeople/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(salesPersonUrl, fetchConfig);
        if (response.ok) {

            const cleared = {
                first_name: "",
                last_name:"",
                employee_id: "",
            };
            this.setState(cleared)
        }
    }

    // handleChange(event) {
    //     const object = {}
    //     object[event.target.name] = event.target.value
    //     this.setState(object)
    // }


    handleFirst_nameChange(event) {
        const value = event.target.value;
        this.setState({ first_name: value });
    }

    handleLast_nameChange(event) {
        const value = event.target.value;
        this.setState({ last_name: value });
    }

    handleEmployee_idChange(event) {
        const value = event.target.value;
        this.setState({ employee_id: value });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Add a Sales Person</h1>
                            <form onSubmit={this.handleSubmit} id="create-salesperson-form">
                                <div>
                                    <input onChange={this.handleFirst_nameChange} value={this.state.first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                                    <input onChange={this.handleLast_nameChange} value={this.state.last_name} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                                    <input onChange={this.handleEmployee_idChange} value={this.state.employee_id} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" className="form-control" />
                                </div>
                                <button className="btn btn-primary">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SalesPersonForm
