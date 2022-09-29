import { React, useState } from "react";
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


const dummyRoomTypes = [{ roomTypeId: 1, roomTypeName: "Deluxe Studio", viewTypes: [{ viewTypeId: 1, viewTypeName: "Standard", weekdayRate: "", weekendRate: "" }, { viewTypeId: 2, viewTypeName: "Preferred", weekdayRate: "", weekendRate: "" }] }, { roomTypeId: 2, roomTypeName: "One Bedroom Villa", viewTypes: [{ viewTypeId: 3, viewTypeName: "Standard", weekdayRate: "", weekendRate: "" }, { viewTypeId: 4, viewTypeName: "Preferred", weekdayRate: "", weekendRate: "" }] }, { roomTypeId: 3, roomTypeName: "Two Bedroom Villa", viewTypes: [{ viewTypeId: 5, viewTypeName: "Standard", weekdayRate: "", weekendRate: "" }, { viewTypeId: 6, viewTypeName: "Preferred", weekdayRate: "", weekendRate: "" }] }];


function PointInsertTableComponent(props) {
  const [roomTypes, setRoomTypes] = useState(dummyRoomTypes);

  const isValidNumericValue = (value) => {
    return value === undefined || value.match(/^[0-9]*$/);
  }

  const handleWeekdayRateChange = (event, roomTypeId, viewTypeId) => {
    setRoomTypes(current =>
      current.map(roomType => {
        if (roomType && roomType.roomTypeId === roomTypeId) {
          const newViewTypes = [];
          roomType.viewTypes.map(viewType => {
            if (viewType && viewType.viewTypeId === viewTypeId) {
              newViewTypes.push({ ...viewType, weekdayRate: event.target.value });
            } else {
              newViewTypes.push({ ...viewType });
            }
          });
          return { ...roomType, viewTypes: newViewTypes }
        }
        return { ...roomType };
      })
    );
  }

  const handleWeekendRateChange = (event, roomTypeId, viewTypeId) => {
    setRoomTypes(current =>
      current.map(roomType => {
        if (roomType && roomType.roomTypeId === roomTypeId) {
          const newViewTypes = [];
          roomType.viewTypes.map(viewType => {
            if (viewType && viewType.viewTypeId === viewTypeId) {
              newViewTypes.push({ ...viewType, weekendRate: event.target.value });
            } else {
              newViewTypes.push({ ...viewType });
            }
          });
          return { ...roomType, viewTypes: newViewTypes }
        }
        return { ...roomType };
      })
    );
  }


  return <div>
    {
      roomTypes.length > 0 ? <TableContainer >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">


          <TableHead>
            <TableRow >
              {roomTypes.map((roomType) => (
                <TableCell align="center" colSpan={roomType.viewTypes.length}>{roomType.roomTypeName}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              {roomTypes.map((roomType) => (<>
                {roomType.viewTypes.map((viewType) => (
                  <TableCell align="center" >{viewType.viewTypeName}</TableCell>
                ))}</>
              ))}
            </TableRow>
          </TableHead>
          <TableBody><TableRow
                // key={viewType.viewTypeId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
            {roomTypes.map((roomType) => (<>
              {roomType.viewTypes.map((viewType) => (<>
                <TableCell component="th" scope="row">
                <Stack spacing={3}>
                  <FormControl fullWidth>
                    <TextField
                      error={!isValidNumericValue(viewType.weekdayRate)}
                      helperText={isValidNumericValue(viewType.weekdayRate) ? "" : "Please Enter a number only."}
                      label="Weekday Rate"
                      id={"weekdayRate" + viewType.viewTypeId}
                      variant="outlined"
                      onChange={event => handleWeekdayRateChange(event, roomType.roomTypeId, viewType.viewTypeId)}
                      value={viewType.weekdayRate} />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      error={!isValidNumericValue(viewType.weekendRate)}
                      helperText={isValidNumericValue(viewType.weekendRate) ? "" : "Please Enter a number only."}
                      label="Weekend Rate"
                      id={"weekendRate" + viewType.viewTypeId}
                      variant="outlined"
                      onChange={event => handleWeekendRateChange(event, roomType.roomTypeId, viewType.viewTypeId)}
                      value={viewType.weekendRate} />
                  </FormControl>
                  </Stack>
                </TableCell>
              </>
              ))}</>
            ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer> : ""
    }
  </div>
}

export default PointInsertTableComponent;