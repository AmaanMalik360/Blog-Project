import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from "uuid";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = ({addUser}) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [pending, setPending] = useState(false)
    const move = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        let id = uuid().slice(0,8);

        const user = {id, name, email, password};
        console.log(user);
        
        setPending(true)

        if(addUser(user))
        {
            alert('User Created. ')
            // toast.success("User Created. ", {
            //     // Set to 1.5sec
            //     position: toast.POSITION.TOP_RIGHT,
            //     autoClose: 1500,
            // });
            setPending(false)
            move("/signin")
        }
        else{
            alert('User Already exists')
            // toast.error("User Already exists.", {
            //     // Set to 1.5sec
            //     position: toast.POSITION.TOP_RIGHT,
            //     autoClose: 1500,
            // });
            setPending(false)
        }
        
    }

    return (
        <div className='create'>
            <h2>Enter Required Information</h2>

            <form onSubmit={handleSubmit}>
                <label >Name: </label>
                <input
                    type='text'
                    required
                    placeholder='Type Your Name'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                />
                <label >Email: </label>
                <input
                    type='email'
                    required
                    placeholder='Type Your Email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <label >Password: </label>
                <input
                    type='password'
                    required
                    placeholder='Type Your Password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />

                {!pending && <button >Signup</button>}
                {pending && <button disabled>Signing Up.....</button>}


            </form>
        </div>              
    ) 
}

export default Signup