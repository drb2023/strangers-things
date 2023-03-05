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
    const [refresh, setRefresh] = useState(0);
    // const [myProfile, setMyProfile] = useState({});
    // const myProfilePosts = myProfile["posts"];
    const myJWT = localStorage.getItem("token");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true)
            // console.log(localStorage.getItem("token"));
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
            props.setPostsProps([...props.postsProps, translatedData.data.post]);
            setRefresh(refresh + 1)
            console.log(refresh)
            navigate("/posts")
          } else {
            alert("New Post Failed")
          }

        } catch (err) {
          console.error(err);
        }
      }

// DISPLAY MY POSTS-----
    // const [myProfile, setMyProfile] = useState({});
    // // const myJWT = localStorage.getItem("token");
    // const myProfileData = async (e) => {
    //     e.preventDefault(); 
    //     try {
    //         const response = await fetch(`${BASE_URL}/users/me`, {
    //             headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${myJWT}`
    //             },
    //         });
    //         const myDataResult = await response.json();
    //         setMyProfile(myDataResult.data)
    //         return myProfile
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }
    // useEffect(() => {
    //     myProfileData()
    // },[]);  
//  -----


// -----
// SHOW A POST Pt 2 ---
// props.myProfile["posts"].map((singlePostElement) => {
//     return (
//         {_id}
//     )
// })

// DELETE A POST -----

    // async function deletePost (sPe) {
    //     try {
    //     const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-FT/posts/${sPe}`, {
    //         method: "DELETE",
    //         headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${myJWT}`
    //         }
    //     });
    //     const result = await response.json();
    //     //   console.log(singlePostElement);
    //     console.log(result);
    //     return result
    //     } catch (err) {
    //     console.error(err);
    //     }
    // }
//  -----

    return (
        <section>
            <div>
                <p>Active Posts By Username: {props.myProfile.username}</p>

                <div>{props.myProfile["posts"].map((singlePostElement, i) => {
                    if (singlePostElement.active == true){
                    return (
                        <div key={i} className='psts'>
                                <Link to={`/posts/${singlePostElement._id}`} className='link'>{singlePostElement.title}</Link>
                                <p>{singlePostElement._id}</p>
                                <p className='desc'>Description: {singlePostElement.description}</p>
                                <Link to={`/posts/${singlePostElement._id}`} className='link'>Delete Post</Link>
                                {/* <button>Delete Post</button> */}
                            <br/>                  
                        </div>
                    )
                    }
                    })
                }</div>

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