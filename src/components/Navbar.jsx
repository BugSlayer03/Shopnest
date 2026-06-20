import { assets } from '../assets/assets.js'
import './navbar.css'

const Navbar = ({setToken}) => {
  return (
    <div className='header'>
        <img className='adminLogo' src={assets.admin_logo2} alt="" />
        <button onClick={() => setToken('')} className='logoutbtn'>Logout</button>
    </div>
  )
}

export default Navbar