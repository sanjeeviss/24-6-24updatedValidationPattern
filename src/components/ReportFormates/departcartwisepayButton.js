import React from 'react'
import Paycalc from './Payslip';
import { Grid, Button } from '@mui/material';
import generatePDF from 'react-to-pdf';
import { useRef } from 'react';
import Medical from './Medical';
import Esicslip from './Esicslip';
import D8Reports from'./d8Reports';
import DepartWisePay from './departcatwisePay';

function Deptcatpay() {
    const targetRef = useRef();
    return (
      <div className="App">
        <div ref={targetRef}>
        < DepartWisePay/>
        </div>
        <div>
        <Grid item xs={12} textAlign={'center'}>
          <Button variant='outlined' onClick={ ()=> generatePDF(targetRef, {filename: 'DepartWisePay.pdf'})}>Download Pdf</Button>
          </Grid>
          </div>
     </div>
    );
}

export default Deptcatpay