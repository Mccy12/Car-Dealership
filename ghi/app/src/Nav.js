
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              Inventory
            </a>
            <div className="dropdown-menu">
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className=" nav-link" to='/models'> Models</NavLink>
              </div>
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className="nav-link" to='/models/new'>New Models</NavLink>
              </div>
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className="nav-link" to='/manufacturers'>Manufacturer</NavLink>
              </div>
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className="nav-link" to='/manufacturers/new'>New Manufacturer</NavLink>
              </div>
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className="nav-link" to='/automobiles'>Automobiles</NavLink>
              </div>
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className="nav-link" to='/automobiles/new'>New Automobile</NavLink>
              </div>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              Sales
            </a>
            <div className="dropdown-menu">
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className=" nav-link" to='/salespeople'> Salespeople</NavLink>
              </div>
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className="nav-link" to='/salespeople/new'>Add a Salesperson</NavLink>
              </div>
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className=" nav-link" to='/salesperson'>Salespeople History</NavLink>
              </div>
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className="nav-link" to='/customers'>Customers</NavLink>
              </div>
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className="nav-link" to='/customers/new'>Add a Customer</NavLink>
              </div>
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className="nav-link" to='/sales'>Sales</NavLink>
              </div>
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className="nav-link" to='/sales/new'>Add a Sale</NavLink>
              </div>
            </div>
          </div>
          <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              Services
            </a>
            <div className="dropdown-menu">
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className=" nav-link" to='/technicians'> Technicians</NavLink>
              </div>
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className="nav-link" to='/technicians/new'>Add a Technician</NavLink>
              </div>
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className="nav-link" to='/appointments'>Appointments</NavLink>
              </div>
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className="nav-link" to='/appointments/new'>Schedule an Appointment</NavLink>
              </div>
              <div className="dropdown-item" style={{padding: "0"}}>
                <NavLink className="nav-link" to='/appointments/history'>Service History</NavLink>
              </div>
            </div>
          </div>

        </div>

        </div>
      </div>
    </nav>
  )
}

export default Nav;
