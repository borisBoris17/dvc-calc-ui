import { React, useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';

function DVCCalculatorComponent(props) {
  const [roomTypes, setRoomTypes] = useState([]);
  const [viewTypes, setViewTypes] = useState([]);
  const [checkInDate, setCheckInDate] = useState(new Date('2023-09-18'));
  const [checkOutDate, setCheckOutDate] = useState(new Date('2023-09-25'));
  const [selectedResortId, setSelectedResortId] = useState('');
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState('');
  const [selectedViewTypeId, setSelectedViewTypeId] = useState('');
  const [pointsNeeded, setPointsNeeded] = useState('');

  useEffect(() => {
    if (selectedResortId) {
      axios.get('https://dvc-calc.tucker-dev.com/dvc-calc-api/roomTypes/' + selectedResortId).then(resp => {
        setRoomTypes(resp.data);
      });
   }
  }, [selectedResortId]);

  useEffect(() => {
    if (selectedRoomTypeId) {
      axios.get('https://dvc-calc.tucker-dev.com/dvc-calc-api/viewTypes/' + selectedRoomTypeId).then(resp => {
        setViewTypes(resp.data);
      });
   }
  }, [selectedRoomTypeId]);

  const handleCheckInDateChange = (newCheckInDate) => {
    setCheckInDate(newCheckInDate);
    setPointsNeeded('');
  };

  const handleCheckOutDateChange = (newCheckOutDate) => {
    setCheckOutDate(newCheckOutDate);
    setPointsNeeded('');
  };

  const handleResortChange = (event) => {
    setSelectedResortId(event.target.value);
    setPointsNeeded('');
  };

  const handleRoomTypeChange = (event) => {
    setSelectedRoomTypeId(event.target.value);
    setPointsNeeded('');
  };

  const handleViewTypeChange = (event) => {
    setSelectedViewTypeId(event.target.value);
    setPointsNeeded('');
  };

  const calculatePointsNeeded = () => {
    let checkInDateYear = checkInDate.getFullYear();
    let checkInDateMonth = checkInDate.getMonth() + 1;
    let checkInDateDay = checkInDate.getDate();
    let checkOutDateYear = checkOutDate.getFullYear();
    let checkOutDateMonth = checkOutDate.getMonth() + 1;
    let checkOutDateDay = checkOutDate.getDate();

    axios.get(`https://dvc-calc.tucker-dev.com/dvc-calc-api/pointAmount/${selectedViewTypeId}/${checkInDateYear}-${checkInDateMonth}-${checkInDateDay}/${checkOutDateYear}-${checkOutDateMonth}-${checkOutDateDay}`).then(resp => {
      setPointsNeeded(resp.data.numPoints);
    });
  }

  return (
    <div className='Calculator'>
      <Stack spacing={3}>
        <Typography variant='h3'>DVC Calculator</Typography>
        {pointsNeeded ? <Typography variant='h4'>You will need {pointsNeeded} for this stay.</Typography> : ''}
        <FormControl fullWidth>
          <InputLabel id="resort-select-label">Resort</InputLabel>
          <Select
            labelId="resort-select-label"
            id="resort-select"
            value={selectedResortId}
            label="Resort"
            onChange={handleResortChange}
          >
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
            onChange={handleRoomTypeChange}
          >
            {roomTypes.map(roomType => <MenuItem value={roomType.room_type_id} key={roomType.room_type_id}>{roomType.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="view-type-select-label">View Type</InputLabel>
          <Select
            labelId="view-type-select-label"
            id="view-type-select"
            value={selectedViewTypeId}
            label="View Type"
            onChange={handleViewTypeChange}
          >
            {viewTypes.map(viewType => <MenuItem value={viewType.view_type_id} key={viewType.view_type_id}>{viewType.name}</MenuItem>)}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Check in Date"
            inputFormat="MM/dd/yyyy"
            value={checkInDate}
            onChange={handleCheckInDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label="Check out Date"
            inputFormat="MM/dd/yyyy"
            value={checkOutDate}
            onChange={handleCheckOutDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Stack>
      <Button variant='contained'
        sx={{
          width: '30%',
          margin: 'auto',
          marginTop: '2%',
        }}
        onClick={calculatePointsNeeded}>
        Calculate
      </Button>
    </div>
  );
}

export default DVCCalculatorComponent;