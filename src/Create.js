import React, { useEffect, useState } from 'react'
import "./stylesheets/Create.css"
import {useNavigate} from 'react-router-dom'
import { v4 as uuid } from "uuid";

const Create = ({ addBlog}) => {

    const [user, setUser] = useState()
    useEffect(() => {
        const storeUser = JSON.parse(localStorage.getItem('user'))
        if(storeUser)
        {
            setUser(storeUser[0])
            console.log("store user:", storeUser);
            console.log("user:", user);
        }
    }, []);

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [author, setAuthor] = useState("")
    const [pending, setPending] = useState(false)
    const move = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        let id = uuid().slice(0,8);
        let userId = user.id;
        const blog = {id, title, body, author, userId};
        console.log(blog);
        
        setPending(true)

        // Update blogCollection with the new blog
        addBlog(blog)
        // You might want to save it to some external storage (e.g., local storage or a server)
        // Here, we are updating the local state, but it won't persist on page reload

        setPending(false);
        move("/home");
        
    }


    return (
        <div className='create'>
            <h2>Add a New Blog</h2>

            <form onSubmit={handleSubmit}>
                <label >Title: </label>
                <input
                    type='text'
                    required
                    placeholder='Type Blog Title'
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                />
                
                <label >Type Your Blog: </label>
                <textarea 
                placeholder='Start Typing Here' 
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                >
                    
                </textarea>

                <label >Blog Author: </label>
                <input 
                    type='text'
                    required
                    placeholder='Type Author Name'
                    value={author}
                    onChange={(e)=> setAuthor(e.target.value)}
                   
                />

                {!pending && <button >Add Blog</button>}
                {pending && <button disabled>Adding Blog.....</button>}

            </form>
        </div>
    )
}

export default Create