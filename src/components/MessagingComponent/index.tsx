import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from '@mui/material/Container';
import { CircularProgress } from "@mui/material";

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

  let { threadId } = useParams();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setIsLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios.get(`${apiUrl}/threads/${threadId}/messages`, config).then((res) => {
      setMessages(res.data["hydra:member"]);
      setIsLoading(false);
      console.log(res.data);
    });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      const apiUrl = process.env.REACT_APP_API_URL;
      console.log(`${apiUrl}/me`);
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      setMessages([...messages, { owner: username, content: inputValue }]);
      setInputValue("");
      axios
        .post(
          `${apiUrl}/messages`,
          { content: inputValue, thread: `api/threads/${threadId}` },
          config
        )
        .then((res) => {
          console.log(res.data);
        });
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
          height: "80vh"
        }}
        spacing={1}
      >
        {messages.map((message, index) => (
          <Typography key={index}>
            <strong>{message.owner}: </strong>
            {message.content}
          </Typography>
        ))}
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
         alignItems: "center"
       }}
     >
       <TextField
         label="Message"
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
