import { React, useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
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
  
  return <div>
    {
      dateRanges.map(dateRange => (
        <Typography variant='body2'>{dateRange.date_range_desc}</Typography>
      ))}
  </div>
}

export default DateRangesComponent;