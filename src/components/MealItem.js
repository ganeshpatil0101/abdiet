import React from 'react';
import {Table, TableBody,TableCell, TableContainer, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const MealItem = ({dietData}) => {
    const rows = [
      {key: 'meal1', label: '06:00',},
      {key: 'meal2', label: '08:00',},
      {key: 'meal3', label: '11:00',},
      {key: 'meal4', label: '01:00',},
      {key: 'meal5', label: '03:00',},
      {key: 'meal6', label: '05:30',},
      {key: 'meal7', label: '08:30',},
      {key: 'meal8', label: '10:00',},
    ]
  ;
    return (
      <>
        <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={`${row.key}-${dietData.id}`}>
                <TableCell component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell align="left">{dietData[row.key]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  
        </>
    )
  }

  export default React.memo(MealItem);
