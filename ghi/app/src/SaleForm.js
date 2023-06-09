import React from 'react'

class SaleForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: "",
            salespeople: [],
            customers: [],
            automobiles: []
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.salespeople
        delete data.customers
        delete data.automobiles

        console.log(data)
        const salesUrl = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            const newSale = await response.json();
            console.log(newSale)

            const cleared = {
                price: '',
                sales_person: '',
                customer: '',
                automobile: '',
            }
            this.setState(cleared)
        }
    }

    handleChange(event) {
        const object = {}
        object[event.target.name] = event.target.value
        this.setState(object)
    }

    async componentDidMount() {
        const autoUrl = 'http://localhost:8100/api/automobiles/'
        const autoResponse = await fetch(autoUrl)
        const salesPersonUrl = 'http://localhost:8090/api/salespeople/'
        const salesPersonResponse = await fetch(salesPersonUrl)
        const customerUrl = 'http://localhost:8090/api/customers/'
        const customerResponse = await fetch(customerUrl)

        if (autoResponse.ok && salesPersonResponse.ok && customerResponse.ok) {
            const autoData = await autoResponse.json()
            const salesPersonData = await salesPersonResponse.json()
            const customerData = await customerResponse.json()

            this.setState({automobiles: autoData.autos})
            this.setState({salespeople: salesPersonData.salespeople})
            this.setState({customers: customerData.customers})
        }
    }


    render() {
        return (

                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Record New Sale</h1>
                            <form onSubmit={this.handleSubmit} id="create-sale-form">
                                <label htmlFor="automobile">Automobile VIN</label>
                                <div className="form-floating mb-3">
                                    <select onChange={this.handleChange} value={this.state.automobile} required name="automobile" id="automobile" className="form-select">
                                        <option value="">Choose an automobile VIN</option>
                                        {this.state.automobiles.map(automobile => {
                                            return (
                                                <option key={automobile.vin} value={automobile.vin}>
                                                    {automobile.vin}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <label htmlFor="sales_person">Salesperson</label>
                                <div className="mb-3">
                                    <select onChange={this.handleChange} value={this.state.sales_person} required name="sales_person" id="sales_person" className="form-select">
                                        <option value="">Choose a salesperson</option>
                                        {this.state.salespeople.map(sales_person => {
                                            return (
                                                <option key={sales_person.id} value={sales_person.id}>
                                                    {sales_person.first_name} {sales_person.last_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <label htmlFor="customer">Customer</label>
                                <div className="form-floating mb-3">
                                    <select onChange={this.handleChange} value={this.state.customer} required name="customer" id="customer" className="form-select">
                                        <option value="">Choose a customer</option>
                                        {this.state.customers.map(customer => {
                                            return (
                                                <option key={customer.id} value={customer.id}>
                                                    {customer.first_name} {customer.last_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <label htmlFor="price">Price</label>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.price} placeholder="price" required type="text" name="price" id="price" className="form-control" />
                                    <label htmlFor="price">0</label>
                                </div>
                                <button className="btn btn-primary">Create</button>
                            </form>
                        </div>
                    </div>
                </div>

        )
    }
}

export default SaleForm
