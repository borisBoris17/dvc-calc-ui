import { React, useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CalculateIcon from '@mui/icons-material/Calculate';
import BedIcon from '@mui/icons-material/Bed';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddchartIcon from '@mui/icons-material/Addchart';
import LoginComponent from './LoginComponent';
import { PropaneSharp } from '@mui/icons-material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

function AppBarComponent(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLoginMenu, setOpenLoginMenu] = useState(false);
  const openSideMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenLogin = () => setOpenLoginMenu(true);
  const handleCloseLogin = () => setOpenLoginMenu(false);

  return (
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
          open={openSideMenu}
          onClose={handleClose}
        >
          <List>
            <ListItem component={Button} href="/">
              <ListItemButton>
                <ListItemIcon>
                  <CalculateIcon></CalculateIcon>
                </ListItemIcon>
                <ListItemText primary="DVC Calculator" />
              </ListItemButton>
            </ListItem>
            <ListItem component={Button} href="/importRoomType" disabled={!props.isLoggedIn} >
              <ListItemButton>
                <ListItemIcon>
                  <BedIcon></BedIcon>
                </ListItemIcon>
                <ListItemText primary="Import Room Type" />
              </ListItemButton>
            </ListItem>
            <ListItem component={Button} href="/importViewType" disabled={!props.isLoggedIn}>
              <ListItemButton>
                <ListItemIcon>
                  <VisibilityIcon></VisibilityIcon>
                </ListItemIcon>
                <ListItemText primary="Import View Type" />
              </ListItemButton>
            </ListItem>
            <ListItem component={Button} href="/importPointBlock" disabled={!props.isLoggedIn}>
              <ListItemButton>
                <ListItemIcon>
                  <DateRangeIcon></DateRangeIcon>
                </ListItemIcon>
                <ListItemText primary="Import Point Block" />
              </ListItemButton>
            </ListItem>
            <ListItem component={Button} href="/importPointsTable" disabled={!props.isLoggedIn}>
              <ListItemButton>
                <ListItemIcon>
                  <AddchartIcon></AddchartIcon>
                </ListItemIcon>
                <ListItemText primary="Import Point Table" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        {props.isLoggedIn === true ? '' : <><Button color="inherit" onClick={handleOpenLogin}>Login</Button>
        <LoginComponent openLoginMenu={openLoginMenu} handleCloseLogin={handleCloseLogin} setIsLoggedIn={props.setIsLoggedIn}/></>}
      </Toolbar>
    </AppBar>
  )
}

export default AppBarComponent;