import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';

const Group = () => {

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios.get(`${apiUrl}/threads`,  config).then((res) => {
      console.log(res.data)
    });
  })
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography>
        Group
      </Typography>
    </Box>
  );
};

export default Group;
