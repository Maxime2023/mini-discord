import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import BasicPagination from "../../pages/BasicPagination";
import { loggedUsers } from "../../Redux/Store";
import { useSelector } from "react-redux";

const DisplayUsersInGroup = ({ users, totalPage, handlePageUsers }: any) => {
  const usersLogged = useSelector(loggedUsers);
  const handleBadge = (email: string) => {
    if (usersLogged.some((item: any) => item.user === email)) {
      return (
        <Box
          sx={{
            backgroundColor: "limegreen",
            height: "20px",
            width: "20px",
            borderRadius: "20px",
            marginLeft: "10px",
          }}
        ></Box>
      );
    }
  };
  return (
    <Box sx={{ padding: 2 }}>
      Liste des utilisateurs du groupe:
      {users.length === 0 && (
        <Box sx={{ marginTop: 2 }}>
          Il n'y a aucun utilisateurs dans le groupe.
        </Box>
      )}
      {users.map((user: any, i: any) => (
        <Paper key={i} style={{ padding: 10, margin: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>{user.email}{handleBadge(user.email)}</Paper>
      ))}
      {totalPage > 0 && (
        <BasicPagination
          page={handlePageUsers}
          numberPage={Math.ceil(totalPage / 30)}
        />
      )}
    </Box>
  );
};

export default DisplayUsersInGroup;
