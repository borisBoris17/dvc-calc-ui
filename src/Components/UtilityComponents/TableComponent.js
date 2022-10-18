import { React, useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Snackbar } from '@mui/material'
import FormControl from '@mui/material/FormControl';

function TableComponent(props) {

  return (
    <div className="TableComponent">
      <TableContainer >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {props.headers.map((header) => (<TableCell>{header.name}</TableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow
                key={row[props.rowId]}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {props.headers.map((header) =>
                  <TableCell component="th" scope="row">
                    <FormControl fullWidth>
                      {row[header.fieldName]}
                    </FormControl>
                  </TableCell>
                )}
              </TableRow>))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableComponent;