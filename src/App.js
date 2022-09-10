import { React, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import DVCCalculatorComponent from './Components/DVCCalculatorComponent';
import ImportPointsComponent from './Components/ImportPointsComponent';
import axios from 'axios';
import ImportRoomTypeComponent from './Components/ImportRoomTypeComponent';
import ImportViewTypeComponent from './Components/ImportViewTypeComponent';
import ImportFromFileComponent from './Components/ImportFromFileComponent';

function App() {
  const [resorts, setResorts] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.86.28:3001/dvc-calc-api/resorts').then(resp => {
      setResorts(resp.data);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DVCCalculatorComponent resorts={resorts}/> } />
          <Route path="/importPoints" element={<ImportPointsComponent resorts={resorts}/> } />
          <Route path="/importRoomType" element={<ImportRoomTypeComponent resorts={resorts}/> } />
          <Route path="/importViewType" element={<ImportViewTypeComponent resorts={resorts}/> } />
          <Route path="/importFromFile" element={<ImportFromFileComponent />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
