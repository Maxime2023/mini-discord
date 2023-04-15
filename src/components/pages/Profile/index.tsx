import { useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../../types";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import GroupsAccordion from "../../GroupsAccordion";
import Container from "@mui/material/Container";
import ProfileComp from "../../ProfileComp";

export default function Profile() {
  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get(`${apiUrl}/users/1/info`, config)
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error.message));
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Container maxWidth="sm" style={{ paddingTop: 20 }}>
      <ProfileComp
        email={user?.email}
        id={user?.id}
        nickname={user?.nickname}
      />
      <Box sx={{ padding: 2 }}> Mes groupes créés :</Box>
      <GroupsAccordion />
    </Container>
  );
}
