import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';

const SinglePost = (props) => {
    const { idNumber } = useParams();
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

    return (
        <div className='psts'>
            <p className='link'>{mySelectedPost.title}</p>
            <div className='desc'>
                <p>DESCRIPTION: {mySelectedPost.description}</p>
                <p>PRICE USD: {mySelectedPost.price}</p>
                <p>LOCATION: {mySelectedPost.location}</p>
                <p>DELIVERY AVAILABLE: {del}</p>

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
