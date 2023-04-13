import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useNavigate } from "react-router-dom";
import { changeSideBarState } from "../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import GroupIcon from "@mui/icons-material/Group";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {localStorage.getItem('token') ? dispatch(changeSideBarState(true)) : navigate('/signIn')}}
          >
            <QuestionAnswerIcon
              
            />
          </IconButton>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {localStorage.getItem('token') ? navigate("/users"): navigate('/signIn')}}
          >
            <GroupIcon  />
          </IconButton>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {localStorage.getItem('token') ? navigate("/profile") : navigate('/signIn')}} 
          >
            <AccountBoxIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => {localStorage.getItem('token') ? navigate("/users"):  navigate('/signIn')}}
          ></Typography>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/signIn");
              localStorage.clear();
            }}
          >
            {localStorage.getItem("token") ? "Se déconnecter" : "Se connecter"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
