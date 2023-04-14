import { useNavigate } from 'react-router-dom';
import SignInSide from '../pages/SignIn';

const PrivateRoute = ({ children }: any) => {
  console.log("children", children)
  const navigate = useNavigate()
  if (!localStorage.getItem("token")) {
    console.log("laaa")
    navigate("/signIn")
    return <SignInSide/>
  }

  return children;
};

export default PrivateRoute