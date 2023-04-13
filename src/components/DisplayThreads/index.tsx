import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useNavigate, useParams } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DisplayThreads({ threads }: any) {
  let { id } = useParams();
  const navigate = useNavigate();
  const displayThread = (thread: any, i: number) => {
    return (
      <Grid onClick={() => navigate(`/groups/${id}${thread['@id'].replace('api/', '')}`)} item xs={4}>
        <Item>{thread.title}</Item>
      </Grid>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      <Grid container spacing={2}>
        {
            threads.map((thread: any, i: number) => displayThread(thread, i))
        }
      </Grid>
    </Box>
  );
}
