import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import useFetch from './custom hook/useFetch';
import "./stylesheets/BlogDetails.css"

const BlogDetails = ({deleteBlog, getBlog}) => {

    const {id} = useParams();
    let user = JSON.parse(localStorage.getItem('user'))
    user = user[0]
    

    const move = useNavigate();
    // states
    useEffect(() => {
        let valid = getBlog(id,user.id)
        console.log(valid);
        if(valid.matches)
        {
            // console.log(valid.blog);
            setBlog(valid.blog);
        }
        else
        {
            alert("Access Denied");
            move('/home')
        }

    }, [])
    
    const [blog, setBlog] = useState()
    const [pending, setPending] = useState(false)
    // console.log("Blog in Details",blog);

    const handleDelete = () =>{
        setPending(true)
        deleteBlog(blog.id)
        setPending(false)
        move('/home')
    }
    
    
    return (
        <div className='blogdetails'>
            {/* {pending && <div>........Loading</div>}
            {error && <div>{error}</div>} */}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written By: {blog.author}</p>
                    <div>{blog.body}</div>

                    <button onClick={handleDelete} className='b1'>Delete</button>
                    <Link to= {`/update/${blog.id}`} className='b1 b2'>Update</Link>
                </article>
            )}

        </div>
    )
}

export default BlogDetails





