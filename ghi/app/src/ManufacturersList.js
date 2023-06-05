import React from 'react';
import {Link} from 'react-router-dom'

class ManufacturerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            manufacturers: []
        }
    }

    async componentDidMount() {
        const url = "http://localhost:8100/api/manufacturers/"
        const response = await fetch(url)
        if (response.ok) {
            let data = await response.json();
            this.setState({manufacturers: data.manufacturers})
        }
    }

    render() {
        return (
            <div>
                <h1>Vehicle Manufacturers</h1>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-right">
                    <Link to="/manufacturers/new/" className="btn btn-primary btn-md px-4 gap-3">Add new manufacturer</Link>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Manufacturer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.manufacturers.map(manufacturer => {
                            return (
                                <tr key={manufacturer.href}>
                                    <td>{manufacturer.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ManufacturerList
