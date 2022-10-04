import { React, useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
const config = require('../config');

function DateRangesComponent(props) {
  const [dateRanges, setDateRanges] = useState([]);

  useEffect(() => {
    if (props.pointBlock !== undefined && props.pointBlock.point_block_id !== undefined) {
      axios.get(`${config.api.protocol}://${config.api.host}/dvc-calc-api/dateRange/${props.pointBlock.point_block_id}`).then(resp => {
        setDateRanges(resp.data);
      });
    }
  }, [props.pointBlock]);

  const isValidNumericValue = (value) => {
    return value === undefined || value.match(/^[0-9]*$/);
  }

  return <div>
    {
      dateRanges.map(dateRange => (
        <Typography variant='body2'>{dateRange.date_range_desc}</Typography>
      ))}
  </div>
}

export default DateRangesComponent;