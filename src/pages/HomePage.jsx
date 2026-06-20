import './header.css';
import './index.css';
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import api from '../config/axios';
import { Link } from "react-router-dom";

export function HomePage() {
    const [cartCount, setCartCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const { user, setUser } = useContext(UserContext);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {

        const loadData = async () => {

            const token = localStorage.getItem("token");

            if (!token) return;

            try {

                const userResponse = await api.get(
                    "/api/user/me",
                    {
                        headers: { token }
                    }
                );

                if (userResponse.data.success) {
                    setUser(userResponse.data.user);
                }

                const cartResponse = await api.get(
                    "/api/user/cart",
                    {
                        headers: { token }
                    }
                );

                if (cartResponse.data.success) {

                    const cart =
                        cartResponse.data.cartData || [];

                    setCartCount(cart.length);
                }

            } catch (error) {
                console.log(error);
            }
        };

        loadData();

    }, []);

    return (
        <>
            <div className="header">
                <div className="left-section">
                    <Link to="/" className="header-link">
                        <img src="/icons/logo.png" className="logo" alt="logo" />
                    </Link>
                </div>

                <div className="middle-section">
                    <input type="text" className="search-bar" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            window.location.href =
                                `/search?q=${searchTerm}`;
                        }
                    }} />

                    <button className="search-button" onClick={() =>
                        window.location.href =
                        `/search?q=${searchTerm}`
                    }>
                        <img src="icons/search-icon.png" className="search-icon" />
                    </button>
                </div>

                <div className="right-section">
                    {/* <a href="/login" className='login-link header-link'>
                        <span>Login / Sign Up</span>
                    </a> */}

                    {
                        user ? (
                            <div
                                className="profile-container"
                                onMouseEnter={() =>
                                    setShowDropdown(true)
                                }
                                onMouseLeave={() =>
                                    setShowDropdown(false)
                                }
                            >
                                <img
                                    src="/icons/user.png"
                                    alt="profile"
                                    className="profile-icon"
                                />

                                {
                                    showDropdown && (
                                        <div className="profile-dropdown">

                                            <div
                                                className="dropdown-item"
                                                onClick={() =>
                                                    window.location.href = "/profile"
                                                }
                                            >
                                                My Profile
                                            </div>

                                            <div
                                                className="dropdown-item"
                                                onClick={() => {

                                                    localStorage.removeItem("token");
                                                    localStorage.removeItem("user");

                                                    window.location.href = "/";
                                                }}
                                            >
                                                Logout
                                            </div>

                                        </div>
                                    )
                                }
                            </div>
                        )
                            :
                            (
                                <Link
                                    to="/login"
                                    className="login-link header-link"
                                >
                                    <span>
                                        Login / Sign Up
                                    </span>
                                </Link>
                            )
                    }

                    <Link to="/orders" className="orders-link header-link">
                        <span className="orders-text">Orders</span>
                    </Link>

                    <Link to="/checkout" className="cart-link header-link">
                        <img src="icons/cart-icon.png" className="cart-icon" />
                        <div className="cart-quantity">{cartCount}</div>
                        <div className="cart-text">Cart</div>
                    </Link>
                </div>

            </div>

            <div className="home-page">
                <div className="overview">
                    <img src="icons/angle-left-solid.png" alt="" className="left-icon" onClick={prevSlide} />
                    <img src="icons/angle-right-solid.png" alt="" className="right-icon" onClick={nextSlide} />

                    <div className="slider" id="slider">
                        <div className="slide">
                            <div className="text-section">
                                Headphones starting @ ₹799
                            </div>

                            <div className="img-section">
                                <img src="images/gadgets/Headphone.png" alt="" className="img-section-img" />
                            </div>
                        </div>

                        <div className="slide">
                            <div className="text-section">
                                Best Selling Kitchen Items
                            </div>

                            <div className="img-section">
                                <img src="images/Home appliances/Curd-maker.png" alt="" className="img-section-img" />
                            </div>
                        </div>

                        <div className="slide">
                            <div className="text-section">
                                Beauty Products for all
                            </div>

                            <div className="img-section">
                                <img src="images/beauty/Khadi2.png" alt="" className="img-section-img" />
                            </div>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="product-category">
                    <p>
                        Next-Gen Essentials
                        <button onClick={() => window.location.href = '/gadgets'}>See More</button>
                    </p>
                    <img src="images/gadgets/Boat-speaker.png" alt="" />
                    <img src="images/gadgets/Rechargable-wire-mouse.png" alt="" />
                    <img src="images/gadgets/Headphone.png" alt="" />
                    <img src="images/gadgets/Smart-Watch.png" alt="" />
                </div>

                <hr />

                <div className="product-category">
                    <p>
                        Pure.Simple.Beautiful
                        <button onClick={() => window.location.href = '/beauty'}>See More</button>
                    </p>
                    <img src="images/beauty/Cetaphil.png" alt="" />
                    <img src="images/beauty/Dove-men.png" alt="" />
                    <img src="images/beauty/Gentlemen.png" alt="" />
                    <img src="images/beauty/Khadi_sand.png" alt="" />
                </div>

                <hr />

                <div className="product-category">
                    <p>
                        Fresh Picks, Everyday
                        <button onClick={() => window.location.href = '/foods'}>See More</button>
                    </p>
                    <img src="images/foods/Nutella.png" alt="" />
                    <img src="images/foods/Dates.png" alt="" />
                    <img src="images/foods/Muesli.png" alt="" />
                    <img src="images/foods/Dry Fruits.png" alt="" />
                </div>

                <hr />

                <div className="product-category">
                    <p>
                        Upgrade Your Home
                        <button onClick={() => window.location.href = '/home_appliances'}>See More</button>
                    </p>
                    <img src="images/Home appliances/Air-fryer.png" alt="" />
                    <img src="images/Home appliances/Kettle.png" alt="" />
                    <img src="images/Home appliances/Oven.png" alt="" />
                    <img src="images/Home appliances/Toaster.png" alt="" />
                </div>
            </div>

            <div className="footer">
                <div className="upper">
                    <ul>
                        <h3>ABOUT</h3>
                        <li onClick={() => window.location.href = "contact"}>Contact</li>
                        <li onClick={() => window.location.href = "about"}>About Us</li>
                        <li>Careers</li>
                        <li>Help</li>
                    </ul>

                    <ul>
                        <h3>ACCOUNT</h3>
                        <li onClick={() => window.location.href = "profile"}>My Account</li>
                        <li onClick={() => window.location.href = "login"}>Login / Register</li>
                        <li onClick={() => window.location.href = "checkout"}>Cart</li>
                        <li >
                            <a target="_blank" rel="noopener noreferrer" href="http://localhost:5174">
                                Admin Login
                            </a>
                        </li>
                    </ul>

                    <ul>
                        <h3>SOCIALS</h3>
                        <li><a href="https://www.linkedin.com/in/patelpriyanshu03/">LinkedIn</a></li>
                        <li><a href="https://github.com/BugSlayer03">Github</a></li>
                    </ul>
                </div>

                <hr />

                <div className="lower">
                    <p>© 2026 ShopNest. All rights reserved.</p>
                </div>
            </div>
        </>
    );
}

let currentIndex = 0;

function showSlide(index) {
    const slider = document.getElementById("slider");
    const totalSlides = document.querySelectorAll('.slide').length;

    if (index >= totalSlides || index < 0) {
        return;
    }
    // else if(index<0) currentIndex=totalSlides-1;
    else currentIndex = index;

    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}