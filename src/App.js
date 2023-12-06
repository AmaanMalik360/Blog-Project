import Navbar from './Navbar';
import Home from './Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import BlogUpdate from './BlogUpdate';
import Signup from './User/Signup';
import Signin from './User/Signin';
import blogCollection from './Collections/blogCollection';
import userCollection from './Collections/userCollection';
import { useEffect, useState } from 'react';
import Users from './User/Users';

function App() {

  localStorage.setItem('token',JSON.stringify(false));

  const [mytoken, setMyToken] = useState( JSON.parse(localStorage.getItem('token')))

  // (1) User are stored in allUsers state
  const [allUsers, setAllUsers] = useState(()=> {
    const users = JSON.parse(localStorage.getItem('users'));
    if (users) {
      return users || []
     }
  })
  // console.log("At mounting",allUsers);
  
  // Continuosly update the storage for users
  useEffect(() => {
    if(allUsers.length > 0)
    {
      localStorage.setItem('users', JSON.stringify(allUsers));
      
    }
  }, [allUsers]);

  // (2) Blogs are stored in data state
  const [data, setData] = useState(()=> {

    const blogs = JSON.parse(localStorage.getItem('blogs'));

    if (blogs) {
      return blogs || []
     }
  })
 

  // Continuosly update the storage for blogs
  useEffect(() => {
    if(data.length > 0)
    {
      localStorage.setItem('blogs', JSON.stringify(data));
      
    }
  }, [data]);

  // Functions related to user.
  
  const addUser = (newUser) =>
  {

    console.log(newUser);
    const userExists = allUsers.filter((obj) => newUser.email === obj.email)

    console.log(userExists);
    if (userExists.length === 0) 
    {
      setAllUsers((prevUsers) => [
          ...prevUsers, newUser
      ]);
      return true;
    } 
    else {
        return false;
    }
  }

  const matchUser = (email,password) =>{
    const userExists = allUsers.filter((obj) => email === obj.email && password === obj.password)
    
    if(userExists.length === 0)
    {
      const res = {
        exists: false,
        user: userExists 
      }
      return res
    }
    else{
      const res = {
        exists: true,
        user: userExists 
      }
      setMyToken(true)
      localStorage.setItem('user', JSON.stringify(userExists))
      localStorage.setItem('token', JSON.stringify(true));
      return res;
    }
  }
  
  // Functions that mutate the blogs

  const getBlog = (blogId,userId) =>
  {
    const blogExist = data.filter((obj) => obj.id === blogId && obj.userId === userId)
    if(blogExist.length === 0)
    {
      const res = {
        matches: false,
        blog: blogExist
      }
      return res
    }
    else{
      const res = {
        matches: true,
        blog: blogExist[0] 
      }
        return res
    }
  }

  const addBlog = (newblog) =>{
    setData((prevBlogs) => [
      ...prevBlogs,newblog
    ])
    
  }
  const deleteBlog = (id) =>{
    const newBlogs = data.filter((b) => b.id !== id )
    setData(newBlogs)
    
  }

  const updateBlog = (blog) =>{
    console.log(blog);
    const newBlogs = data.map((obj) => obj.id == blog.id?{...obj, 
      ...blog
    }
    : obj )
    setData(newBlogs)
    
  }


  return (
    <Router>

    <div className="App">
      <Navbar passToken={mytoken} setPassToken={setMyToken}/>
      <div className="content">
        <Routes>

          <Route path='/' element={<Signup addUser={addUser}/>}/>
          <Route path='/signin' element={<Signin matchUser={matchUser}/>}/>
          <Route path='/users' element={<Users users={allUsers} />}/>

          <Route path='/home' element={<Home blogs={data}/>}/>
          <Route path='/create' element={<Create addBlog={addBlog} />}/>
          <Route path='/blog/:id' element={<BlogDetails deleteBlog= {deleteBlog} getBlog={getBlog} />}/>
          <Route path='/update/:id' element={<BlogUpdate updateBlog = {updateBlog} getBlog={getBlog} />}/>
          <Route path='*' element={<NotFound/>}/>

        </Routes>

      </div>
    </div>
    </Router>
  );
}

export default App;
