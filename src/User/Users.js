import React from 'react'
import UserList from './UserDetails'

const Users = ({users}) => {

    return (
        <div className='home'>
            
            {users && <UserList users={users} title="All Users!" />}
        </div>
      )
}

export default Users