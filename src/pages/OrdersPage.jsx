import './header.css';
import './index.css';
import './orders.css';
import { useEffect, useState } from "react";
import api from '../config/axios'
// import { useNavigate } from 'react-router-dom';

export function OrdersPage() {
    const [orders, setOrders] = useState([]);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);

    // const navigate = useNavigate();

    // useEffect(() => {
    //     const saveOrders = JSON.parse(localStorage.getItem("orders")) || [];

    //     setOrders(saveOrders);
    // }, []);

    useEffect(() => {

        const loadOrders = async () => {

            const token = localStorage.getItem("token");

            // if (!token) {

            //     alert("Please login first");

            //     // window.location.href = "/login";
            //     navigate("/login", { replace: true });

            //     return;
            // }

            try {

                const response = await api.get(
                    "/api/order/userorders",
                    {
                        headers: {
                            token
                        }
                    }
                );

                if (response.data.success) {
                    setOrders(response.data.orders);
                }

            } catch (error) {
                console.log(error);
            }
        };

        loadOrders();

    }, []);

    return (
        <>
            <div className="header">
                <div className="left-section">
                    <a href="/" className="header-link">
                        <img
                            src="/icons/logo.png"
                            className="logo"
                            alt="logo"
                        />
                    </a>
                </div>

                <div className="middle-section">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search"
                    />

                    <button className="search-button">
                        <img
                            src="/icons/search-icon.png"
                            className="search-icon"
                            alt=""
                        />
                    </button>
                </div>

                <div className="right-section">
                    <a
                        href="/orders"
                        className="orders-link header-link"
                    >
                        <span className="orders-text">
                            Orders
                        </span>
                    </a>

                    <a
                        href="/checkout"
                        className="cart-link header-link"
                    >
                        <img
                            src="/icons/cart-icon.png"
                            className="cart-icon"
                            alt=""
                        />

                        <div className="cart-text">
                            Cart
                        </div>
                    </a>
                </div>
            </div>

            <div className="orders-page">
                <div className="page-title">
                    Your Orders
                </div>

                {orders.length === 0 ? (
                    <h2>No Orders Yet</h2>
                ) : (
                    orders.map(order => (
                        <div
                            key={order._id}
                            className="order-container"
                        >
                            <h3>
                                Order Date: {formatter.format(new Date(order.date))}
                            </h3>

                            <h4>
                                Total: ₹{order.total}
                            </h4>

                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="order-item"
                                >
                                    <img
                                        src={item.image}
                                        width="100"
                                        alt=""
                                    />

                                    <div>
                                        <p>{item.name}</p>
                                        <p>
                                            Quantity:
                                            {" "}
                                            {item.quantity}
                                        </p>

                                        <p>
                                            Order Status: <span className='order-status'>{order.status}</span>
                                            {" "}

                                        </p>
                                        {/* <p>{item.price}</p> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </>
    );
}