import { React, useState } from 'react';
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

const resorts = ['Riviera', 'Grand Floridian'];
const roomTypes = ['Studio', 'One Bedroom', 'Two Bedroom', 'Grand Villa'];

function DVCCalculatorComponent() {
  const [checkInDate, setCheckInDate] = useState(new Date('2014-08-18T21:11:54'));
  const [checkOutDate, setCheckOutDate] = useState(new Date('2014-08-18T21:11:54'));
  const [selectedResort, setSelectedResort] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [pointsNeeded, setPointsNeeded] = useState('');

  const handleCheckInDateChange = (newCheckInDate) => {
    setCheckInDate(newCheckInDate);
    setPointsNeeded('');
  };

  const handleCheckOutDateChange = (newCheckOutDate) => {
    setCheckOutDate(newCheckOutDate);
    setPointsNeeded('');
  };

  const handleResortChange = (event) => {
    setSelectedResort(event.target.value);
    setPointsNeeded('');
  };

  const handleRoomTypeChange = (event) => {
    setSelectedRoomType(event.target.value);
    setPointsNeeded('');
  };

  const calculatePointsNeeded = () => {
    const randomPointNumber = Math.floor(Math.random() * 225);
    setPointsNeeded(randomPointNumber);
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
            value={selectedResort}
            label="Resort"
            onChange={handleResortChange}
          >
            {resorts.map(resort => <MenuItem value={resort} key={resort}>{resort}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="room-type-select-label">Room Type</InputLabel>
          <Select
            labelId="room-type-select-label"
            id="room-type-select"
            value={selectedRoomType}
            label="Resort"
            onChange={handleRoomTypeChange}
          >
            {roomTypes.map(roomType => <MenuItem value={roomType} key={roomType}>{roomType}</MenuItem>)}
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