

function ModelList({models}) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Model</th>
                </tr>
            </thead>
            <tbody>
                {models.map(model => {
                    return (
                        <tr key={model.id}>
                            <td>{model.name}</td>
                            <td>{model.manufacturer.name}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default ModelList;
