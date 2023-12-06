import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({passToken, setPassToken}) => {

  const move = useNavigate();
  let user = JSON.parse(localStorage.getItem('user'));
  
  const signOut = () =>{
    localStorage.setItem('user', null)
    setPassToken(false)
  }

  const renderLoggedInLinks = () =>{
    return (
      <>
        <Link to="/home">Home</Link>
        <Link to="/create" > New Blog</Link>     
        <Link onClick={signOut} to="/"> Signout</Link>     
      </>
      
    ) 
  }
  
  const renderNonLoggedInLinks = () =>{
    return (
      <>
        <Link to="/">Signup</Link>
        <Link to="/signin">Signin</Link>    
        <Link to="/users">Users</Link>    
      </>
      
    ) 
  }


  return (

    <nav className='navbar'>
        <h1>The Dojo Blog</h1>
        <div className="links">
        {user !== null? renderLoggedInLinks(): renderNonLoggedInLinks() }

        </div>
        
    </nav>
  )
}

export default Navbar