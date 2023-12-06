import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserList = ({users, title}) => {

  const move = useNavigate();


  // Styles
    const divStyle = {
      backgroundColor: '',
      borderRadius: '10px',
      padding: '10px',
      border: '1px solid darkblue',
      cursor: 'pointer'
    };

    const goToUser = (user) =>{
      console.log(user);

    //   move('/user',{
    //     state: {user}
    //   })
    }
    
    return (
    <div className='UserList'>

        <h2>{title}</h2>
         {
          users.map((user)=>(
            <div className="blogpreview" key={user.id} onClick={()=>goToUser(user)} style={divStyle}>

                <h2>{user.name}</h2>
                <p>User Email: {user.email}</p>
                <p>User Password: {user.password}</p>

            </div>
          ))
        }

    </div>
  )
}

export default UserList