import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import DisplayThreads from "../../DisplayThreads";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import DisplayUsersInGroup from "../../DisplayUsersInGroup";

const Group = () => {
  const [threads, setThreads] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios.get(`${apiUrl}/threads`, config).then((res) => {
      setThreads(
        res.data["hydra:member"].filter(
          (x: any) => x.relatedGroup.replace("/api/groups/", "") === id
        )
      );
      axios.get(`${apiUrl}/groups/${id}/members`, config).then((res) => {
        setLoading(false);
        setUsers(res.data["hydra:member"]);
      });
    });
  }, [id]);

  const handleChange = (childState: any) => {
    setThreads(threads.filter((x) => x["@id"] !== childState));
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <DisplayThreads threads={threads} onChange={handleChange} />
      </Grid>
      <Grid item xs={3}>
        <DisplayUsersInGroup users={users} />
      </Grid>
    </Grid>
  );
};

export default Group;
