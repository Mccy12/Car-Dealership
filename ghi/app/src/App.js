import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ModelList from './ModelList';
import ModelsForm from './CreateModel';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/models" element={<ModelList models={props.carModels}/>} />
          <Route path="/models/new" element={<ModelsForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
