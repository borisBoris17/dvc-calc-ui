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
import { Snackbar } from '@mui/material';
import AppBarComponent from './Components/AppBarComponent';
import jwt_decode from "jwt-decode";

const config = require('./config');
const util = require('./Utilities/util');

function App() {
  const [resorts, setResorts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  useEffect(() => {
    const token = util.getTokenFromStorage();
    if (token) {
      const decoded = jwt_decode(token.token);
      setIsLoggedIn(true);
      setIsAdmin(decoded.is_admin);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
    axios.get(`${config.api.protocol}://${config.api.host}/dvc-calc-api/resort`).then(resp => {
      setResorts(resp.data);
    });
  }, []);

  const handleOpenSnackbar = (message) => {
    setSnackBarMessage(message);
    setOpenSnackbar(true);
  }

  const handleCloseSnackbar = () => {
    setSnackBarMessage('');
    setOpenSnackbar(false);
  }

  return (
    <Router>
      <div className="App">
        <AppBarComponent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <Routes>
          <Route path="/" element={<DVCCalculatorComponent resorts={resorts} />} />
          <Route path="/importPoints" element={<ImportPointsComponent resorts={resorts} />} />
          <Route path="/importPointsTable" element={<ImportPointsTableComponent resorts={resorts} handleOpenSnackbar={handleOpenSnackbar} />} />
          <Route path="/importPointBlock" element={<ImportPointBlockComponent resorts={resorts} handleOpenSnackbar={handleOpenSnackbar} />} />
          <Route path="/importRoomType" element={<ImportRoomTypeComponent resorts={resorts} handleOpenSnackbar={handleOpenSnackbar} />} />
          <Route path="/importViewType" element={<ImportViewTypeComponent resorts={resorts} handleOpenSnackbar={handleOpenSnackbar} />} />
          <Route path="/importFromFile" element={<ImportFromFileComponent />} />
        </Routes>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackBarMessage}
      />
      </div>
    </Router>
  );
}

export default App;
