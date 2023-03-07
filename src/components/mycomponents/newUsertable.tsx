import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Divider, Typography } from '@mui/material';
import { useAppSelector } from '../../shared/utils/redux/selectors/hooks';



export default function NewUserTable() {
  const fromdate = useAppSelector((state) => state.NewUser.fromDate);
  const todate = useAppSelector((state) => state.NewUser.toDate);
  const companyinfo = useAppSelector((state) => state.NewUser.newUsersdata);
  let enrollment: number = 0;
  companyinfo.map((obj) => {
    enrollment = enrollment + obj.frequency;

  })
  var from = fromdate.split('/');

  var from_final: Date = new Date(Number(from[2]), Number(from[0]) - 1, Number(from[1]));
  var to = todate.split('/');

  var to_final: Date = new Date(Number(to[2]), Number(to[0]) - 1, Number(to[1]));
  const diffTime: number = Math.abs(to_final.getTime() - from_final.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays)
  return (
    <div className='newUserTable_details' >
      <Typography className='newUsertable_container_title' ><b>New Users Info</b></Typography>
      <TableContainer component={Paper} className="newUsertable_container"  >
        <Table aria-label="customized table">

          <TableBody>
            <TableRow

            >
              <TableCell >
                From Date
              </TableCell>
              <TableCell align="left">{from_final.toDateString()}</TableCell>

            </TableRow>
            <TableRow>
              <TableCell >
                To Date
              </TableCell>
              <TableCell align="left">{to_final.toDateString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell >
                No. Of Days
              </TableCell>
              <TableCell align="left">{diffDays}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell >
                Enrollments
              </TableCell>
              <TableCell align="left">{enrollment}</TableCell>
            </TableRow>


          </TableBody>
        </Table>
      </TableContainer></div>
  );
}
