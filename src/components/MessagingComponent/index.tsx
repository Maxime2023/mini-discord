import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";
import { userId, userNickName } from "../../Redux/Store";
import { useSelector } from "react-redux";

interface IMessage {
  owner: string;
  content: string;
}

interface IChatProps {
  username: string;
}

const MessagingComponent: React.FC<IChatProps> = ({ username }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  let { threadId } = useParams();
  const user: any = useSelector(userId);
  const nickname: any = useSelector(userNickName);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // if (isScrolled) {
    //   return
    // }
    // console.log("la")
    scrollToBottom();
    setIsScrolled(true);
  }, [isScrolled]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    // setInterval(() => {
    axios.get(`${apiUrl}/threads/${threadId}/messages`, config).then((res) => {
      setMessages(res.data["hydra:member"]);
      setIsLoading(false);
    });
    // }, 1000);
  }, [threadId]);

  useEffect(() => {
    setIsLoading(true);
  }, [threadId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      const apiUrl = process.env.REACT_APP_API_URL;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      setMessages([...messages, { owner: username, content: inputValue }]);
      setInputValue("");
      axios.post(
        `${apiUrl}/messages`,
        { content: inputValue, thread: `api/threads/${threadId}` },
        config
      );
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleMessages = (message: any, index: any) => {
    let owner = message.owner.replace("/api/users/", "");
    if (owner === user.toString() || owner === nickname) {
      return (
        <Box
          style={{
            color: "black",
            justifyContent: "right",
            display: "flex",
            flexDirection: "column",
            padding: 5,
          }}
        >
          <Box
            style={{
              textAlign: "right",
              color: "black",
              backgroundColor: "whitesmoke",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Typography key={index}>
              <strong> {message.owner} :</strong>
              <div>{message.content}</div>
            </Typography>
          </Box>
        </Box>
      );
    }
    return (
      <Box
        style={{
          color: "black",
          justifyContent: "right",
          display: "flex",
          flexDirection: "column",
          padding: 5,
        }}
      >
        <Box
          style={{
            textAlign: "left",
            backgroundColor: "#1876d1",
            padding: 10,
            borderRadius: 10,
            color: "white",
          }}
        >
          <Typography key={index}>
            <strong> {message.owner} :</strong>
            <div>{message.content}</div>
          </Typography>
        </Box>
      </Box>
      //   <Typography key={index} style={{color: "#1876d1"}}>
      //   <strong>{message.owner}: </strong>
      //   <div>{message.content}</div>
      // </Typography>
    );
  };

  return (
    <>
      <Container maxWidth="sm">
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
          spacing={2}
        >
          <Stack
            sx={{
              flexGrow: 1,
              overflow: "auto",
              height: "80vh",
            }}
            spacing={1}
          >
            {messages.map((message, index) => handleMessages(message, index))}
            <div ref={messagesEndRef} />
          </Stack>
        </Stack>
      </Container>
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={1}
          direction="row"
          style={{
            position: "fixed",
            bottom: 0,
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            label="Ecrivez votre Message"
            variant="outlined"
            size="small"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button variant="contained" type="submit">
            Envoyer
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default MessagingComponent;
