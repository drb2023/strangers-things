import { useState } from "react"; 
import { useNavigate } from "react-router-dom"

const Register = () => {

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState(""); 
    const navigate = useNavigate() 

    async function sendRegisterNewAccountReq(e) {
        e.preventDefault(); 
        try {
            console.log("New Username is: " + newUsername)
            console.log("New password is: " + newPassword)

            if (newPassword.length < 3) {
                alert("Password is too short. Must be 3+ characters")
                return;
            } else if (newUsername.length < 3) {
                alert("Username is too short. Must be 3+ characters");
                return; 
            }

            const response = await fetch("https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // CORS-ERROR-FIX:
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
                },
                body: JSON.stringify({
                    user: {
                        username: newUsername,
                        password: newPassword
                    }
                })
            })
            const translatedData = await response.json(); 
            if (!translatedData.success) {
                alert("Account was not successfully created. Please try again!")
            } else {
                const myJWT = translatedData.data.token;
                localStorage.setItem("token", myJWT)
                navigate("/")
            }
        } catch (error) {
            console.log(error); 
        }
    }

    return (
        <div className="login">
            <h3>Sign Up For A New Account Here!</h3>

            <form onSubmit={sendRegisterNewAccountReq}>
                <input 
                    type="text" 
                    placeholder="New Username"
                    value={newUsername}
                    onChange={(event) => setNewUsername(event.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="New Password" 
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                />
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}

export default Register; 
