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

function PointInsertTableComponent(props) {
  const [viewTypes, setViewTypes] = useState([]);



  useEffect(() => {
    if (props.roomType !== undefined && props.roomType.room_type_id !== undefined) {
      axios.get(`${config.api.protocol}://${config.api.host}/dvc-calc-api/viewTypes/${props.roomType.room_type_id}`).then(resp => {
        setViewTypes(resp.data);
      });
    }
  }, [props.roomsType]);

  const isValidNumericValue = (value) => {
    return value === undefined || value.match(/^[0-9]*$/);
  }

  return <div>
    {
      <TableContainer >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell align="center" colSpan={viewTypes.length}>{props.roomType.name}</TableCell>
            </TableRow>
            <TableRow>
              {viewTypes.map((viewType) => (
                <TableCell align="center" >{viewType.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              // key={viewType.viewTypeId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {viewTypes.map((viewType) => (
                <TableCell component="th" scope="row">
                  <Stack spacing={3}>
                    <FormControl fullWidth>
                      <TextField
                        error={!isValidNumericValue(viewType.weekdayRate)}
                        helperText={isValidNumericValue(viewType.weekdayRate) ? "" : "Please Enter a number only."}
                        label="Weekday Rate"
                        id={"weekdayRate" + viewType.viewTypeId}
                        variant="outlined"
                        onChange={event => props.handleWeekdayRateChange(event, viewType.view_type_id, props.pointBlockId)}
                        value={viewType.weekdayRate} />
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        error={!isValidNumericValue(viewType.weekendRate)}
                        helperText={isValidNumericValue(viewType.weekendRate) ? "" : "Please Enter a number only."}
                        label="Weekend Rate"
                        id={"weekendRate" + viewType.viewTypeId}
                        variant="outlined"
                        onChange={event => props.handleWeekendRateChange(event, viewType.view_type_id, props.pointBlockId)}
                        value={viewType.weekendRate} />
                    </FormControl>
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    }
  </div>
}

export default PointInsertTableComponent;