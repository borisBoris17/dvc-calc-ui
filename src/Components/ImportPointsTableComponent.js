import { React, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import PointInsertTableComponent from './PointInsertTableComponent';
const config = require('../config');

const dummyPointBlocks = [{ pointBlockId: 1, dateRanges: [{ startDate: '09/01/2023', endDate: '09/30/2023' }] },
{ pointBlockId: 2, dateRanges: [{ startDate: '01/01/2023', endDate: '01/31/2023' }, { startDate: '05/01/2023', endDate: '05/14/2023' }] }];


function ImportPointsTableComponent(props) {

  const [selectedResortId, setSelectedResortId] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);
  const [pointBlockYear, setPointBlockYear] = useState('');
  const [validPointBlockYear, setValidPointBlockYear] = useState(true);
  const [pointBlocks, setPointBlocks] = useState(dummyPointBlocks);

  const handlePointBlockYearChange = (event) => {
    if (event.target.value.match(/^[0-9]{4}$/)) {
      setValidPointBlockYear(true);
    }
    setPointBlockYear(event.target.value);
  }

  useEffect(() => {
    if (selectedResortId) {
      axios.get(`${config.api.protocol}://${config.api.host}/dvc-calc-api/roomTypes/${selectedResortId}`).then(resp => {
        setRoomTypes(resp.data);
      });
    }
  }, [selectedResortId]);

  const validatePointBlockYearChange = (event) => {
    if (event.target.value === undefined || !event.target.value.match(/^[0-9]{4}$/)) {
      setValidPointBlockYear(false);
    } else {
      setValidPointBlockYear(true);
    }
  }

  const handleResortChange = (event) => {
    setSelectedResortId(event.target.value);
  };

  const savePointTable = () => {

  }

  return (
    <div className="ImportPoints">
      <Stack spacing={3}>
        <Typography variant='h3'>Import Point Block</Typography>
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
            error={!validPointBlockYear}
            helperText={validPointBlockYear ? "" : "Please Enter a number only."}
            label="Point Block Year"
            id="pointBlockYearInput"
            variant="outlined"
            onChange={handlePointBlockYearChange}
            onBlur={validatePointBlockYearChange}
            value={pointBlockYear} />
        </FormControl>
        {pointBlocks.map((pointBlock) => (
          <Grid container spacing={1}
            sx={{
              alignItems: 'center',
            }}>
            <Grid item lg={1}
              sx={{
                transform: 'rotate(-90deg)',
              }}>
              {pointBlock.dateRanges.map((dateRange) => (
                <Typography variant='body2'>{dateRange.startDate}-{dateRange.endDate}</Typography>
              ))}
            </Grid>
            {roomTypes.map((roomType) => (
              <Grid item lg={11 / roomTypes.length}>
                <PointInsertTableComponent roomType={roomType} />
              </Grid>
            ))}
          </Grid>
        ))}

      </Stack>

      <Button variant='contained'
        sx={{
          width: '30%',
          margin: 'auto',
          marginTop: '2%',
        }}
        onClick={savePointTable}>
        Save
      </Button>
    </div>
  );
}

export default ImportPointsTableComponent;