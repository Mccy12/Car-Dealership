import React from 'react';


class SalepeopleList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salespeople: []
        }
    }

    async componentDidMount() {
        const url = "http://localhost:8090/api/salespeople/"
        const response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            this.setState({salespeople: data.salespeople})

        }
    }


    render() {
        return (
            <div>
                <h1>Salespeople</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.salespeople.map(sales_person => {
                            return (
                                <tr key={sales_person.id}>
                                    <td>{sales_person.employee_id}</td>
                                    <td>{sales_person.first_name}</td>
                                    <td>{sales_person.last_name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}




export default SalepeopleList
