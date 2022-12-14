import { React, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TableComponent from './UtilityComponents/TableComponent';
import axios from 'axios';
const config = require('../config');
const util = require('../Utilities/util');

function ImportViewTypeComponent(props) {
  const [selectedResortId, setSelectedResortId] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState('');
  const [viewTypeName, setViewTypeName] = useState('');
  const [validViewTypeName, setValidViewTypeName] = useState(true);
  const [viewTypes, setViewTypes] = useState([]);

  useEffect(() => {
    if (selectedResortId) {
      axios.get(`${config.api.protocol}://${config.api.host}/dvc-calc-api/roomType/${selectedResortId}`).then(resp => {
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
    if (event.target.value === undefined || !event.target.value.match(/^[A-Za-z\s]*$/)) {
      setValidViewTypeName(false);
    } else {
      setValidViewTypeName(true);
    }
    setViewTypeName(event.target.value);
  }

  const saveViewType = () => {
    const token = util.getTokenFromStorage();
    if (token === undefined) {
      props.handleOpenSnackbar('Need to Login');
    } else {
      axios.post(`${config.api.protocol}://${config.api.host}/dvc-calc-api/viewType`, {
        name: `${viewTypeName}`,
        room_type_id: `${selectedRoomTypeId}`
      }, {
        headers: {
          'x-access-token': token.token
        }
      })
        .then(function (response) {
          setViewTypes(current => [...current, response.data])
          props.handleOpenSnackbar('View Type Saved successfully.')
          setViewTypeName('');
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const viewTypeHeaders = [{
    name: 'View Type Name',
    fieldName: 'name'
  }
  ]

  return (
    <div className="ImportViewType">
      <Stack spacing={3}>
        <Typography variant='h3'>Import View Type</Typography>
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
            disabled={selectedResortId.length === 0}
            labelId="room-type-select-label"
            id="room-type-select"
            value={selectedRoomTypeId}
            label="Room Type"
            onChange={handleRoomTypeChange}>
            {roomTypes.map(roomType => <MenuItem value={roomType.room_type_id} key={roomType.room_type_id}>{roomType.name}</MenuItem>)}
          </Select>
        </FormControl>
        {
          viewTypes.length > 0 ?
            <FormControl fullWidth>
              <TableComponent headers={viewTypeHeaders} rows={viewTypes} rowId={'view_type_id'} />
            </FormControl> : ""
        }
        <FormControl>
          <TextField
            disabled={selectedRoomTypeId.length === 0}
            error={!validViewTypeName}
            helperText={validViewTypeName ? "" : "Please Enter letters only."}
            label="View Type Name"
            id="viewTypeNameInput"
            variant="outlined"
            onChange={handleViewTypeNameChange}
            value={viewTypeName} />
        </FormControl>
      </Stack>
      <Button variant='contained'
        disabled={!validViewTypeName || viewTypeName.length === 0}
        sx={{
          width: '30%',
          margin: 'auto',
          marginTop: '2%',
        }}
        onClick={saveViewType}>
        Save
      </Button>
    </div>
  );
}

export default ImportViewTypeComponent;