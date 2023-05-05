import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import DisplayNotification from "../../components/DisplayNotification";
import socketIoClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

const theme = createTheme();

export default function CreateGroup() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // const body = {
    //   name: data.get("groupName"),
    //   description: data.get("description"),
    // };
    // const apiUrl = process.env.REACT_APP_API_URL;
    // const config = {
    //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    // };
    // axios.post(`${apiUrl}/groups`, body, config).then((res) => {
    //   setLoading(false);
    //   setOpen(true);
    // });
    const socket = socketIoClient(ENDPOINT);
    socket.emit("new group", {
      name: data.get("groupName"),
      description: data.get("description"),
      token: localStorage.getItem("token"),
    });
    setLoading(false);
    setOpen(true);
    return () => {
      socket.disconnect();
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <DisplayNotification
        message="Le groupe a été correctement créé."
        open={open}
        onClose={() => setOpen(false)}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <GroupAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Créer un groupe
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="groupName"
              label="Nom du groupe"
              name="groupName"
              autoFocus
            />
            <TextField
              multiline
              rows={2}
              maxRows={4}
              margin="normal"
              required
              fullWidth
              name="description"
              label="description"
              type="description"
              id="description"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: 40 }}
            >
              {loading ? (
                <CircularProgress style={{ color: "white" }} size={25} />
              ) : (
                "  Créer le groupe"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
