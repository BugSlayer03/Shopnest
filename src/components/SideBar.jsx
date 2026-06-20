import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import './sidebar.css'

const SideBar = () => {
    return (
        <div className='firstDiv'>
            <div className='secondDiv'>
                <NavLink to="/add" className={({ isActive }) =>
                    isActive ? "add active-link" : "add"
                }>
                    <img className='add-img' src={assets.add_icon} alt="" />
                    <p className='add-text'>Add Items</p>
                </NavLink>

                <NavLink to="/list" className={({ isActive }) =>
                    isActive ? "add active-link" : "add"
                }>
                    <img className='add-img' src={assets.order_icon} alt="" />
                    <p className='add-text'>List Items</p>
                </NavLink>

                <NavLink to="/order_admin" className={({ isActive }) =>
                    isActive ? "add active-link" : "add"
                }>
                    <img className='add-img' src={assets.order_icon} alt="" />
                    <p className='add-text'>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default SideBar