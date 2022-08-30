import { React, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios'

function ImportPointsComponent(props) {
  const [roomTypes, setRoomTypes] = useState([]);
  const [viewTypes, setViewTypes] = useState([]);
  const [selectedResortId, setSelectedResortId] = useState('');
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState('');
  const [selectedViewTypeId, setSelectedViewTypeId] = useState('');

  useEffect(() => {
    if (selectedResortId) {
      axios.get('http://localhost:3001/roomTypes/' + selectedResortId).then(resp => {
        setRoomTypes(resp.data);
      });
   }
  }, [selectedResortId]);

  useEffect(() => {
    if (selectedRoomTypeId) {
      axios.get('http://localhost:3001/viewTypes/' + selectedRoomTypeId).then(resp => {
        setViewTypes(resp.data);
      });
   }
  }, [selectedRoomTypeId]);

  const handleResortChange = (event) => {
    setSelectedResortId(event.target.value);
  };

  const handleRoomTypeChange = (event) => {
    setSelectedRoomTypeId(event.target.value);
  }

  const handleViewTypeChange = (event) => {
    setSelectedViewTypeId(event.target.value);
  }

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <div className="ImportPoints">
      <Typography variant='h3'>Import Points</Typography>
      <Stack spacing={3}>
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
        <TableContainer >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Weekday Rate</TableCell>
                <TableCell>Weekend Rate</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <FormControl fullWidth>
                      <TextField id="weekdayRateInput" variant="standard" />
                    </FormControl>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <FormControl fullWidth>
                      <TextField id="weekendRateInput" variant="standard" />
                    </FormControl>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          label="Check in Date"
                          inputFormat="MM/dd/yyyy"
                          // value={checkInDate}
                          // onChange={handleCheckInDateChange}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          label="Check out Date"
                          inputFormat="MM/dd/yyyy"
                          // value={checkOutDate}
                          // onChange={handleCheckOutDateChange}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </div>
  );
}

export default ImportPointsComponent;