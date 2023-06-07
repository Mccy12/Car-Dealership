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

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/models" element={<ModelList models={props.carModels}/>} />
          <Route path="/models/new" element={<ModelsForm />} />
          <Route path="/technicians/new" element={<TechnicianForm />} />
          <Route path="/appointment/new" element={<AppointmentForm />} />
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
