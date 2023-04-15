import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const DisplayUsersInGroup = ({ users }: any) => {
  console.log(users);
  return (
    <Box sx={{ padding: 2 }}>
      Liste des utilisateurs du groupe:
      {users.map((user: any) => (
        <Paper style={{ padding: 2, margin: 2 }}>{user.nickname}</Paper>
      ))}
    </Box>
  );
};

export default DisplayUsersInGroup;
