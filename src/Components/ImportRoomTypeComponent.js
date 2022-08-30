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

function ImportRoomTypeComponent(props) {
  const [selectedResortId, setSelectedResortId] = useState('');
  const [roomTypeName, setRoomTypeName] = useState('');
  const [roomCapacity, setRoomCapacity] = useState('');

  const handleResortChange = (event) => {
    setSelectedResortId(event.target.value);
  };

  const handleRoomTypeNameChange = (event) => {
    setRoomTypeName(event.target.value);
  }

  const handleRoomCapacityChange = (event) => {
    setRoomCapacity(event.target.value);
  }

  const saveRoomType = () => {
    axios.post('http://localhost:3001/roomType', {
      name: `${roomTypeName}`,
      capacity: `${roomCapacity}`,
      resort_id: `${selectedResortId}`
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
          <TextField label="Room Type Name" id="roomTypeNameInput" variant="outlined" onChange={handleRoomTypeNameChange} value={roomTypeName} />
        </FormControl>
        <FormControl fullWidth>
          <TextField label="Room Capacity" id="roomCapacityInput" variant="outlined" onChange={handleRoomCapacityChange} value={roomCapacity} />
        </FormControl>
      </Stack>
      <Button variant='contained'
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