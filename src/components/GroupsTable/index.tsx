import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";

export default function GroupsTable({ onChange, users }: any) {
  const handleInputChange = (row: any) => {
    let body: any = {
      targetUser: row["targetUser"],
      targetGroup: row["targetGroup"],
      status: 0,
    };
    console.log(row);
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const apiUrl = process.env.REACT_APP_API_URL;
    axios
      .post(`${apiUrl}/group_requests/${row.id}/accept`,body, config)
      .then((res) => console.log(res));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {users.length > 0 &&
            users.map((row: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{row["targetUser"]}</TableCell>
                <TableCell
                  align="left"
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={() => handleInputChange(row)}
                >
                  <DoneIcon />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
