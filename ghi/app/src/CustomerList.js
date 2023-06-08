import React from 'react';


class CustomerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: []
        }
    }

    async componentDidMount() {
        const url = "http://localhost:8090/api/customers/"
        const response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            this.setState({customers: data.customers})

        }
    }


    render() {
        return (
            <div>
                <h1>Customers</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.customers.map(customer => {
                            return (
                                <tr key={customer.id}>
                                    <td>{customer.first_name}</td>
                                    <td>{customer.last_name}</td>
                                    <td>{customer.phone_number}</td>
                                    <td>{customer.address}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}




export default CustomerList
