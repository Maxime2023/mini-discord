
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IUser } from "../../types";
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import GroupsTable from '../../GroupsTable';
import { useSelector } from 'react-redux';
import { userOwnedGroups } from '../../../Redux/Store';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Profile() {
  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);
  const ownedGroups = useSelector(userOwnedGroups)

  useEffect(() => {
    setIsLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    axios.get(`${apiUrl}/users/1/info`, config)
    .then((res) => {
      setUser(res.data)
      console.log(res.data)
      setIsLoading(false)
    })
    .catch((error) => console.log(error.message))
    console.log("dsfsdfsdf", ownedGroups)
  }, [])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress/>
      </Box>
    );
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
       
            <GroupsTable/>
     
        </Grid>
        <Grid item xs={4}>
          <Item>
          <Box>
          Id : {user?.id}
      </Box>
      <Box>
        Email : {user?.email}
      </Box>
      <Box>
        Nickname : {user?.nickname}
      </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}