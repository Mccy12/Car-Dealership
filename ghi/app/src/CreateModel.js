import React, {useEffect, useState } from 'react';

function ModelsForm () {
    const [manufacturers, setManufacturers] = useState([]);

    const [name, setName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [manufacturer, setManufacturer] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handlePictureUrlChange = (e) => {
        setPictureUrl(e.target.value)
    }
    const handleManufacturerChange = (e) => {
        setManufacturer(e.target.value)
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {}

        data.name = name;
        data.picture_url = pictureUrl;
        data.manufacturer_id = manufacturer;

        const addModelUrl = 'http://localhost:8100/api/models/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(addModelUrl, fetchConfig)

        if (response.ok) {
            const newModel = await response.json();

            setName('');
            setPictureUrl('');
            setManufacturer('');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a model!</h1>
                    <form onSubmit={handleSubmit} id="create-model-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name"/>
                            <label htmlFor="name"></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureUrlChange} value={pictureUrl} placeholder="Put a url here!" required type="text" name="picture_url" id="picture_url"/>
                            <label htmlFor="picture_url"></label>
                        </div>

                        <div className="mb-3">
                            <select onChange={handleManufacturerChange} required id="manufacturer" name="manufacturer">
                                <option value="">Choose a manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                    return (

                                        <option key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </option>
                                    );
                                })}
							</select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModelsForm;