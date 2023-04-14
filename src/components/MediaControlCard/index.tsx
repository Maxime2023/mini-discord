import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { HandleUserName } from '../HandleUserName';
import axios from 'axios';


export default function MediaControlCard({thread, onChange}: any) {

  const {owner, title} = thread
  console.log(owner)
  const theme = useTheme();
  
  const deleteThread = (event:any) => {
    event.stopPropagation();
    console.log(thread)
    onChange(thread["@id"]);
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios.delete(`${apiUrl}/threads${thread["@id"].replace("api/threads/", "")}`,  config).then((res) => {
      console.log(res.data)
    });
  }



  return (
    <Card sx={{ display: 'flex', cursor: 'pointer' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Typography component="div" variant="h5">
            {thread["@id"]}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {HandleUserName(owner)}
          </Typography>
          <Button variant='contained' onClick={(e) => deleteThread(e)}>
            Supprimer le thread
          </Button>
        </CardContent>

      </Box>
    </Card>
  );
}
