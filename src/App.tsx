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
import PrivateRoute from "./components/PrivateRoute";

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
      <Route path="/" element={<SignInSide />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignInSide />} />
      <Route path="/groups/:id" element={<PrivateRoute><Group /></PrivateRoute>} />
      <Route path="/groups/:id/threads" element={<PrivateRoute><CreateThread /></PrivateRoute>} />
      <Route path="/groups/:id/threads/:threadId" element={<PrivateRoute><Thread /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
      <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
      <Route path="/users/:userId" element={<PrivateRoute><User /></PrivateRoute>} />
      <Route path="/create-group" element={<PrivateRoute><CreateGroup /></PrivateRoute>} />
      <Route path="*" element={<NoPage />} />

      </Routes>
    </Router>
  );
}

export default App;
