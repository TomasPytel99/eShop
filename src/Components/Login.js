
import SignIn from "./SignIn";
import UserInfo from "./UserInfo";

const Login = () => {
    
    return (
        <>
            {(localStorage.getItem('loggedIn')) ? (
                <UserInfo/>
            ):(
                <SignIn/>
            )}
        </>
    );
}
 
export default Login;