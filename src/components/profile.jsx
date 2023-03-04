import { useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";

const COHORT_NAME = '2301-FTB-MT-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`


const Profile = (props) => {
    const navigate = useNavigate();
    const [postTitle, setPostTitle] = useState("");
    const [postDesc, setPostDesc] = useState("");
    const [postPrice, setPostPrice] = useState("");
    const [postDeliver, setPostDeliver] = useState(false);
    const [myProfile, setMyProfile] = useState({});
    const myProfilePosts = myProfile["posts"];
    const myJWT = localStorage.getItem("token");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true)
            console.log(localStorage.getItem("token"));
        } else {
            props.setIsLoggedIn(false)
            console.log("No token exists!");
        }
    },[])

// MAKE A POST---
    const makePost = async (e) => {
        e.preventDefault(); 
        try {
          const response = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${myJWT}`},
            body: JSON.stringify({
                post: {
                    title: postTitle,
                    description: postDesc,
                    price: postPrice,
                    willDeliver: postDeliver
                }
            })
          });
          const translatedData = await response.json();
          console.log(translatedData);

          if(translatedData.success) {
            props.setPostsProps([...props.postsProps, translatedData.data.post])
            navigate("/posts")
          } else {
            alert("New Post Failed")
          }

        } catch (err) {
          console.error(err);
        }
      }
// -----
// DISPLAY MY POSTS-----
    const myData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/users/me`, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${myJWT}`
                },
            });
            const myDataResult = await response.json();
            // console.log(myDataResult);
            setMyProfile(myDataResult.data)
            // console.log(myDataResult.success);
            return myProfile
        } catch (e) {
            console.error(e);
        }
    }
   
    // console.log(myProfilePosts);

    useEffect(() => {
        myData()
    },[]);  
//  -----

    return (
        <section>
            <div>
                <p>Posts by {myProfile.username}</p>

                {/* <div>{
                    myProfilePosts.map((singlePostElement, i) => {
                    return (
                        <div key={i} className='psts'> 
                            <Link to={`/posts/${singlePostElement._id}`} className='link'>{singlePostElement.title}</Link>
                            <p className='desc'>Description: {singlePostElement.description}</p>
                            <br/>                  
                        </div>
                    )
                    })
                }</div> */}

            </div>


            <br/>
            <br/>


            <div>Create a new post here.
                <form onSubmit={makePost}>
                    <input 
                    type="text" 
                    placeholder="Post Title"
                    value={postTitle}
                    onChange={(event) => setPostTitle(event.target.value)}
                    />
                    <textarea
                    type="text" 
                    placeholder="Item Description"
                    rows="3"
                    cols="75"
                    value={postDesc}
                    onChange={(event) => setPostDesc(event.target.value)}
                    />
                    <input 
                    type="string" 
                    placeholder="Item Price"
                    value={postPrice}
                    onChange={(event) => setPostPrice(event.target.value)}
                    className="makePostInput"
                    />
                    <input 
                    type="checkbox" 
                    placeholder="Will Deliver"
                    value={postDeliver}
                    onChange={() => setPostDeliver(!postDeliver)}
                    />
                    <button type="submit"> Submit New Post </button>    
                </form>
            </div>
        </section>
    )
}

export default Profile;