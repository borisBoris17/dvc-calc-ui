import { React, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
const config = require('../config');

function ImportPointBlockComponent(props) {

  const [pointBlockGroups, setPointBlockGroups] = useState([]);
  const [selectedPointBlockGroupId, setSelectedPointBlockGroupId] = useState('');
  const [valueIndex, setValueIndex] = useState('');
  const [validValueIndex, setValidValueIndex] = useState(true);
  const [dateRanges, setDateRanges] = useState('');

  useEffect(() => {
    axios.get(`${config.api.protocol}://${config.api.host}/dvc-calc-api/pointBlockGroup`).then(resp => {
      setPointBlockGroups(resp.data);
    });
  }, []);

  const handlePointBlockGroupChange = (event) => {
    setSelectedPointBlockGroupId(event.target.value);
  }

  const handleValueIndexChange = (event) => {
    if (event.target.value === undefined || !event.target.value.match(/^[0-9]*$/)) {
      setValidValueIndex(false);
    } else {
      setValidValueIndex(true);
    }
    setValueIndex(event.target.value);
  }

  const handleDateRangeFieldChange = (fieldUpdated, idUpdated, newValue) => {
    setDateRanges(current =>
      current.map(dateRange => {
        if (dateRange && dateRange.date_range_id === idUpdated) {
          return { ...dateRange, [fieldUpdated]: newValue };
        }
        return dateRange;
      }),
    );
  }

  const addRow = () => {
    setDateRanges(current => [...current, createEmptyDateRange()]);
  }

  const createEmptyDateRange = () => {
    return {
      date_range_id: (dateRanges.length + 1) * -1,
      start_date: new Date(),
      end_date: new Date(),
    }
  }

  const savePointBlock = () => {
    axios.post(`${config.api.protocol}://${config.api.host}/dvc-calc-api/pointBlock`, { pointBlockGroupId: selectedPointBlockGroupId, valueIndex: valueIndex, dateRanges: formatDateRangeForSave(dateRanges) }).then(resp => {
      alert("Saved Successfully");
    });
  }

  const formatDateRangeForSave = function (originalDateRanges) {
    return originalDateRanges.map(dateRange => {
      if (dateRange.start_date) {
        let startDateStr = '';
        let endDateStr = '';
        if (typeof dateRange.start_date === 'string') {
          let startDateFullStr = dateRange.start_date;
          startDateStr = startDateFullStr.split('T')[0];
          let endDateFullStr = dateRange.end_date;
          endDateStr = endDateFullStr.split('T')[0];

        } else {
          let startDateYear = dateRange.start_date.getFullYear();
          let startDateMonth = dateRange.start_date.getMonth() + 1;
          let startDateDay = dateRange.start_date.getDate();
          let endDateYear = dateRange.end_date.getFullYear();
          let endDateMonth = dateRange.end_date.getMonth() + 1;
          let endDateDay = dateRange.end_date.getDate();

          startDateStr = `${startDateYear}-${startDateMonth}-${startDateDay}`;
          endDateStr = `${endDateYear}-${endDateMonth}-${endDateDay}`;
        }

        return { ...dateRange, start_date: startDateStr, end_date: endDateStr };
      } else {
        return dateRange;
      }
    });
  };

  return (
    <div className="ImportPoints">
      <Stack spacing={3}>
        <Typography variant='h3'>Import Point Block</Typography>
        <FormControl fullWidth>
          <InputLabel id="point-block-group-select-label">Point Block Group</InputLabel>
          <Select
            labelId="point-block-group-select-label"
            id="point-block-group-select"
            value={selectedPointBlockGroupId}
            label="Point Block Group"
            onChange={handlePointBlockGroupChange}>
            {pointBlockGroups.map(pointBlockGroup => <MenuItem value={pointBlockGroup.point_block_group_id} key={pointBlockGroup.point_block_group_id}>{pointBlockGroup.point_block_group_name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            error={!validValueIndex}
            helperText={validValueIndex ? "" : "Please Enter a number only."}
            label="Value Index"
            id="valueIndexInput"
            variant="outlined"
            onChange={handleValueIndexChange}
            value={valueIndex} />
        </FormControl>
        {
          dateRanges.length > 0 ? <TableContainer >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dateRanges.map((dateRange) => (
                  <TableRow
                    key={dateRange.date_range_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            label="Start Date"
                            inputFormat="MM/dd/yyyy"
                            value={dateRange.start_date}
                            onChange={(event) => handleDateRangeFieldChange("start_date", dateRange.date_range_id, event)}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            label="End Date"
                            inputFormat="MM/dd/yyyy"
                            value={dateRange.end_date}
                            onChange={(event) => handleDateRangeFieldChange("end_date", dateRange.date_range_id, event)}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> : ""
        }
      </Stack>
      <Button variant='contained'
        sx={{
          width: '30%',
          margin: 'auto',
          marginTop: '2%',
        }}
        onClick={addRow}>
        Add Date Range
      </Button>
      <Button variant='contained'
        sx={{
          width: '30%',
          margin: 'auto',
          marginTop: '2%',
        }}
        onClick={savePointBlock}>
        Save
      </Button>
    </div>
  );
}

export default ImportPointBlockComponent;