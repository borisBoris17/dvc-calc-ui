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
import { AppBar, Toolbar, IconButton, Typography, Button, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import CalculateIcon from '@mui/icons-material/Calculate';
import BedIcon from '@mui/icons-material/Bed';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddchartIcon from '@mui/icons-material/Addchart';
import AppBarComponent from './Components/AppBarComponent';

const config = require('./config');

function App() {
  const [resorts, setResorts] = useState([]);

  useEffect(() => {
    axios.get(`${config.api.protocol}://${config.api.host}/dvc-calc-api/resorts`).then(resp => {
      setResorts(resp.data);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <AppBarComponent />
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
