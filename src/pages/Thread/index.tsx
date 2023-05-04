import MessagingComponent from "../../components/MessagingComponent";
import { useSelector } from "react-redux";
import { userNickName } from "../../Redux/Store";

const Thread = () => {
  const username = useSelector(userNickName);
  return <MessagingComponent username={username} />;
};

export default Thread;
