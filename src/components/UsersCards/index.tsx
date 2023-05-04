import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Box } from "@mui/material";
import { loggedUsers } from "../../Redux/Store";
import { useSelector } from "react-redux";



interface User {
  "@id": string;
  "@type": string;
  id: number;
  email: string;
  nickname: string;
}

interface UsersProps {
  users: User[] | null;
}



const UsersCard = ({ users }: UsersProps) => {
  const navigate = useNavigate();
  const usersLogged = useSelector(loggedUsers);

  const handleBadge = (email: string) => {
    console.log("stp", usersLogged)
    if (usersLogged.includes(email)) {
      return (
        <Box sx={{backgroundColor: "limegreen", height: "20px", width: "20px", borderRadius: "20px", marginLeft: "10px"}}></Box>
      )
    }
  }

  const mapUsers = (users: any) => {
    return users?.map((user: any, i: any) => (

      <Grid item xs={4} key={i}>
        <Paper
          key={user.id}
          style={{ margin: "16px", cursor: "pointer" }}
          onClick={() => navigate(`/users/${user.id}`)}
        >
          <CardContent>
            <Typography variant="h5" component="h2" sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              {user.nickname} {handleBadge(user.email)}
            </Typography>
            <Typography color="textSecondary">{user.email}</Typography>
          </CardContent>
        </Paper>
        </Grid>
    
    ));
  };

  return (
    <>
      <Grid container spacing={2}>
        {mapUsers(users)}
        {/* <Grid item xs={8}>
          <Paper>xs=8</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>xs=4</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>xs=4</Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper>xs=8</Paper>
        </Grid> */}
      </Grid>
    </>
  );
};

export default UsersCard;
