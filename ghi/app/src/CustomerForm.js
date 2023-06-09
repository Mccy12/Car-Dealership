import React from 'react'

class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: "",
            last_name: "",
            address: "",
            phone_number: "",
        };
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
        this.handleLastNameChange = this.handleLastNameChange.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };

        const customerUrl = 'http://localhost:8090/api/customers/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {



            const cleared = {
                first_name:'',
                last_name:'',
                address: '',
                phone_number: ''
            }
            this.setState(cleared)
        }
    }

    handleFirstNameChange(event) {
        const value = event.target.value
        this.setState({first_name: value})
    }

    handleLastNameChange(event) {
        const value = event.target.value
        this.setState({last_name: value})
    }

    handleAddressChange(event) {
        const value = event.target.value
        this.setState({address: value})
    }

    handlePhoneNumberChange(event) {
        const value = event.target.value
        this.setState({phone_number: value})
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Add a Customer</h1>
                            <form onSubmit={this.handleSubmit} id="create-customer-form">
                            <div>
                                    <input onChange={this.handleFirstNameChange} value={this.state.first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                                    <input onChange={this.handleLastNameChange} value={this.state.last_name} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                                    <input onChange={this.handleAddressChange} value={this.state.address} placeholder="Address" required type="text" name="adress" id="address" className="form-control" />
                                    <input onChange={this.handlePhoneNumberChange} value={this.state.phone_number} placeholder="Phone Number" required type="text" name="phone_number" id="phone_number" className="form-control" />
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

export default CustomerForm
