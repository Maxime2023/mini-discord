import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import DisplayThreads from '../../DisplayThreads';
import { useParams } from 'react-router-dom';

const Group = () => {
  const [threads, setThreads] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const {id} =useParams()

  useEffect(() => {
    setLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios.get(`${apiUrl}/threads`,  config).then((res) => {
      setLoading(false)
      setThreads(res.data["hydra:member"].filter((x: any) => x.relatedGroup.replace("/api/groups/", "") === id))
    });
  }, [id])

  const handleChange = (childState: any) => {
    console.log("before => ", threads)
    console.log(childState)
    console.log("after => ", threads.filter(x => x["@id"] !== childState))
    setThreads(threads.filter(x => x["@id"] !== childState));
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress/>
      </Box>
    );
  }

  return (
      <DisplayThreads threads={threads} onChange={handleChange} />
  );
};

export default Group;
