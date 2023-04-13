import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoPage from "./components/pages/NoPage";
import Menu from "./components/Menu/index";
import User from "./components/pages/User";
import Users from "./components/pages/Users";
import Group from "./components/pages/Group";
import SignInSide from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Profile from "./components/pages/Profile";
import SideBar from "./components/SideBar";
import CreateGroup from "./components/pages/CreateGroup";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Thread from "./components/pages/Thread";
import CreateThread from "./components/pages/CreateThread";
import { useDispatch } from "react-redux";
import {
  changeUserEmail,
  changeUserNickName,
  changeUserId,
  changeOwnedGroups,
  changeSubscribedGroups,
} from "./Redux/Store";
import axios from "axios";
import MiddleWare from "./components/MiddleWare";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("token")) {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/1/info`, config)
        .then((res) => {
          const { email, id, nickname } = res.data;
          dispatch(changeUserEmail(email));
          dispatch(changeUserId(id));
          dispatch(changeUserNickName(nickname));
          axios
          .get(`${process.env.REACT_APP_API_URL}/users/${id}`, config)
          .then((user) => {
            const {ownedGroups, subscribedGroups} = user.data
            dispatch(changeOwnedGroups(ownedGroups));
            dispatch(changeSubscribedGroups(subscribedGroups));
            setLoading(false)
        })
        });
        return;
    }
    setLoading(false);
  }, [])

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      <Menu />
      <SideBar />
      <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/groups/:id" element={<Group />} />
      <Route path="/groups/:id/threads" element={<CreateThread />} />
      <Route path="/groups/:id/threads/:threadId" element={<Thread />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signIn" element={<SignInSide />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:userId" element={<User />} />
      <Route path="/create-group" element={<CreateGroup />} />
      <Route path="*" element={<NoPage />} />

      {/* <Route path="/" element={MiddleWare(<Users />)} />
      <Route path="/signUp" element={MiddleWare(<SignUp />)} />
      <Route path="/groups/:id" element={MiddleWare(<Group />)} />
      <Route path="/groups/:id/threads" element={MiddleWare(<CreateThread />)} />
      <Route path="/groups/:id/threads/:threadId" element={MiddleWare(<Thread />)} />
      <Route path="/profile" element={MiddleWare(<Profile />)} />
      <Route path="/signIn" element={MiddleWare(<SignInSide />)} />
      <Route path="/users" element={MiddleWare(<Users />)} />
      <Route path="/users/:userId" element={MiddleWare(<User />)} />
      <Route path="/create-group" element={MiddleWare(<CreateGroup />)} />
      <Route path="*" element={MiddleWare(<NoPage />)} /> */}
      </Routes>
    </Router>
  );
}

export default App;
