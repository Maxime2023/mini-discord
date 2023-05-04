import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import socketIoClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

const DatePage = () => {
  const [response, setResponse] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const socket = socketIoClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
    socket.on("newLogin", (data) => {
      console.log("username", data);
      setUsername(data);
    });
  }, []);

  return (
    <Box container spacing={2}>
      <Box>{response}</Box>
      <Box>{username}</Box>
    </Box>
  );
};

export default DatePage;
