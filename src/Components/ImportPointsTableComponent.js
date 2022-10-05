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
import DateRangesComponent from './DateRangesComponent';
import e from 'cors';
const config = require('../config');

function ImportPointsTableComponent(props) {

  const [selectedResortId, setSelectedResortId] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);
  const [pointBlockYear, setPointBlockYear] = useState('');
  const [validPointBlockYear, setValidPointBlockYear] = useState(true);
  const [pointBlocks, setPointBlocks] = useState([]);
  const [inputPointValues, setInputPointValues] = useState([]);

useEffect(() => {
  console.log(inputPointValues);
}, [inputPointValues])

  useEffect(() => {
    if (selectedResortId) {
      axios.get(`${config.api.protocol}://${config.api.host}/dvc-calc-api/roomTypes/${selectedResortId}`).then(resp => {
        setRoomTypes(resp.data);
      });
    }
  }, [selectedResortId]);

  useEffect(() => {
    if (pointBlockYear && pointBlockYear.match(/^[0-9]{4}$/)) {
      axios.get(`${config.api.protocol}://${config.api.host}/dvc-calc-api/pointBlock/${selectedResortId}/${pointBlockYear}`).then(resp => {
        setPointBlocks(resp.data);
      });
    }
  }, [pointBlockYear]);

  const validatePointBlockYearChange = (event) => {
    if (event.target.value === undefined || !event.target.value.match(/^[0-9]{4}$/)) {
      setValidPointBlockYear(false);
    } else {
      setValidPointBlockYear(true);
    }
  }

  const handleResortChange = (event) => {
    setPointBlockYear('');
    setValidPointBlockYear(true);
    setSelectedResortId(event.target.value);
  };

  const handlePointBlockYearChange = (event) => {
    if (event.target.value.match(/^[0-9]{4}$/)) {
      setValidPointBlockYear(true);
    }
    setPointBlockYear(event.target.value);
  }

  const savePointTable = () => {
    axios.post(`${config.api.protocol}://${config.api.host}/dvc-calc-api/pointValue/table`, { pointValuesFromTable: inputPointValues }).then(resp => {
      alert("Saved Successfully");
      setSelectedResortId('')
      setPointBlockYear('');
      setValidPointBlockYear(true);
      setPointBlocks([]);
      setInputPointValues([]);
    });
  }

  const handleWeekendRateChange = (event, viewTypeId, pointBlockId) => {
    console.log(viewTypeId, pointBlockId, event.target.value)
    let foundMatch = false;
    setInputPointValues(current => 
      current.map(inputPointValue => {
        if (inputPointValue && inputPointValue.point_block_id === pointBlockId && inputPointValue.view_type_id === viewTypeId) {
          foundMatch = true;
          return { ...inputPointValue, weekend_rate: event.target.value };
        }
        return inputPointValue;
      }),
    )
    if (!foundMatch) {
      setInputPointValues(current => [...current, createEmptypointValueFromWeekendRate()])
    }
  }

  const handleWeekdayRateChange = (event, viewTypeId, pointBlockId) => {
    console.log(viewTypeId, pointBlockId, event.target.value)
    let foundMatch = false;
    setInputPointValues(current => 
      current.map(inputPointValue => {
        if (inputPointValue && inputPointValue.point_block_id === pointBlockId && inputPointValue.view_type_id === viewTypeId) {
          foundMatch = true;
          return { ...inputPointValue, weekday_rate: event.target.value };
        } 
        return inputPointValue;
      }),
    );
    if (!foundMatch) {
      const newInputValues = [...inputPointValues];
      newInputValues.push(createEmptypointValueFromWeekdayRate(viewTypeId, pointBlockId, event.target.value));
      setInputPointValues(newInputValues);
    }
  }

  const createEmptypointValueFromWeekendRate = (viewTypeId, pointBlockId, weekendRate) => {
    return {
      point_block_id: pointBlockId,
      view_type_id: viewTypeId,
      weekday_rate: '',
      weekend_rate: weekendRate,
    }
  }

  const createEmptypointValueFromWeekdayRate = (viewTypeId, pointBlockId, weekdayRate) => {
    return {
      point_block_id: pointBlockId,
      view_type_id: viewTypeId,
      weekday_rate: weekdayRate,
      weekend_rate: '',
    }
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
                // transform: 'rotate(-90deg)'
              }}>
              <DateRangesComponent pointBlock={pointBlock} />
            </Grid>
            {roomTypes.map((roomType) => (
              <Grid item lg={10 / roomTypes.length}>
                <PointInsertTableComponent pointBlockId={pointBlock.point_block_id} roomType={roomType} handleWeekendRateChange={handleWeekendRateChange} handleWeekdayRateChange={handleWeekdayRateChange} />
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