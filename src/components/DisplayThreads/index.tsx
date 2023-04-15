import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate, useParams } from "react-router-dom";
import MediaControlCard from "../MediaControlCard";
import Container from "@mui/material/Container";

export default function DisplayThreads({ threads, onChange }: any) {
  let { id } = useParams();
  const navigate = useNavigate();
  const displayThread = (thread: any, i: number) => {
    console.log(thread);
    return (
      <Grid
        onClick={() =>
          navigate(`/groups/${id}${thread["@id"].replace("api/", "")}`)
        }
        item
        xs={4}
      >
        <MediaControlCard thread={thread} onChange={onChange} />
      </Grid>
    );
  };

  if (threads.length === 0) {
    return (
      <Container maxWidth="xs" style={{ marginTop: 20 }}>
        Il n'y a aucun Thread à afficher
      </Container>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      <Grid container spacing={2}>
        {threads.map((thread: any, i: number) => displayThread(thread, i))}
      </Grid>
    </Box>
  );
}
