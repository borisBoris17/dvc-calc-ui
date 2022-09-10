import { React, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from 'axios';

function ImportViewTypeComponent(props) {
  const [selectedResortId, setSelectedResortId] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState('');
  const [viewTypeName, setViewTypeName] = useState('');

  useEffect(() => {
    if (selectedResortId) {
      axios.get('http://192.168.86.28:3001/dvc-calc-api/roomTypes/' + selectedResortId).then(resp => {
        setRoomTypes(resp.data);
      });
   }
  }, [selectedResortId]);

  const handleResortChange = (event) => {
    setSelectedResortId(event.target.value);
    setSelectedRoomTypeId("");
    setViewTypeName("");
  };

  const handleRoomTypeChange = (event) => {
    setSelectedRoomTypeId(event.target.value);
    setViewTypeName("");
  }

  const handleViewTypeNameChange = (event) => {
    setViewTypeName(event.target.value);
  }

  const saveRoomType = () => {
    axios.post('http://192.168.86.28:3001/dvc-calc-api/viewType', {
      name: `${viewTypeName}`,
      room_type_id: `${selectedRoomTypeId}`
    })
    .then(function (response) {
      alert('Saved successfully');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="ImportViewType">
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
          <InputLabel id="room-type-select-label">Room Type</InputLabel>
          <Select
            labelId="room-type-select-label"
            id="room-type-select"
            value={selectedRoomTypeId}
            label="Room Type"
            onChange={handleRoomTypeChange}>
            {roomTypes.map(roomType => <MenuItem value={roomType.room_type_id} key={roomType.room_type_id}>{roomType.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl>
          <TextField label="View Type Name" id="viewTypeNameInput" variant="outlined" onChange={handleViewTypeNameChange} value={viewTypeName} />
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

export default ImportViewTypeComponent;