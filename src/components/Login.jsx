import { useState } from 'react'
import '../index.css'
import { assets } from '../assets/assets.js'
import axios from 'axios'
import { backendUrl } from '../App.jsx'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e) =>{
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin' , {email,password})

            if(response.data.success){
                setToken(response.data.token)
            }
            
            else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    return (
        <div className='login-pg'>
            <div className='login-cont'>
                {/* <h1 className='login-title'>Admin Panel</h1> */}

                <img className='login-form-logo' src={assets.admin_logo3} alt="" />

                <form onSubmit={onSubmitHandler}>
                    <div className='login-input-cont'>
                        {/* <p className='login-input-para'>Email Address</p> */}
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='login-input' type="email" placeholder='Email ID' />
                    </div>

                    <div className='login-input-cont'>
                        {/* <p className='login-input-para'>Password</p> */}
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='login-input' type="password" placeholder='Password' />
                    </div>

                    <button className='login-btn' type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login