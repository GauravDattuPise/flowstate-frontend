import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import "./Table.css"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein, abc, cd) {
  return { name, calories, fat, carbs, protein, abc, cd };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 45,45,45,),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables({user}) {
    // console.log(user)
  return (
    <TableContainer component={Paper} className='tableDesign' >
      <Table sx={{  minWidth : 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Age</StyledTableCell>
            <StyledTableCell align="right">Mobile No</StyledTableCell>
            <StyledTableCell align="right">Score</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
            <StyledTableCell align="right">percentage</StyledTableCell>
            <StyledTableCell align="right">HRV</StyledTableCell>
            <StyledTableCell align="right">calculated base focus</StyledTableCell>
            <StyledTableCell align="right">New HRV</StyledTableCell>
            <StyledTableCell align="right">calculated Activity Flow State</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((user) => (
            <StyledTableRow key={user.name}>
              <StyledTableCell component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <StyledTableCell align="right">{user.age}</StyledTableCell>
              <StyledTableCell align="right">{user.mobile}</StyledTableCell>
              <StyledTableCell align="right">{user.score}</StyledTableCell>
              <StyledTableCell align="right">{user.total}</StyledTableCell>
              <StyledTableCell align="right">{user.hrv}</StyledTableCell>
              <StyledTableCell align="right">{user.percentage}</StyledTableCell>
              <StyledTableCell align="right">{user.calBaseFocus}</StyledTableCell>
              <StyledTableCell align="right">{user.newHrv}</StyledTableCell>
              <StyledTableCell align="right">{user.calActivityFlowState}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}