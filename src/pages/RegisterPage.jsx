import './index.css'
import './header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../config/axios'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"

export function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/api/user/register', {
                name,
                email,
                password
            })

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                // localStorage.setItem(
                //     "user",
                //     JSON.stringify(response.data.user)
                // );
                // alert("Account Created Successfully");

                toast.success("Account Created Successfully");

                setTimeout(()=>{
                    navigate("/");
                },2000)
            }

            else {
                // alert(response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <ToastContainer />
            <div className='loginCont'>
                <form className='login_form' onSubmit={onSubmitHandler}>
                    <Link to="/" className="header-link">
                        <img src="/icons/logo.png" className="logo" alt="logo" />
                    </Link>

                    <p>Sign Up</p>

                    <input
                        type="text"
                        placeholder="Name"
                        className="login_input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email ID"
                        className="login_input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* <input
                    type="password"
                    placeholder="Password"
                    className="login_input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /> */}

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
                            Already have an account?
                            <Link to="/login" className="logsin">
                                Login
                            </Link>
                        </span>
                    </div>

                    <button className="loginbtn">
                        Create Account
                    </button>
                </form>
            </div>
        </>
    )
}