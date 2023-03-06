import { useState} from 'react';
import { Link } from "react-router-dom";

const COHORT_NAME = '2301-FTB-MT-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

const Profile = (props) => {
    const [postTitle, setPostTitle] = useState("");
    const [postDesc, setPostDesc] = useState("");
    const [postPrice, setPostPrice] = useState("");
    const [postLocation, setPostLocation] = useState("");
    const [postDeliver, setPostDeliver] = useState(false);
    const myJWT = localStorage.getItem("token");

// MAKE A NEW POST---
    const makePost = async (e) => {
        e.preventDefault(); 
        try {
          const response = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${myJWT}`},
              // CORS-ERROR-FIX:
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            body: JSON.stringify({
            post: {
                title: postTitle,
                description: postDesc,
                price: postPrice,
                location: postLocation,
                willDeliver: postDeliver
            }})});
          const translatedData = await response.json();
          console.log(translatedData);
          if(translatedData.success) {
            props.setPostsProps([...props.postsProps, translatedData.data.post]);
            props.myProfile;
            Profile;
          } else {
            alert("New Post Failed")
          }
        } catch (err) {
          console.error(err);
        }
    }

    return (
        <section>
{/* LIST OF USER POSTS */}
            <div>
                <p className='login'>Active Posts By Username: {props.myProfile.username}</p>
                <div>{props.myProfile["posts"].map((singlePostElement, i) => {
                    if (singlePostElement.active == true){
                    return (
                        <div key={i} className='posts'>
                                <Link to={`/posts/${singlePostElement._id}`} className='link'>Title: {singlePostElement.title}</Link>
                                <p className='desc'>Description: {singlePostElement.description}</p>
                                <Link to={`/posts/${singlePostElement._id}`} className='delete'>Delete this post</Link>
                            <br/>                  
                        </div>
                    )}})}
                    <br />
{/* NEW POST FORM */}
            <p className='login'>Create A New Post</p>
            <div className='cPost'>
                <form onSubmit={makePost}>
                    <input 
                    type="text" 
                    placeholder="Post Title"
                    value={postTitle}
                    onChange={(event) => setPostTitle(event.target.value)}
                    />
                    <input 
                    type="string" 
                    placeholder="Item Price"
                    value={postPrice}
                    onChange={(event) => setPostPrice(event.target.value)}
                    className="makePostInput"
                    />
                    <input 
                    type="string" 
                    placeholder="Item Location"
                    value={postLocation}
                    onChange={(event) => setPostLocation(event.target.value)}
                    className="makePostInput"
                    />
                    <p className='deliver'>Will Deliver?
                    <input 
                    type="checkbox" 
                    placeholder="Will Deliver"
                    value={postDeliver}
                    onChange={() => setPostDeliver(!postDeliver)}
                    /></p>
                    <br />
                    <textarea
                    type="text" 
                    placeholder="Item Description"
                    rows="3"
                    cols="75"
                    value={postDesc}
                    onChange={(event) => setPostDesc(event.target.value)}
                    />
                    <br />
                    <button type="submit"> Submit New Post </button>    
                </form>
            </div>
            <br />
{/*  LIST OF INCOMING MESSAGES */}
                    <p className='login'>Incoming Messages</p>
                    <div className='posts'>
                        {props.myProfile["messages"].map((singleMessageElement, j) => {
                        return (singleMessageElement.fromUser._id !== props.myProfile._id ? 
                            <div key={j} className='messages'>
                                    <p className='mTitle'>On post titled: {singleMessageElement.post.title}</p>
                                    <p className='mUser'>{singleMessageElement.fromUser.username}</p>
                                    <p className='mComment'>Commented: {singleMessageElement.content}</p>           
                                <br/>
                                <hr />                  
                            </div>
                            : '')})}
                    </div>
                </div>
            </div>
            <br/>
            <br/>
        </section>
    )
}

export default Profile;