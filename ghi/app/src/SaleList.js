import React from 'react';
import {Link} from 'react-router-dom'

class SalesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales: []
        }
    }

    async componentDidMount() {
        const url = "http://localhost:8090/api/sales/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            this.setState({sales: data.sales})
        }
    }


    render() {
        return (
            <div>
                <h1>Sales</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Salesperson Employee ID</th>
                            <th>Salesperson Name</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sales.map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.sales_person.employee_id}</td>
                                    <td>{sale.sales_person.first_name} {sale.sales_person.last_name}</td>
                                    <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>${sale.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SalesList
