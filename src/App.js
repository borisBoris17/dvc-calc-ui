import { React, useState } from 'react';
import './App.css';
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
import DVCCalculatorComponent from './Components/DVCCalculatorComponent';

const resorts = ['Riviera', 'Grand Floridian'];
const roomTypes = ['Studio', 'One Bedroom', 'Two Bedroom', 'Grand Villa'];

function App() {
  const [checkInDate, setCheckInDate] = useState(new Date('2014-08-18T21:11:54'));
  const [checkOutDate, setCheckOutDate] = useState(new Date('2014-08-18T21:11:54'));
  const [selectedResort, setSelectedResort] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [pointsNeeded, setPointsNeeded] = useState('');

  const handleCheckInDateChange = (newCheckInDate) => {
    setCheckInDate(newCheckInDate);
  };

  const handleCheckOutDateChange = (newCheckOutDate) => {
    setCheckOutDate(newCheckOutDate);
  };

  const handleResortChange = (event) => {
    setSelectedResort(event.target.value);
  };

  const handleRoomTypeChange = (event) => {
    setSelectedRoomType(event.target.value);
  };

  const calculatePointsNeeded = () => {
    const randomPointNumber = Math.floor(Math.random() * 225);
    setPointsNeeded(randomPointNumber);
  }

  return (
    <div className="App">
      <DVCCalculatorComponent/>
    </div>
  );
}

export default App;
