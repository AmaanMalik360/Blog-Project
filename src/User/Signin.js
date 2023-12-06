import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signin = ({matchUser}) => {

    const token = JSON.parse(localStorage.getItem('token'))

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [pending, setPending] = useState(false)
    const move = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();

        console.log(email, password);
        console.log("Token is false:", token );
        // setPending(true)
        let signedin = matchUser( email, password);
        console.log("User Object from MatchUser is:", signedin);
        if(signedin.exists)
        {
            const user = signedin.user
            alert('Signed In Successfully')
            // toast.success("Signed In Sucessfully. ", {
            //     // Set to 1.5sec
            //     position: toast.POSITION.TOP_RIGHT,
            //     autoClose: 1500,
            // });
            setPending(false)
            localStorage.setItem('user', JSON.stringify(user))
            console.log("Token is false:", token );

            move("/home")
            
        }
        else{
            alert('User Not Found')
            // toast.error("User Not Found.", {
            //     // Set to 1.5sec
            //     position: toast.POSITION.TOP_RIGHT,
            //     autoClose: 1500,
            // });
            setPending(false)
        }
    }

    return (
        <div className='create'>
            <h2>Enter Info to Login: </h2>

            <form onSubmit={handleSubmit}>
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

                {!pending && <button >Signin</button>}
                {pending && <button disabled>Signing in.....</button>}

            </form>
        </div>           
    )
}

export default Signin