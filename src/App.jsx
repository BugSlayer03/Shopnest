import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Orders from './pages/Orders.jsx'
import Login from './components/Login.jsx'
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹'

const App = () => {

    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'')

    useEffect(() => {
        localStorage.setItem('token',token)
    },[token])

    return (
        <div className='admin-page'>
            <ToastContainer />
            {token === '' ? <Login setToken = {setToken} /> :
                <>
                    <Navbar setToken={setToken} />
                    <hr />

                    <div className='side-bar'>
                        <SideBar />
                        <div className='content'>
                            <Routes>
                                <Route path='/add' element={<Add token={token} />} />
                                <Route path='/list' element={<List token={token} />} />
                                <Route path='/order_admin' element={<Orders token={token} />} />
                            </Routes>
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export default App