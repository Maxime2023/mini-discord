import express from "express";
import http from "http";
import { Server } from "socket.io";
import index from "./routes/index.js";
import axios from "axios";

const port = process.env.PORT || 4001;

const app = express();
app.use(index);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methodes: ["GET", "POST"],
  },
});

let usersLogged = [];

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("user login", (user) => {
    const { username } = user;
    if (!usersLogged.some((item) => item.user === username)) {
      usersLogged.push({ user: username, socketId: socket.id });
    }
    io.emit("newLogin", usersLogged);
    console.log("usersLogged", usersLogged);
  });

  socket.on("logout", (username) => {
    usersLogged = usersLogged.filter((item) => item.user !== username);
    io.emit("newLogin", usersLogged);
    console.log("usersLogged", usersLogged);
  });

  socket.on("new message", ({ threadId, content, owner }) => {
    console.log(`New message in thread ${threadId}: ${content} ${owner}`);
    io.emit("new message", { threadId, content, owner });
  });

  socket.on("new thread", ({ title, content, relatedGroup, token}) => {
    // console.log(`New thread created  ${title}: ${content} ${relatedGroup} ${token}`);
    const body = {
      title: title,
      content: content,
      relatedGroup: relatedGroup,
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post(`https://ynov-workplace.osc-fr1.scalingo.io/api/threads`, body, config)
    .then((res) => {
      console.log(res.data)
      io.emit("new thread", res.data);
    });
    // io.emit("new thread", { title, content,  relatedGroup});
  });

  socket.on("new group", ({ name, description, token}) => {
    // console.log(`New thread created  ${title}: ${content} ${relatedGroup} ${token}`);
    const body = {
      name: name,
      description: description,
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post(`https://ynov-workplace.osc-fr1.scalingo.io/api/groups`, body, config)
    .then((res) => {
      console.log(res.data)
      io.emit("new group", res.data);
    });
    // io.emit("new thread", { title, content,  relatedGroup});
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    usersLogged = usersLogged.filter((item) => item.socketId !== socket.id);
    io.emit("newLogin", usersLogged);
    console.log("usersLogged", usersLogged);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
