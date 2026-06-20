import './index.css'
import './header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../config/axios'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

export function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post('/api/user/login', {
                email,
                password
            })

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                // localStorage.setItem(
                //     "user",
                //     JSON.stringify(response.data.user)
                // );
                // alert("Login Successful");
                toast.success("Login successful")

                setTimeout(()=>{
                    navigate("/");
                },2000)
            }
            else {
                // alert(response.data.message);
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );
            // toast.error(error.message)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className='loginCont'>
                <form className='login_form' onSubmit={onSubmitHandler}>

                    <a href="/" className="header-link">
                        <img src="/icons/logo.png" className="logo" alt="logo" />
                    </a>

                    <p>Login</p>

                    <input type="email" placeholder="Email ID" className="login_input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />

                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            className="pass-input"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <span
                            className="eye-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <div className="login-choice">
                        <span className="state_changer">
                            Don't have an account?
                            <Link to="/register" className="logsin">
                                Create Account
                            </Link>
                        </span>
                    </div>

                    <button className='loginbtn'>Login</button>
                </form>
            </div>
        </>
    )
}