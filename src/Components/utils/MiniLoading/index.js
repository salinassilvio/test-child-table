import React from 'react'
import "./miniLoading.css"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const MiniLoading = ()=> {
  return (
    <>
      <Box className="mini-loading-box" sx={{"& .MuiCircularProgress-svg":{color: "#003082"}}}>
        <CircularProgress />
      </Box>
    </>
  )
}

export default MiniLoading