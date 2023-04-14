import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useNavigate, useParams } from 'react-router-dom';
import MediaControlCard from "../MediaControlCard";
import Container from "@mui/material/Container";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DisplayThreads({ threads, onChange }: any) {
  let { id } = useParams();
  const navigate = useNavigate();
  const displayThread = (thread: any, i: number) => {
    console.log(thread)
    return (
      <Grid onClick={() => navigate(`/groups/${id}${thread['@id'].replace('api/', '')}`)} item xs={4}>
        <MediaControlCard thread={thread} onChange={onChange} />
      </Grid>
    );
  };

  if (threads.length === 0) {
    return (
      <Container maxWidth='xs' style={{marginTop: 20}}>
        Il n'y a aucun Thread à afficher
      </Container>
    )
  }

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
