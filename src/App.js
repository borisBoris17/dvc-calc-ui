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

const config = require('./config');

const links = [
  {
    name: "Home",
    location: "/",
  },
  {
    name: "Import Room",
    location: "/importRoomType"
  },
  {
    name: "Import View",
    location: "/importViewType"
  },
  {
    name: "Import Points",
    location: "/importPointsTable"
  },
  {
    name: "Import Point Block",
    location: "/importPointBlock"
  },
]

function App() {
  const [resorts, setResorts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios.get(`${config.api.protocol}://${config.api.host}/dvc-calc-api/resorts`).then(resp => {
      setResorts(resp.data);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <AppBar position='static'>


          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              id="sideMenu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <List>
                  <ListItem component={Link} href="/">
                    <ListItemButton>
                      <ListItemIcon>
                        <CalculateIcon></CalculateIcon>
                      </ListItemIcon>
                      <ListItemText primary="DVC Calculator" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem component={Link} href="/importRoomType">
                    <ListItemButton>
                      <ListItemIcon>
                        <BedIcon></BedIcon>
                      </ListItemIcon>
                      <ListItemText primary="Import Room Type" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem component={Link} href="/importViewType">
                    <ListItemButton>
                      <ListItemIcon>
                        <VisibilityIcon></VisibilityIcon>
                      </ListItemIcon>
                      <ListItemText primary="Import View Type" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem component={Link} href="/importPointBlock">
                    <ListItemButton>
                      <ListItemIcon>
                        <DateRangeIcon></DateRangeIcon>
                      </ListItemIcon>
                      <ListItemText primary="Import Point Block" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem component={Link} href="/importPointsTable">
                    <ListItemButton>
                      <ListItemIcon>
                        <AddchartIcon></AddchartIcon>
                      </ListItemIcon>
                      <ListItemText primary="Import Point Table" />
                    </ListItemButton>
                  </ListItem>
              </List>
            </Drawer>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>

        </AppBar>
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
