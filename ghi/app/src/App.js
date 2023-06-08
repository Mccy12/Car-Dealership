import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerForm from './CreateManufacturer';
import ManufacturerList from './ManufacturersList';
import ModelList from './ModelList';
import ModelsForm from './CreateModel';
import AutomobileForm from './CreateAutomobile';
import AutomobileList from './AutomobileList';
import TechnicianForm from './CreateTechnician';
import AppointmentForm from './CreateAppointment';
import TechnicianList from './TechnicianList';
import AppointmentList from './AppointmentList';
import ServiceList from './ServiceHistory';
import SalesPersonForm from './SalesPersonForm';
import SalepeopleList from './SalepeopleList';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import SaleForm from './SaleForm';
import SaleList from './SaleList';
import SalesPersonRecord from './SalesPersonRecord';
import { useEffect, useState } from 'react';

function App(props) {
  const [models, setModels] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [technicians, setTechnicians] = useState([])
  const [appointments, setAppointments] = useState([])
  const [automobiles, setAutomobiles] = useState([])


  async function getAutomobiles() {
    const response = await fetch('http://localhost:8100/api/automobiles/')
      if (response.ok) {
        const data = await response.json();
        setAutomobiles(data.automobiles)
      } else {
        console.error(response)
      }
    }

  async function getAppointments() {
    const response = await fetch('http://localhost:8080/api/appointments/')
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments)
      } else {
        console.error(response)
      }
    }

  async function getTechnicians() {
    const response = await fetch('http://localhost:8080/api/technicians/')
      if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians);
      } else {
        console.error(response);
      }
    }

  async function getManufacturers() {
    const response = await fetch('http://localhost:8100/api/manufacturers/')
      if (response.ok) {
        const data = await response.json();
        setManufacturers(data.manufacturers);
      } else {
        console.error(response);
      }
    }

async function loadAutomobiles() {
  const response = await fetch('http://localhost:8100/api/automobiles/')
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.automobiles)
    } else {
      console.error(response)
    }
  }

async function loadAppointments() {
  const response = await fetch('http://localhost:8080/api/appointments/')
    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
    } else {
      console.error(response)
    }
}

async function loadTechnicians() {
  const response = await fetch('http://localhost:8080/api/technicians/')
  if (response.ok) {
    const data = await response.json();
    setTechnicians(data.technicians);
  } else {
    console.error(response)
  }
}

async function loadCarModels() {
  const response = await fetch('http://localhost:8100/api/models/')
    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    } else {
      console.error(response);
    }
  }

  useEffect(() => {
    getTechnicians();
    getManufacturers();
    getAppointments();
    getAutomobiles();
    loadCarModels();
    loadTechnicians();
    loadAppointments();
    loadAutomobiles();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/models" element={<ModelList models={models} />} />
          <Route path="/models/new" element={<ModelsForm manufacturers={manufacturers} loadCarModels={loadCarModels} />} />
          <Route path="/technicians" element={<TechnicianList technicians={technicians} />}/>
          <Route path="/technicians/new" element={<TechnicianForm loadTechnicians={loadTechnicians} />} />
          <Route path="/appointments" element={<AppointmentList loadAppointments={loadAppointments} automobiles={automobiles} appointments={appointments} />} />
          <Route path="appointments/history" element={<ServiceList appointments={appointments} />} />
          <Route path="/appointments/new" element={<AppointmentForm loadAppointments={loadAppointments} technicians={technicians}/>} />
          <Route path="manufacturers" element={<ManufacturerList manufacturers={props.manufacturers} />} />
          <Route path="manufacturers">
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="automobiles" element={<AutomobileList automobiles={props.automobiles} />} />
          <Route path="automobiles">
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="salespeople" element={<SalepeopleList salespeople={props.salespeople} />} />
          <Route path="salespeople">
              <Route path="new" element={<SalesPersonForm/>} />
          </Route>
          <Route path="customers" element={<CustomerList customers={props.customers} />} />
          <Route path="customers">
              <Route path="new" element={<CustomerForm/>} />
          </Route>
          <Route path="sales" element={<SaleList saless={props.sales} />} />
          <Route path="sales">
              <Route path="new" element={<SaleForm/>} />
          </Route>
          <Route path="salesperson" element={<SalesPersonRecord/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
