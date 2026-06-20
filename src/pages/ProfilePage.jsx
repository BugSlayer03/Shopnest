// src/pages/ProfilePage.jsx
import './profile.css'
import { useEffect, useContext, useState } from "react";
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

export function ProfilePage() {

    const { user, setUser, loading } = useContext(UserContext);

    const [activeSection, setActiveSection] = useState("profile");

    const [giftData, setGiftData] = useState({
        receiverName: "",
        receiverEmail: "",
        amount: "",
        quantity: 1,
        gifterName: ""
    });

    const [profileData, setProfileData] = useState({
        name: user?.name || "",
        surname: "",
        email: user?.email || "",
        phone: "",
        gender: ""
    });

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            window.location.href = "/login";
        }
    }, []);

    

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!user) {
        return <h2>User Not Found</h2>
    }

    return (
        <div className="profile-page">
            <div className="profile-page-sidebar">
                <div className="greeting">
                    <img src="/icons/user-solid.png" alt="user" className='user-img' />
                    Hello {user.name} !
                </div>

                <div
                    className={`user-sdbr ${activeSection === "profile" ? "active-sidebar-item" : ""
                        }`}
                    onClick={() => setActiveSection("profile")}
                >
                    My Profile
                </div>

                <div className="user-sdbr">
                    <Link to="/orders" className='my-order-link'>My Orders</Link>
                </div>

                <div className={`user-sdbr ${activeSection === "giftcard" ? "active-sidebar-item" : ""}`}
                    onClick={() => setActiveSection("giftcard")}
                >
                    Gift Cards
                </div>

                <div className={`user-sdbr ${activeSection === "coupons" ? "active-sidebar-item" : ""}`}
                    onClick={() => setActiveSection("coupons")}
                >
                    My Coupons
                </div>

                <div className={`user-sdbr ${activeSection === "ratings" ? "active-sidebar-item" : ""}`}
                    onClick={() => setActiveSection("ratings")}
                >
                    My reviews and ratings
                </div>

                <div className={`user-sdbr ${activeSection === "notifications" ? "active-sidebar-item" : ""}`}
                    onClick={() => setActiveSection("notifications")}
                >
                    All Notifications
                </div>

                <div className={`user-sdbr ${activeSection === "wishlist" ? "active-sidebar-item" : ""}`}
                    onClick={() => setActiveSection("wishlist")}
                >
                    Wishlist
                </div>

                <button
                    className="logout-btn"
                    onClick={() => {
                        localStorage.removeItem("token");
                        setUser(null);

                        window.location.href = "/";
                    }}
                >
                    Logout
                </button>
            </div>

            <div className="profile-page-content">
                {activeSection === "profile" && (
                    <div className="profile-form-container">

                        <h2>Profile Details</h2>

                        <input
                            type="text"
                            placeholder="First Name"
                            value={profileData.name}
                            onChange={(e) =>
                                setProfileData({
                                    ...profileData,
                                    name: e.target.value
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Last Name"
                            value={profileData.surname}
                            onChange={(e) =>
                                setProfileData({
                                    ...profileData,
                                    surname: e.target.value
                                })
                            }
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={profileData.email}
                            onChange={(e) =>
                                setProfileData({
                                    ...profileData,
                                    email: e.target.value
                                })
                            }
                        />

                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={profileData.phone}
                            onChange={(e) =>
                                setProfileData({
                                    ...profileData,
                                    phone: e.target.value
                                })
                            }
                        />

                        <select
                            value={profileData.gender}
                            onChange={(e) =>
                                setProfileData({
                                    ...profileData,
                                    gender: e.target.value
                                })
                            }
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                        <button className="save-profile-btn">
                            Save Changes
                        </button>

                    </div>
                )}

                {activeSection === "giftcard" && (
                    <div className="gift-card-container">

                        <div className="gift-form">

                            <h2>Send a Gift Card</h2>

                            <input
                                type="text"
                                placeholder="Receiver's Name"
                                value={giftData.receiverName}
                                onChange={(e) =>
                                    setGiftData({
                                        ...giftData,
                                        receiverName: e.target.value
                                    })
                                }
                            />

                            <input
                                type="email"
                                placeholder="Receiver's Email"
                                value={giftData.receiverEmail}
                                onChange={(e) =>
                                    setGiftData({
                                        ...giftData,
                                        receiverEmail: e.target.value
                                    })
                                }
                            />

                            <input
                                type="number"
                                placeholder="Gift Card Amount"
                                value={giftData.amount}
                                onChange={(e) =>
                                    setGiftData({
                                        ...giftData,
                                        amount: e.target.value
                                    })
                                }
                            />

                            <input
                                type="number"
                                placeholder="Number of Gift Cards"
                                value={giftData.quantity}
                                onChange={(e) =>
                                    setGiftData({
                                        ...giftData,
                                        quantity: e.target.value
                                    })
                                }
                            />

                            <input
                                type="text"
                                placeholder="Gifter's Name"
                                value={giftData.gifterName}
                                onChange={(e) =>
                                    setGiftData({
                                        ...giftData,
                                        gifterName: e.target.value
                                    })
                                }
                            />

                            <button className="gift-btn">
                                Send Gift Card
                            </button>

                        </div>

                        <div className="gift-preview">
                            <img
                                src="/images/gift-card.png"
                                alt="Gift Card"
                                className="gift-card-image"
                            />
                        </div>

                    </div>
                )}

                {activeSection === "coupons" && (
                    <div className="coupons">
                        <img src="/images/empty.png" alt="empty" />
                        <div className="couponstext">
                            Currently No Coupons..
                        </div>
                    </div>
                )}

                {activeSection === "ratings" && (
                    <div className="ratings">
                        <img src="/images/empty.png" alt="empty" />
                        <div className="ratingstext">
                            You have not reviewed or rated any product..
                        </div>
                    </div>
                )}

                {activeSection === "notifications" && (
                    <div className="notifications">
                        <img src="/images/empty.png" alt="empty" />
                        <div className="notificationstext">
                            All caught up..
                        </div>
                    </div>
                )}

                {activeSection === "wishlist" && (
                    <div className="wishlist">
                        <img src="/images/empty.png" alt="empty" />
                        <div className="wishlisttext">
                            Nothing in wishlist..
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}