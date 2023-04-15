import axios from "axios";
import { useEffect, useState } from "react";
import UsersCard from "../../UsersCards";
import { useDispatch, useSelector } from "react-redux";
import {
  usersStore,
  changeUsersState,
  userSubscribedGroups,
} from "../../../Redux/Store";
import BasicPagination from "../BasicPagination";
import DisplayModal from "../../DisplayModal";

type User = {
  "@id": string;
  "@type": string;
  id: number;
  email: string;
  nickname: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const subscribedGroup = useSelector(userSubscribedGroups);

  const handlePage = (page: number) => {
    setPage(page);
  };

  // const getUsers = () => {
  //   const apiUrl = process.env.REACT_APP_API_URL;
  //   axios
  //     .get(`${apiUrl}/users?page=${page}`)
  //     .then((res) => {
  //       window.scrollTo({
  //         top: 0,
  //         behavior: "smooth",
  //       });
  //       setUsers(res.data["hydra:member"]);
  //       setTotalPage(Math.ceil(res.data["hydra:totalItems"] / 30));
  //       dispatch(usersStore(changeUsersState));
  //     })
  //     .catch((error) => console.log(error.message));
  // };

  useEffect(() => {
    const getUsers = () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      axios
        .get(`${apiUrl}/users?page=${page}`)
        .then((res) => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setUsers(res.data["hydra:member"]);
          setTotalPage(Math.ceil(res.data["hydra:totalItems"] / 30));
          dispatch(usersStore(changeUsersState));
        })
        .catch((error) => console.log(error.message));
    };
  
    if (subscribedGroup) {
      if (subscribedGroup.length === 0) {
        setModalOpen(true);
      }
    }
    getUsers();
  }, [subscribedGroup, page, dispatch]);
  

  // useEffect(() => {
  //   getUsers();
  // }, [page]);

  return (
    <>
      <UsersCard users={users} />
      <DisplayModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Il semble que vous n'etes dans aucun groupe !"
        body="Rejoindre un groupe"
      />
      <BasicPagination page={handlePage} numberPage={totalPage} />
    </>
  );
};

export default Users;
