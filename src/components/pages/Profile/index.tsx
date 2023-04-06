import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IUser } from "../../types";
import CircularProgress from '@mui/material/CircularProgress';

const Profile = () => {
  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    axios.get(`${apiUrl}/users/1/info`, config)
    .then((res) => {
      setUser(res.data)
      setIsLoading(false)
    })
    .catch((error) => console.log(error.message))
  }, [])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress/>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <Box>
          Id : {user?.id}
      </Box>
      <Box>
          Email : {user?.email}
        </Box>
        <Box>
          Nickname : {user?.nickname}
        </Box>
    </Box>
  );
};

export default Profile;
