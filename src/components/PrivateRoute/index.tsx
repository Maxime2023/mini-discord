import { useNavigate } from "react-router-dom";
import SignInSide from "../../pages/SignIn";

const PrivateRoute = ({ children }: any) => {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    navigate("/signIn");
    return <SignInSide />;
  }

  return children;
};

export default PrivateRoute;
