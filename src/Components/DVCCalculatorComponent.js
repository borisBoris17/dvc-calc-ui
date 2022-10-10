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
import { TableContainer, Table, TableHead, TableBody, TableCell, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const config = require('../config');

function DVCCalculatorComponent(props) {
  const [roomTypes, setRoomTypes] = useState([]);
  const [viewTypes, setViewTypes] = useState([]);
  const [checkInDate, setCheckInDate] = useState(new Date('2023-09-18'));
  const [checkOutDate, setCheckOutDate] = useState(new Date('2023-09-25'));
  const [selectedResortId, setSelectedResortId] = useState('');
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState('');
  const [selectedViewTypeId, setSelectedViewTypeId] = useState('');
  const [pointsNeeded, setPointsNeeded] = useState('');
  const [pinnedPoints, setPinnedPoints] = useState([]);

  useEffect(() => {
    if (selectedResortId) {
      axios.get('https://dvc-calc.tucker-dev.com/dvc-calc-api/roomType/' + selectedResortId).then(resp => {
        setRoomTypes(resp.data);
      });
    }
  }, [selectedResortId]);

  useEffect(() => {
    if (selectedRoomTypeId) {
      axios.get(`${config.api.protocol}://${config.api.host}/dvc-calc-api/viewType/${selectedRoomTypeId}`).then(resp => {
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
    setSelectedRoomTypeId('');
    setSelectedViewTypeId('');
    setPointsNeeded('');
  };

  const handleRoomTypeChange = (event) => {
    setSelectedRoomTypeId(event.target.value);
    setSelectedViewTypeId('');
    setPointsNeeded('');
  };

  const handleViewTypeChange = (event) => {
    setSelectedViewTypeId(event.target.value);
    setPointsNeeded('');
  };

  const getResortNameFromId = (resortId) => {
    return props.resorts.find(resort => resort.resort_id === resortId).name;
  }

  const getRoomNameFromId = (roomTypeId) => {
    return roomTypes.find(roomType => roomType.room_type_id === roomTypeId).name;
  }

  const getViewNameFromId = (viewTypeId) => {
    return viewTypes.find(viewType => viewType.view_type_id === viewTypeId).name;
  }

  const addToPinnedPoints = () => {
    setPinnedPoints(current => [...current, createPinnedPoints()]);
  }

  const createPinnedPoints = () => {
    return {
      index: pinnedPoints.length,
      pointsNeeded: pointsNeeded,
      resortName: getResortNameFromId(selectedResortId),
      roomName: getRoomNameFromId(selectedRoomTypeId),
      viewName: getViewNameFromId(selectedViewTypeId),
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    }
  }

  const removeFromPinnedPoints = (index) => {
    setPinnedPoints(current => (
      current.filter(item => item.index !== index)
    ));
  }

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

  const displayPinnedPoints = () => {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Resort</TableCell>
              <TableCell>Room Type</TableCell>
              <TableCell>View Type</TableCell>
              <TableCell>Dates</TableCell>
              <TableCell>Points</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pinnedPoints.map(pinnedPoint => (

              <TableRow
                key={pinnedPoint.index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{pinnedPoint.resortName}</TableCell>
                <TableCell>{pinnedPoint.roomName}</TableCell>
                <TableCell>{pinnedPoint.viewName}</TableCell>
                <TableCell>{pinnedPoint.checkInDate.toLocaleDateString('en-us', { weekday: "short", year: "numeric", month: "short", day: "numeric" }) + "-" + pinnedPoint.checkOutDate.toLocaleDateString('en-us', { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</TableCell>
                <TableCell>{pinnedPoint.pointsNeeded}</TableCell>
                <TableCell>
                  <IconButton onClick={() => removeFromPinnedPoints(pinnedPoint.index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <div className='Calculator'>
      <Stack spacing={3}>
        <Typography variant='h3'>DVC Calculator</Typography>
        {pointsNeeded ? <Typography variant='h4'>You will need {pointsNeeded} for this stay.</Typography> : ''}
        {pinnedPoints && pinnedPoints.length > 0 ? displayPinnedPoints() : ''}
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
            disabled={selectedResortId.length === 0}
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
            disabled={selectedRoomTypeId.length === 0}
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
            renderInput={(params) => <TextField  {...params} error={checkInDate > checkOutDate} />}
            disabled={selectedViewTypeId.length === 0}
          />
          <DesktopDatePicker
            label="Check out Date"
            inputFormat="MM/dd/yyyy"
            value={checkOutDate}
            onChange={handleCheckOutDateChange}
            renderInput={(params) => <TextField {...params} error={checkInDate > checkOutDate} helperText={checkInDate > checkOutDate ? "Check In Date Must be before Check Out Date." : ""} />}
            disabled={selectedViewTypeId.length === 0}
          />
        </LocalizationProvider>
      </Stack>
      <Button variant='contained'
        disabled={selectedViewTypeId.length === 0 || checkInDate > checkOutDate}
        sx={{
          width: '30%',
          margin: '2%',
        }}
        onClick={calculatePointsNeeded}>
        Calculate
      </Button>
      <Button variant='contained'
        disabled={pointsNeeded === undefined || pointsNeeded === ""}
        sx={{
          width: '30%',
          margin: '2%',
        }}
        onClick={addToPinnedPoints}>
        Pin Points
      </Button>
    </div>
  );
}

export default DVCCalculatorComponent;