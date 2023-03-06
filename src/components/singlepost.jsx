import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';

const COHORT_NAME = '2301-FTB-MT-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`
const myJWT = localStorage.getItem("token");
// ----------------------------------------
// const [myProfile, setMyProfile] = useState({});
//   const [myData, setMyData] = useState({})
// ----------------------------------------
const SinglePost = (props) => {
    const [messageContent, setMessageContent] = useState({});
    const { idNumber } = useParams();
    const navigate = useNavigate();
    const { postsProps } = props;
    const selectedPostArray = postsProps.filter((singlePostElement) => {
        return idNumber == singlePostElement._id
    })
    const mySelectedPost = selectedPostArray[0];
    
    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true)
            // console.log(localStorage.getItem("token"));
        } else {
            props.setIsLoggedIn(false)
            console.log("No token exists!");
        }
    },[])

// DELIVERY
    let del = "";
    if (mySelectedPost.willDeliver == true){
        del = "Yes"
        } else {
        del = "No"
    }
// DELETE A POST -----
    const myProfile = props.myProfile

    const deletePost = async (mspid) => {
        try {
          const response = await fetch(`${BASE_URL}/posts/${mspid}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${myJWT}`
            }
          });
          const result = await response.json();
          console.log(result);
          navigate("/posts");
          return result;
        } catch (err) {
          console.error(err);
        }
      }

    function btnClick(){
        deletePost(mySelectedPost._id)
    }
    console.log(myProfile._id);
    // console.log(myProfile)
// POST MESSAGE TO SELLER
    const postMessage = async (event) => {
        event.preventDefault();
        const mSPid = mySelectedPost._id
        try {
        const response = await fetch(`${BASE_URL}/posts/${mSPid}/messages`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${myJWT}`,
            // CORS-ERROR-FIX:
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
            },
            body: JSON.stringify({
            message: {
                content: messageContent,
            }})});
        const result = await response.json();
        console.log(result);
        // navigate("/posts");
        if (result.success) {
            alert("Message Sent")
            setMessageContent(result.data)}
            else {
                alert("Message failed to send")
            }

        } catch (err) {
        console.error(err);
        }
    }


// RENDER
    return (
        <div className='psts'>
            <p className='link'>{mySelectedPost.title}</p>
            <div className='desc'>
                <p>DESCRIPTION: {mySelectedPost.description}</p>
                <p>PRICE USD: {mySelectedPost.price}</p>
                <p>LOCATION: {mySelectedPost.location}</p>
                <p>DELIVERY AVAILABLE: {del}</p>    
                <div>{props.myProfile._id == mySelectedPost.author._id ? <div><button onDoubleClick={btnClick}>DOUBLE CLICK TO DELETE!!</button></div> : ''}</div>

                <div>{props.isLoggedIn && props.myProfile._id !== mySelectedPost.author._id ?
                    <form onSubmit={postMessage} action="/home">
                        <textarea name="msgTxt" id="" cols="30" rows="10"
                        type="text" placeholder='Message this seller'
                        onChange={(event) => setMessageContent(event.target.value)}/>
                        <button type='submit'>Send Message</button>
                    </form>
                    : ''}
                </div>
            </div>
        </div>
    )
}
export default SinglePost;




        //   if(translatedData.success) {
        //     // let notification = new Notification(title, options); setTimeout(() => { notification. close() }, 3000); 
        //     // alert("Your message has been sent.");
        //     setSendMessageCont(translatedData.data)
        //   } else{
        //     return
        //   }