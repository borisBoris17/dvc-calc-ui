import { React, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import DVCCalculatorComponent from './Components/DVCCalculatorComponent';
import ImportPointsComponent from './Components/ImportPointsComponent';
import ImportPointsTableComponent from './Components/ImportPointsTableComponent';
import axios from 'axios';
import ImportRoomTypeComponent from './Components/ImportRoomTypeComponent';
import ImportViewTypeComponent from './Components/ImportViewTypeComponent';
import ImportFromFileComponent from './Components/ImportFromFileComponent';
import ImportPointBlockComponent from './Components/ImportPointBlockComponent';
import AppBarComponent from './Components/AppBarComponent';
import jwt_decode from "jwt-decode";

const config = require('./config');

function App() {
  const [resorts, setResorts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
      const decoded = jwt_decode(localStorage.getItem('token'));
      setIsAdmin(decoded.is_admin);
    }
    axios.get(`${config.api.protocol}://${config.api.host}/dvc-calc-api/resort`).then(resp => {
      setResorts(resp.data);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <AppBarComponent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <Routes>
          <Route path="/" element={<DVCCalculatorComponent resorts={resorts} />} />
          <Route path="/importPoints" element={<ImportPointsComponent resorts={resorts} />} />
          <Route path="/importPointsTable" element={<ImportPointsTableComponent resorts={resorts} />} />
          <Route path="/importPointBlock" element={<ImportPointBlockComponent resorts={resorts} />} />
          <Route path="/importRoomType" element={<ImportRoomTypeComponent resorts={resorts} />} />
          <Route path="/importViewType" element={<ImportViewTypeComponent resorts={resorts} />} />
          <Route path="/importFromFile" element={<ImportFromFileComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
