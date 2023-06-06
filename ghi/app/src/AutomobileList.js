import React from 'react';



class AutomobileList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            autos: []
        }
    }

    async componentDidMount() {
        const url = "http://localhost:8100/api/automobiles/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            this.setState({ autos: data.autos })
        }
    }


    render() {
        return (
            <div>
                <h1>Automobiles</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Color</th>
                            <th>Year</th>
                            <th>Vin</th>
                            <th>Model</th>
                            <th>Make</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.autos.map(auto => {
                            return (
                                <tr key={auto.id}>
                                    <td>{auto.color}</td>
                                    <td>{auto.year}</td>
                                    <td>{auto.vin}</td>
                                    <td>{auto.model.name}</td>
                                    <td>{auto.model.manufacturer.name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AutomobileList;
