import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

 function Loader() {
  return (
   <div className='h-lvh flex justify-center items-center'>
      <CircularProgress />
      </div>
  );
}

export default Loader