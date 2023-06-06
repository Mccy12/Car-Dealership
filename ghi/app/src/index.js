import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//Grabbing the Car Models from the api and laoding them into the app
async function loadCarModels() {
  const response = await fetch('http://localhost:8100/api/models/')
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App carModels={data.models}/>
      </React.StrictMode>
    )
  }
}
loadCarModels();