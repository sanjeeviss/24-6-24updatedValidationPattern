import React from 'react'
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Grid, Button } from '@mui/material';
import generatePDF from 'react-to-pdf';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { REPORTS, TIMECARD } from '../../serverconfiguration/controllers';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { postRequest,getRequest } from '../../serverconfiguration/requestcomp';
function Mrgabs() {
    const [timecard,setTimecard]=useState([]);
    useEffect(()=>{

      async function getData(){
      return await postRequest(ServerConfig.url,REPORTS,{
         "query": "select t.emp_code ,t.dates,t.emp_name,t.break_in,t.break_out,t.late_in,t.intime,t.outtime,t.early_out,t.late_out,t.ot_hrs,t.shift_code,t.leave_code,datepart(hour,t.intime) as intime ,(select datepart(hour,start_time) from shift_details where shift_code=t.shift_code) as start_time,(datepart(hour,t.outtime)-datepart(hour,t.intime)+datepart(hour,t.break_in)-datepart(hour,t.break_out)) as t_whrs  from time_card t"})
      
      
      }
      getData().then((e)=>setTimecard(e.data))
      }, [])
      
      console.log(timecard)
         
  return (
   
<div style={{ textAlign: 'center', margin: '20px' }}>
<Grid>
    <Grid >
<Typography variant="h5" gutterBottom >
Worked Hours Details For the Period of 01/01/2010 to 31/01/2010
</Typography>
<Typography style={{ textAlign:'right',paddingRight:'100px'}}>
    date:12/08/2024

</Typography>
</Grid>


<Grid item xs={12}>
<TableContainer component={Paper} style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '1900px' }}>
            <Table>
              <TableBody sx={{borderBottom:'4px solid black'}}>

                
<TableRow sx={{ borderBottom: '4px solid black' }}>
<TableRow sx={{fontSize:'20px'}}>
                  <TableCell sx={{borderBottom:'4px solid black',   padding: '5px' ,}}>S.No</TableCell>
                  <TableCell sx={{ borderBottom:'4px solid black', padding: '5px' }}>Date</TableCell>
                  <TableCell sx={{ borderBottom:'4px solid black',  padding: '5px' }}>Shift</TableCell>
                  <TableCell sx={{borderBottom:'4px solid black',   padding: '5px' }}>In Time</TableCell>
                  <TableCell sx={{borderBottom:'4px solid black', padding: '5px' }}>Out Time</TableCell>
                  <TableCell sx={{  borderBottom:'4px solid black', padding: '5px' }}>Break in </TableCell>
                  <TableCell sx={{borderBottom:'4px solid black', padding: '5px' }}>Break out</TableCell>
                  <TableCell sx={{ borderBottom:'4px solid black', padding: '5px' }}>Early In</TableCell>
                  <TableCell sx={{ borderBottom:'4px solid black',  padding: '5px' }}>Late In</TableCell>
                  <TableCell sx={{ borderBottom:'4px solid black',  padding: '5px' }}>Late out</TableCell>
                  <TableCell sx={{borderBottom:'4px solid black',  padding: '5px' }}>Early Out</TableCell>
                  <TableCell sx={{ borderBottom:'4px solid black',  padding: '5px' }}>T Whrs</TableCell>
                  <TableCell sx={{ borderBottom:'4px solid black',  padding: '5px' }}>T OtHrs</TableCell>
                  <TableCell sx={{  borderBottom:'4px solid black', padding: '5px' }}>Leave name</TableCell>


</TableRow>
                        {timecard.map((entry, index) => (
                           <React.Fragment key={index}>
                              <TableRow sx={{ borderBottom: '3px solid black' }}>
                                 <TableCell>{entry.empCode}</TableCell>
                                 <TableCell>{entry.empName}</TableCell>
                                 {/* Add more cells for other details if needed */}
                              </TableRow>
                              {/* Other details for the employee */}
                              <TableRow sx={{ borderBottom: '3px dotted black' }}>
                              <TableCell>{index + 1}</TableCell>
                                 <TableCell>{entry.dates}</TableCell>
                                 <TableCell>{entry.shift_code}</TableCell>
                                 <TableCell>{entry.intime}</TableCell>
                                 <TableCell>{JSON.stringify(entry.outtime).replace(/"/g,'')}</TableCell>
                                 <TableCell>{entry.break_in}</TableCell>
                                 <TableCell>{entry.break_out}</TableCell>
                                 <TableCell>{JSON.stringify(entry.start_time).replace(/"/g,'')}</TableCell>
                                 <TableCell>{JSON.stringify(entry.late_in).replace(/"/g,'')}</TableCell>
                                 <TableCell>{JSON.stringify(entry.late_out).replace(/"/g,'')}</TableCell>
                                 <TableCell>{JSON.stringify(entry.early_out).replace(/"/g,'')}</TableCell>
                                 <TableCell>{JSON.stringify(entry.t_whrs).replace(/"/g,'')}</TableCell>
                                 <TableCell>{JSON.stringify(entry.ot_hrs).replace(/"/g,'')}</TableCell>
                                 <TableCell>{JSON.stringify(entry.leave_code).replace(/"/g,'')}</TableCell> 
                                 

                                 {/* Add more cells for other details if needed */}
                              </TableRow>
                           </React.Fragment>
                        ))}
                     </TableRow>


                
              </TableBody>
            </Table>
          </TableContainer>
          <br></br>
</Grid>


         
</Grid>
</div>
  )
}



export default Mrgabs;