import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const BlogList = ({blogs, title }) => {

  const move = useNavigate();

  // console.log("blogs in BlogList:", blogs);

  // Styles
    const divStyle = {
      backgroundColor: '',
      borderRadius: '10px',
      padding: '10px',
      border: '1px solid darkblue',
      cursor: 'pointer'
    };

    return (
    <div className='bloglist'>

        <h2>{title}</h2>
         {
          blogs.map((blog)=>(
            <div className="blogpreview" key={blog.id} style={divStyle}>
              <Link to = {`/blog/${blog.id}`} >
                <h2>{blog.title}</h2>
                <p>Written by {blog.author}</p>
              </Link>

            </div>
          ))
        }

    </div>
  )
}

export default BlogList