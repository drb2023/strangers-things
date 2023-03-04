
import { useState } from "react"; 
import { useNavigate } from "react-router-dom"

const COHORT_NAME = '2301-FTB-MT-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

const LogIn = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate() 

    async function sendLogInReq(e) {
        e.preventDefault(); 
        try {
            const response = await fetch(`${BASE_URL}/users/login`, {
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
                        username: username,
                        password: password
                    }
                })
            })

            const translatedData = await response.json(); 
            // console.log(translatedData)

            if (!translatedData.success) {
                alert("Log In Failed. Please try again!")
            } else {
                const myJWT = translatedData.data.token;

                localStorage.setItem("token", myJWT)
                navigate("/profile")
            }
        } catch (error) {
            console.log(error); 
        }
    }

    return (
        <div>
            <h3>Log In Here</h3>

            <form onSubmit={sendLogInReq}>
                <input 
                    type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Password" 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}

export default LogIn; 
