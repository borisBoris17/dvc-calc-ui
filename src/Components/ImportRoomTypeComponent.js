import { React, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from 'axios';
const config = require('../config');

function ImportRoomTypeComponent(props) {
  const [selectedResortId, setSelectedResortId] = useState('');
  const [roomTypeName, setRoomTypeName] = useState('');
  const [validRoomTypeName, setValidRoomTypeName] = useState(true);
  const [roomCapacity, setRoomCapacity] = useState('');
  const [validCapacity, setValidCapacity] = useState(true);

  const handleResortChange = (event) => {
    setSelectedResortId(event.target.value);
    setRoomTypeName("");
    setRoomCapacity("");
  };

  const handleRoomTypeNameChange = (event) => {
    if (event.target.value === undefined || !event.target.value.match(/^[A-Za-z\s]*$/)) {
      setValidRoomTypeName(false);
    } else {
      setValidRoomTypeName(true);
    }
    setRoomTypeName(event.target.value);
  }

  const handleRoomCapacityChange = (event) => {
    if (event.target.value === undefined || !event.target.value.match(/^[0-9]*$/)) {
      setValidCapacity(false);
    } else {
      setValidCapacity(true);
    }
    setRoomCapacity(event.target.value);
  }

  const saveRoomType = () => {
    axios.post(`${config.api.protocol}://${config.api.host}/dvc-calc-api/roomType`, {
      name: `${roomTypeName}`,
      capacity: `${roomCapacity}`,
      resort_id: `${selectedResortId}`
    }, {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
      .then(function (response) {
        alert('Saved successfully');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="ImportRoomType">
      <Stack spacing={3}>
        <Typography variant='h3'>Import Room Type</Typography>
        <FormControl fullWidth>
          <InputLabel id="resort-select-label">Resort</InputLabel>
          <Select
            labelId="resort-select-label"
            id="resort-select"
            value={selectedResortId}
            label="Resort"
            onChange={handleResortChange}>
            {props.resorts.map(resort => <MenuItem value={resort.resort_id} key={resort.resort_id}>{resort.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            disabled={selectedResortId.length === 0}
            error={!validRoomTypeName}
            helperText={validRoomTypeName ? "" : "Please Enter letters only."}
            label="Room Type Name"
            id="roomTypeNameInput"
            variant="outlined"
            onChange={handleRoomTypeNameChange}
            value={roomTypeName} />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            disabled={selectedResortId.length === 0}
            error={!validCapacity}
            helperText={validCapacity ? "" : "Please Enter a number only."}
            label="Room Capacity" 
            id="roomCapacityInput" 
            variant="outlined" 
            onChange={handleRoomCapacityChange} 
            value={roomCapacity} />
        </FormControl>
      </Stack>
      <Button variant='contained'
        disabled={!validCapacity || !validRoomTypeName || roomTypeName.length === 0 || roomCapacity.length === 0}
        sx={{
          width: '30%',
          margin: 'auto',
          marginTop: '2%',
        }}
        onClick={saveRoomType}>
        Save
      </Button>
    </div>
  );
}

export default ImportRoomTypeComponent;