import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useNavigate, useParams } from 'react-router-dom';
import MediaControlCard from "../MediaControlCard";
import { useSelector } from "react-redux";
import { usersStore } from "../../Redux/Store";

export const HandleUserName = (user: string) => {
    const allUsers = useSelector(usersStore)
    console.log(allUsers)
 return user
}
