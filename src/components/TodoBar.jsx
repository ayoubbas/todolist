import React from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import chroma from 'chroma-js';
import { grey } from '@mui/material/colors';

const TodoBar = ({ title, details,id ,handleStatus, isDone,handleClickOpenDialoge,handleEdite}) => {

  // Function to generate a color that complements the website background color
  const generateRandomColor = () => {
    // You can customize this logic based on your color preferences
    const randomColor = chroma.random().alpha(0.3).css();
    return randomColor;
  };
  const backgroundColor = generateRandomColor();

  
  return (
    <Box
    key={id}
      display="flex"
      alignItems="center"
      justifyContent='space-between'
      bgcolor={isDone? "white" :backgroundColor}
      padding="10px"
      margin="10px 0"
      borderRadius="5px"
      border={isDone? "2px solid #":"none"}
    >
      <Box display={'flex'} flexDirection={'column'} overflow={"Hidden"} >
      <Typography variant="h6" style={{ marginBottom: '10px' , }} sx={isDone?{textDecorationLine:"line-through", color:"grey" }:{textDecorationLine:"none"}}>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary" style={{ marginBottom: '10px' }} sx={isDone?{textDecorationLine:"line-through" , color:"gray" }:{textDecorationLine:"none"}}>
        {details}
      </Typography>
      </Box>
      <Box display="flex" gap="10px" alignItems="center">
        <IconButton onClick={()=>{handleEdite(id)}}  id={id} style={{ borderRadius: '50%', backgroundColor: '#3498db' }} sx={isDone?{display:"none"}:null} disabled={isDone}>
          <EditIcon />
        </IconButton>
        <IconButton  id={id} onClick={()=>{handleClickOpenDialoge(id)}} style={{ borderRadius: '50%', backgroundColor: '#e74c3c' }}>
          <DeleteIcon />
        </IconButton>
        <IconButton id={id} onClick={()=>{handleStatus(id)}} style={{ borderRadius: '50%', backgroundColor: '#27ae60' }}>
          <CheckIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TodoBar;
