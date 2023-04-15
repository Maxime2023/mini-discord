import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import DisplayThreads from "../../DisplayThreads";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import DisplayUsersInGroup from "../../DisplayUsersInGroup";
import SearchBar from "../../SearchBar";

const Group = () => {
  const [threads, setThreads] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPageThreads, setTotalPageThreads] = useState(0);
  const [pageThreads, setPageThreads] = useState(1);
  const [search, setSearch] = useState(""); 

  const { id } = useParams();

  const handlePageUsers = (page: number) => {
    setPage(page);
  };

  const handlePageThreads = (page: number) => {
    setPageThreads(page);
  };

  const handleSearch = (search: any) => {
    setSearch(search);
  };

  useEffect(() => {
    console.log("pageThreads", pageThreads)
    setLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios.get(`${apiUrl}/threads?page=${pageThreads}`, config).then((res) => {
      console.log(res.data["hydra:member"])
      setThreads(
        res.data["hydra:member"].filter(
          (x: any) => x.relatedGroup.replace("/api/groups/", "") === id
        )
      );
      setTotalPageThreads(res.data["hydra:totalItems"])
      axios
        .get(`${apiUrl}/groups/${id}/members?page=${page}`, config)
        .then((res) => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });   
          setLoading(false);
          setUsers(res.data["hydra:member"]);
          setTotalPage(res.data["hydra:totalItems"]);
        });
    });
  }, [id, page, pageThreads]);

  useEffect(() => {
    setPageThreads(1)
    console.log("pageThreads", search)
    setLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios.get(`${apiUrl}/search?page=${pageThreads}&title=${search}`, config).then((res) => {
      console.log(res.data["hydra:member"][0].relatedGroup)
      setThreads(
        res.data["hydra:member"].filter(
          (x: any) => x.relatedGroup.replace("/api/groups/", "") === id
        )
      );
      setThreads(res.data["hydra:member"])
      setLoading(false);
      setTotalPageThreads(res.data["hydra:totalItems"])
        })
  }, [search])

  const handleChange = (childState: any) => {
    setThreads(threads.filter((x) => x["@id"] !== childState));
  };

  // if (isLoading) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <SearchBar placeholder="Rechercher un thread" onChange={handleSearch}/>
        <DisplayThreads
          loading={isLoading}
          threads={threads}
          onChange={handleChange}
          totalPageThreads={totalPageThreads}
          handlePageThreads={handlePageThreads}
        />
      </Grid>
      <Grid item xs={3}>
        <DisplayUsersInGroup
          loading={isLoading}
          users={users}
          totalPage={totalPage}
          handlePageUsers={handlePageUsers}
        />
      </Grid>
    </Grid>
  );
};

export default Group;
