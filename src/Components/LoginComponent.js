import { React, useState } from 'react';
import { FormControl, Stack, Link, Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
const config = require('../config');

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

function LoginComponent(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post(`${config.api.protocol}://${config.api.host}/dvc-calc-api/account/login`, {
      username: username, password: password
    }).then(resp => {
      localStorage.setItem('token', resp.data.token);
      props.setIsLoggedIn(true);
      setUsername('');
      setPassword('');
      props.handleCloseLogin();
    });
  }

  const handleRegister = () => {
    axios.post(`${config.api.protocol}://${config.api.host}/dvc-calc-api/account`, {
      username: username, password: password
    }).then(resp => {
      localStorage.setItem('token', resp.data.token);
      setUsername('');
      setPassword('');
      props.handleCloseLogin();
    });
  }

  return (
    <Modal
      open={props.openLoginMenu}
      onClose={props.handleCloseLogin}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>

        <Stack spacing={3}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login
          </Typography>
          <FormControl fullWidth>
            <TextField
              label="Username"
              id="usernameInput"
              variant="outlined"
              onChange={(event) => setUsername(event.target.value)}
              value={username} />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              type='password'
              label="Password"
              id="passwordInput"
              variant="outlined"
              onChange={(event) => setPassword(event.target.value)}
              value={password} />
          </FormControl>
          <Grid container >
            <Grid item xs={9}>
              <Button variant='outlined' onClick={handleLogin} >
                Login
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={handleRegister}>
                Register
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Modal>
  )
}

export default LoginComponent;