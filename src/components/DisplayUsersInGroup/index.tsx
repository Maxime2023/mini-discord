import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import BasicPagination from "../pages/BasicPagination";

const DisplayUsersInGroup = ({ users, totalPage, handlePageUsers }: any) => {
  return (
    <Box sx={{ padding: 2 }}>
      Liste des utilisateurs du groupe:
      {users.length === 0 && <Box sx={{marginTop: 2}}>Il n'y a aucun utilisateurs dans le groupe.</Box>}
      {users.map((user: any) => (
        <Paper style={{ padding: 2, margin: 2 }}>{user.nickname}</Paper>
      ))}
      {totalPage > 0 && <BasicPagination page={handlePageUsers} numberPage={Math.ceil(totalPage / 30)} />}
    </Box>
  );
};

export default DisplayUsersInGroup;
