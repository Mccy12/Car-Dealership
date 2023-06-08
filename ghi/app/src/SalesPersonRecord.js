import React from 'react';
import {Link} from 'react-router-dom'

class SalesPersonRecord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales: [],
            salespeople: []
        }
        this.handleChange = this.handleChange.bind(this)
    }

    async componentDidMount() {
        const salesUrl = "http://localhost:8090/api/sales/"
        const salesResponse = await fetch(salesUrl)
        const salesPersonUrl = "http://localhost:8090/api/salespeople/"
        const salesPersonResponse = await fetch(salesPersonUrl)
        if (salesResponse.ok && salesPersonResponse.ok) {
            const salesData = await salesResponse.json();
            const salesPersonData = await salesPersonResponse.json()
            this.setState({sales: salesData.sales})
            this.setState({salespeople: salesPersonData.salespeople})
        }
    }

    handleChange(event) {
        const object = {}
        object[event.target.name] = event.target.value
        this.setState(object)
    }

    render() {
        return (
            <div>
                <h1>Salesperson History</h1>
                <select onChange={this.handleChange} value={this.state.sales_person} required name="sales_person" id="sales_person" className="form-select">
                <option value="">Select a Salesperson</option>
                {this.state.salespeople.map(sales_person => {
                    return (
                        <option key={sales_person.id} value={sales_person.id}>
                            {sales_person.first_name} {sales_person.last_name}
                        </option>
                    )
                })}
                </select>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Sales Person</th>
                            <th>Employee ID</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sales.filter(
                            sale=> sale.sales_person.id.toString() === this.state.sales_person).map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.sales_person.first_name} {sale.sales_person.last_name}</td>
                                    <td>{sale.sales_person.employee_id}</td>
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

export default SalesPersonRecord
