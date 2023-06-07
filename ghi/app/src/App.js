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
import { useEffect, useState } from 'react';

function App(props) {
  const [models, setModels] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [technicians, setTechnicians] = useState([])
  const [appointments, setAppointments] = useState([])

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
    loadCarModels();
    loadTechnicians();
    loadAppointments();
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
          <Route path="/appointments" element={<AppointmentList appointments={appointments} />} />
          <Route path="/appointments/new" element={<AppointmentForm loadAppointments={loadAppointments} technicians={technicians}/>} />
          <Route path="manufacturers" element={<ManufacturerList manufacturers={props.manufacturers} />} />
          <Route path="manufacturers">
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="automobiles" element={<AutomobileList automobiles={props.automobiles} />} />
          <Route path="automobiles">
            <Route path="new" element={<AutomobileForm />} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
