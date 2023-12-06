import React, { useEffect, useState } from 'react'
import "./stylesheets/Home.css"
import BlogList from './BlogList'
import useFetch from "./custom hook/useFetch"

const Home = ({blogs}) => {

  const [user, setUser] = useState() // Contains user's information
  const [data, setData] = useState() // Contains all the blogs made the user

  // console.log("Blogs: ",blogs);
  useEffect(() => {
    const storeUser = JSON.parse(localStorage.getItem('user'))
    if(storeUser)
    {
      setUser(storeUser[0])
      const userBlogs = blogs.filter((obj) => obj.userId === storeUser[0].id)
      setData(userBlogs)
      // console.log("data:", data);
    }
  }, []);
  
  console.log("user:", user);

  return (
    <div className='home'>
        {user && <h1>{user.name}</h1>}
        {/* {pending && <div>.......Loading</div>} */}
        {data && <BlogList blogs={data} title="Your Blogs!"
        //  handleDelete={handleDelete}
         />}
    </div>
  )

}

export default Home

// For videos 12 to 16 where we learn about passing props and useeffect

// const Home = () => {
// const [blog, setBlog] = useState([
//   {title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1},
//   {title: 'Welcome Party', body: 'lorem ipsum...', author: 'yoshi', id: 2},
//   {title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3}
// ])


// const [count, setCount] = useState(0)
// const [name, setName] = useState(['mario','luigi'])

// const handleDelete = (id) =>{
//   const newBlogs = blog.filter((b) => b.id !== id )
//   setBlog(newBlogs)
// }

// useEffect(() => {
//   console.log("Use Effect Ran");
//   console.log(name[count]);
// },[count])


// return (
//   <div className='home'>
//       <BlogList blogs={blog} title="All Blogs!" handleDelete={handleDelete}/>
//       <button onClick={()=>{ 
//         count == 0?setCount(1)
//         :setCount(0);
//       }}> Change Name</button>
//       <p>{count === 0? name[count]: name[count]}</p>
//       {/* <BlogList blogs={blog.filter((b)=> b.author === 'mario' )} title="Mario's Blogs!"/> */}
//   </div>
// )
// }
// export default Home
