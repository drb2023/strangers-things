// NOTES:
// Can't login after browsing posts as unregistered without a hard refresh.
// Async Func myProfileData in /profile caused errors as if it we're too slow to load before page rendered, moved to index & it seems to work now. idk why.

// LIBRARY IMPORTS
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; 
import { useState, useEffect} from 'react';
// COMP IMPORTS
import { Homepage, Register, LogIn, Logout, Posts, SinglePost, Profile} from './components';
// API
const COHORT_NAME = '2301-FTB-MT-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`
// PARENT OF ALL
const App = () => {
    const [posts, setPosts] = useState([]);
    const [myData, setMyData] = useState({})
    const [myProfile, setMyProfile] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
// FETCH
    const fetchData = async () => {
        try {
            const response = await fetch (`${BASE_URL}/posts`);
            const translatedData = await response.json();
            setPosts(translatedData.data.posts)
        }   catch (e) {
            document.body.style.cursor = "wait";
            console.log(e);
        }
    };
    useEffect(() => {
        fetchData()
    },[postMessage]);
// DISPLAY MY POSTS-----
    const myJWT = localStorage.getItem("token");

    const myProfileData = async () => {
        
        try {
            const response = await fetch(`${BASE_URL}/users/me`, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${myJWT}`
                },
            });
            const myDataResult = await response.json();
            setMyProfile(myDataResult.data)
            console.log(myProfile)
            return myProfile
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {     
        myProfileData()
    },[posts])

//RENDER
    return (
        <BrowserRouter>
            <section className='section'>
                <header className='header'>
                    <div className='hdrtitle'>Stranger's Things</div>
                    <p className='hdrdesc'>Buy & Sell Your <s>Junk</s> Stuff!</p>
                    <nav className='nav'>

                        {isLoggedIn ? <button><Link to="/posts">Posts</Link></button> : <button><Link to="/register">Sign Up</Link></button>}
                        {isLoggedIn ? <button><Link to="/profile">Profile</Link></button> : <button><Link to="/login">Sign In</Link></button>}
                        {isLoggedIn ? <button onClick={(() => localStorage.removeItem("token"))}><Link to="/logout">Logout</Link></button> : ''}

                    </nav>
                </header>
                <br/>
                <div>
                    <Routes>
                        <Route path="/" element= {<Homepage 
                            isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} 
                            postsProps={posts} setPostsProps={setPosts}/>}/>

                        <Route path="/posts" element= {<Posts 
                            isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} 
                            postsProps={posts} setPostsProps={setPosts}/>}/>

                        <Route path="/posts/:idNumber" element= {<SinglePost 
                            isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} 
                            postsProps={posts} setPostsProps={setPosts}
                            myData={myData} setMyData={setMyData}
                            myProfile={myProfile} setMyProfile={setMyProfile}
                            />}/>

                        <Route path="/profile" element= {<Profile 
                            isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} 
                            postsProps={posts} setPostsProps={setPosts} 
                            myData={myData} setMyData={setMyData}
                            myProfile={myProfile} setMyProfile={setMyProfile}
                            />}/>

                        <Route path="/register" element= {<Register 
                            isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} 
                            postsProps={posts} setPostsProps={setPosts}/>}/>

                        <Route path="/login" element= {<LogIn 
                            isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} 
                            postsProps={posts} setPostsProps={setPosts}/>}/>

                        <Route path="/logout" element= {<Logout 
                            isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} 
                            postsProps={posts} setPostsProps={setPosts}/>}/>
                    </Routes>
                </div>

                <footer>
                    <div></div>
                </footer>
            </section>
    </BrowserRouter>
    )
}


const appElement = document.getElementById("app");
const root = createRoot(appElement);
root.render(<App />)