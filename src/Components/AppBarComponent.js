import { React, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import CalculateIcon from '@mui/icons-material/Calculate';
import BedIcon from '@mui/icons-material/Bed';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddchartIcon from '@mui/icons-material/Addchart';



function AppBarComponent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default AppBarComponent;