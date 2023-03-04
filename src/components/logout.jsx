import { useEffect} from 'react';
import { Link } from "react-router-dom";

const Logout = (props) => {

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true)
            console.log(localStorage.getItem("token"));
            // fetchMyData();
        } else {
            props.setIsLoggedIn(false)
            console.log("No token exists!");
        }
    },[])
    return (
        <div>Logout Successful
        <h3>Login / register above or <Link to="/posts">continue as a guest</Link> to view listings only.</h3>
        </div>
    )
}

export default Logout;