
import { useState, useEffect } from "react";
import SignIn from "./SignIn";
import UserInfo from "./UserInfo";

const Login = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, [isAuthenticated]);
    return (
        <>
            {(isAuthenticated) ? (
                <UserInfo logout={setIsAuthenticated}/>
            ):(
                <SignIn login={setIsAuthenticated}/>
            )}
        </>
    );
}
 
export default Login;