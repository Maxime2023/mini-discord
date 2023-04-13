
import SignInSide from '../pages/SignIn';


const MiddleWare = (component: any) => {
    if (!localStorage.getItem("token")) {
        return <SignInSide/>
    }
    return component
}

export default MiddleWare;
