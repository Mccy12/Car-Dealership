import React from 'react';

class ManufacturerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };

        const ManufacturerUrl = 'http://localhost:8100/api/manufacturers/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(ManufacturerUrl, fetchConfig);
        if (response.ok) {


            const cleared = {
                name: '',
            }
            this.setState(cleared)
        }
    }

    handleChange(event) {
        const object = {}
        object[event.target.name] = event.target.value
        this.setState(object)
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Create a new Manufacturer</h1>
                            <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input onChange={this.handleChange} value={this.state.name} placeholder="name" required type="text" name="name" id="name" className="form-control" />
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

export default ManufacturerForm
