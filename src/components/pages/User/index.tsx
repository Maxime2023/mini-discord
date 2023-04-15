import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../../types";
import CircularProgress from "@mui/material/CircularProgress";

const User = () => {
  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);
  let { userId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    axios
      .get(`${apiUrl}/users/${userId}`)
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error.message));
  }, [userId]);

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Box>Id : {userId}</Box>
      <Box>Email : {user?.email}</Box>
      <Box>Nickname : {user?.nickname}</Box>
    </Box>
  );
};

export default User;
