import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';

const COHORT_NAME = '2301-FTB-MT-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`
const myJWT = localStorage.getItem("token");
// const [myProfile, setMyProfile] = useState({});
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [myData, setMyData] = useState({})

const SinglePost = (props) => {
    const { idNumber } = useParams();
    const navigate = useNavigate();
    const { postsProps } = props;
    const selectedPostArray = postsProps.filter((singlePostElement) => {
        return idNumber == singlePostElement._id
    })
    const mySelectedPost = selectedPostArray[0];

    let del = "";

    if (mySelectedPost.willDeliver == true){
        del = "Yes"
        } else {
        del = "No"
    }

    // const postMessage = async () => {
    //     try {
    //       const response = await fetch(`${BASE_URL}/posts/5e8929ddd439160017553e06/messages`, {
    //         method: "POST",
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${TOKEN_STRING_HERE}`
    //         },
    //         body: JSON.stringify({
    //           message: {
    //             content: "Do you still have this?  Would you take $10 less?"
    //           }
    //         })
    //       });
    //       const result = await response.json();
    //       console.log(result);
    //       return result
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }


// DELETE POST -----
    const myProfile = props.myProfile

    const deletePost = async (mspid) => {
        try {
          const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-FT/posts/${mspid}`, {
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
// -------------

    return (
        <div className='psts'>
            <p className='link'>{mySelectedPost.title}</p>
            <div className='desc'>
                <p>DESCRIPTION: {mySelectedPost.description}</p>
                <p>PRICE USD: {mySelectedPost.price}</p>
                <p>LOCATION: {mySelectedPost.location}</p>
                <p>DELIVERY AVAILABLE: {del}</p>
                
                    
                <div>{props.myProfile._id == mySelectedPost.author._id ? <div><button onDoubleClick={btnClick}>DOUBLE CLICK TO DELETE!!</button></div> : ''}</div>
           
                {/* <div>{props.isLoggedIn ? <input 
                    className="sb"
                    type="text"
                    placeholder="Search Posts..."
                    onChange={(event) => {
                            setSearchQuery(event.target.value)
                    }}>
                </input> : ''}</div> */}

            </div>
        </div>
    )
}
export default SinglePost;
