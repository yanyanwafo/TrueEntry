import React from 'react';
import { Button } from '@mui/material';

export default function ViolationItem({ sensor, level, timestamp }) {
  return (
    <li>
      <strong>{sensor}</strong> — {level} dB at {new Date(timestamp).toLocaleString()}
      <Button variant="outlined" style={{marginLeft:'10px'}}>Investigate</Button>
      <Button variant="contained" color="success" style={{marginLeft:'5px'}}>Resolve</Button>
    </li>
  );
}
