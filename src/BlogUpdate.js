import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const BlogUpdate = ({updateBlog, getBlog}) => {

    // old data
    const {id} = useParams();
    let user = JSON.parse(localStorage.getItem('user'))
    user = user[0]
    
    // navigation
    const move = useNavigate()
    const [data, setData] = useState()
    
    useEffect(() => {
        let valid = getBlog(id,user.id)
        // console.log(valid);
        if(valid.matches)
        {
            // console.log(valid.blog);
            setData(valid.blog);
            // console.log(data.title, data.body);
        }
        else
        {
            alert("Access Denied");
            move('/home')
        }

    }, [])
    

    // new data
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [author, setAuthor] = useState("")
    const [pending, setPending] = useState(false)


    const handleUpdate = (e) =>{
        e.preventDefault();
        const id = data.id;
        const blog = { id , title, body, author};
        console.log(blog);

        setPending(true)
        updateBlog(blog)
        

        console.log('Blog Updated');
        setPending(false)
        move("/home")
    }

    return (
        <div className='create'>
            <h2>Update the Blog</h2>

            <form onSubmit={handleUpdate}>
                <label >Title: </label>
                <input
                    type='text'
                    required
                    placeholder= {data?.title}
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                />
                
                <label >Type Your Blog: </label>
                <textarea 
                placeholder= {data?.body}
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                >
                    
                </textarea>

                {/* <h3>Old Author: {data.author}</h3> */}
                <label >Update Author: </label>
                <input 
                    type='text'
                    required
                    placeholder={data?.author}
                    value={author}
                    onChange={(e)=> setAuthor(e.target.value)}
                   
                />


                {!pending && <button >Update Blog</button>}
                {pending && <button disabled>Updating Blog.....</button>}
            
            </form>
        </div>

              
    )
}

export default BlogUpdate