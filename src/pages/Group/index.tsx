import { useEffect, useState } from "react";
import axios from "axios";
import DisplayThreads from "../../components/DisplayThreads";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import DisplayUsersInGroup from "../../components/DisplayUsersInGroup";
import SearchBar from "../../components/SearchBar";
import socketIoClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

const Group = () => {
  const [threads, setThreads] = useState<any[]>([]);
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
    console.log("pageThreads", pageThreads);
    setLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios.get(`${apiUrl}/threads?page=${pageThreads}`, config).then((res) => {
      console.log(res.data["hydra:member"]);
      setThreads(
        res.data["hydra:member"].filter(
          (x: any) => x.relatedGroup.replace("/api/groups/", "") === id
        )
      );
      setTotalPageThreads(res.data["hydra:totalItems"]);
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
    // setPageThreads(1)
    // console.log("pageThreads", search)
    setLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios.get(`${apiUrl}/search?page=1&title=${search}`, config).then((res) => {
      console.log(res.data["hydra:member"]);
      const test = res.data["hydra:member"];
      for (let i in test) {
        console.log(test[i].relatedGroup);
      } // impossible de filtrer car des groupes on un relatedGroup vide
      // setThreads(
      //   res.data["hydra:member"].filter(
      //     (x: any) => x.relatedGroup.replace("/api/groups/", "") === id
      //   )
      // );
      setThreads(res.data["hydra:member"]);
      setLoading(false);
      setTotalPageThreads(res.data["hydra:totalItems"]);
    });
  }, [search]);

  useEffect(() => {
    const socket = socketIoClient(ENDPOINT);
    socket.on("new thread", (data) => {
      console.log(data.relatedGroup, `/api/groups/${id}`);
      if (data.relatedGroup === `/api/groups/${id}`) {
        console.log("new thread");
        setThreads((threads: any[]) => [...threads, data]);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChange = (childState: any) => {
    setThreads(threads.filter((x) => x["@id"] !== childState));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <SearchBar placeholder="Rechercher un thread" onChange={handleSearch} />
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
