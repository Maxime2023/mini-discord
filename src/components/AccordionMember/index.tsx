import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import GroupsTable from "../GroupsTable";

export default function AccordionMember(props: any) {
  const { row } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<
    Array<{ targetUser: string; status: string }>
  >([]);

  const handleChange = (row: any) => {
    setUsers(users.filter((user) => user.targetUser !== row.targetUser));
  };

  const getInfos = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    setIsLoading(true);
    axios
      .get(`${apiUrl?.replace("/api", "")}${row}/requests`, config)
      .then((res) => {
        setUsers(res.data["hydra:member"]);
        console.log(res.data["hydra:member"]);
        setIsLoading(false);
      });
  };

  const handleLoading = () => {
    if (isLoading) {
      return (
        <Typography>
          <CircularProgress />
        </Typography>
      );
    }
    return (
      <Typography>
        <p>Mon historique de demandes:</p>
        {users.length === 0 ? (
          "Aucune demande en cours"
        ) : (
          <GroupsTable onChange={handleChange} users={users} />
        )}
      </Typography>
    );
  };

  return (
    <Accordion key={"2"} onChange={() => getInfos()}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{row}</Typography>
      </AccordionSummary>
      <AccordionDetails>{handleLoading()}</AccordionDetails>
    </Accordion>
  );
}
