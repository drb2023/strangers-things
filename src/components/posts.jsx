import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; 

const Posts = (props) => {
    const { postsProps } = props
    const COHORT_NAME = '2301-FTB-MT-WEB-FT'
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`
    const [searchQuery, setSearchQuery] = useState("");

    let filteredPosts = postsProps.filter((singlePostElement) => {
        let lowercasedTitle = singlePostElement.title.toLowerCase(); 
        let lowercasedDesc = singlePostElement.description.toLowerCase(); 
        // console.log(singlePostElement);
        return lowercasedTitle.includes(searchQuery.toLowerCase()) || lowercasedDesc.includes(searchQuery.toLowerCase())
    })

    const fetchData = async () => {
        try {
            const response = await fetch (`${BASE_URL}/posts`);
            const translatedData = await response.json();
            props.setPostsProps(translatedData.data.posts)
        }   catch (e) {
            document.body.style.cursor = "wait";
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData()
    },[]);
    
    return (
        <section>
            <div>
                <input 
                    className="sb"
                    type="text"
                    placeholder="Search Posts..."
                    onChange={(event) => {
                            setSearchQuery(event.target.value)
                    }}
                >
                </input>
            </div>
            <br/>
            <div>{
                filteredPosts.length ? filteredPosts.map((singlePostElement, i) => {
                    return (
                        <div key={i} className='psts'> 
                            <Link to={`/posts/${singlePostElement._id}`} className='link'>{singlePostElement.title}</Link>
                            <p className='desc'>Description: {singlePostElement.description}</p>
                            <br/>                  
                        </div>
                    )
                }) : <div> No post matching your request. Try Again
                </div>
            }</div>
    </section>

    )
}

export default Posts;