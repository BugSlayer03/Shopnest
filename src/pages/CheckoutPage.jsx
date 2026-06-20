import { useState, useEffect, useCallback } from "react";
import './checkout.css';
import api from "../config/axios";
// import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
// import "react-toastify/dist/ReactToastify.css";

export function CheckoutPage() {
    const [cart, setCart] = useState([]);
    const [shippingCost, setShippingCost] = useState({});
    const [deliveryDates, setDeliveryDates] = useState({});
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    // const navigate = useNavigate();

    // useEffect(() => {

    //     const token = localStorage.getItem("token");

    //     if (!token) {
    //         alert("Please login first");

    //         // window.location.href = "/login";
    //         navigate("/login", { replace: true });

    //         return;
    //     }

    // }, []);

    const getFormattedDate = useCallback((daysToAdd) => {
        const d = new Date();

        d.setDate(d.getDate() + daysToAdd);

        return d.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
        });
    }, []);

    // useEffect(() => {
    //     const savedCart =
    //         JSON.parse(localStorage.getItem("cart")) || [];
    //     setCart(savedCart);

    //     const defaultDates = {};

    //     savedCart.forEach((_, index) => {
    //         defaultDates[index] = getFormattedDate(8);
    //     });

    //     setDeliveryDates(defaultDates);
    // }, [getFormattedDate]);

    useEffect(() => {

        const loadCart = async () => {

            const token =
                localStorage.getItem("token");

            const response =
                await api.get(
                    "/api/user/cart",
                    {
                        headers: {
                            token
                        }
                    }
                );

            console.log(response.data);
            console.log(response.data.cartData);
            console.log(typeof response.data.cartData);

            if (response.data.success) {

                // const savedCart =
                //     response.data.cartData || [];

                const savedCart =
                    Array.isArray(response.data.cartData)
                        ? response.data.cartData
                        : [];

                setCart(savedCart);

                const defaultDates = {};

                savedCart.forEach((_, index) => {
                    defaultDates[index] =
                        getFormattedDate(8);
                });

                setDeliveryDates(defaultDates);
            }
        };

        loadCart();

    }, [getFormattedDate]);

    async function deleteItem(index) {
        const updatedCart = cart.filter((_, i) => i !== index);

        setCart(updatedCart);

        // localStorage.setItem("cart", JSON.stringify(updatedCart));

        const token =
            localStorage.getItem("token");

        await api.post(
            "/api/user/cart",
            {
                cartData: updatedCart
            },
            {
                headers: {
                    token
                }
            }
        );
    }

    function handleShippingChange(index, cost, days) {
        setShippingCost(prev => ({
            ...prev,
            [index]: Number(cost)
        }));

        setDeliveryDates(prev => ({
            ...prev,
            [index]: getFormattedDate(days)
        }));
    }

    // const baseDate = new Date();

    // function getFormattedDate(daysToAdd) {
    //     const d = new Date(baseDate);

    //     d.setDate(d.getDate() + daysToAdd);

    //     return d.toLocaleDateString("en-US", {
    //         weekday: "long",
    //         month: "long",
    //         day: "numeric"
    //     });
    // }

    async function placeOrder() {

        if (!phone.trim()) {
            toast.error("Please enter phone number");
            return;
        }

        if (phone.length !== 10) {
            toast.error("Enter a valid 10-digit phone number");
            return;
        }

        if (!address.trim()) {
            toast.error("Please enter delivery address");
            return;
        }

        if (cart.length === 0) return;

        setIsAnimating(true);

        try {

            const token =
                localStorage.getItem("token");

            await new Promise(resolve =>
                setTimeout(resolve, 1000)
            );

            await api.post(
                "/api/order/place",
                {
                    items: cart,
                    total: total.toFixed(2),
                    phone,
                    address
                },
                {
                    headers: {
                        token
                    }
                }
            );

            // localStorage.removeItem("cart");

            await api.post(
                "/api/user/cart",
                {
                    cartData: []
                },
                {
                    headers: {
                        token
                    }
                }
            );

            localStorage.setItem("cartCount", "0");

            setCart([]);

            setOrderPlaced(true);

            setTimeout(() => {
                window.location.href = "/";
            }, 3000);

        } catch (error) {

            console.log(error);

            toast.error("Failed to place order");
        }
    }

    // const itemsPrice = cart.reduce(
    //     (sum, item) =>
    //         sum +
    //         Number(item.price.replace("₹", "")) *
    //         item.quantity,
    //     0
    // );

    const itemsPrice = cart.reduce(
        (sum, item) => {
            console.log("Cart Item:", item);

            return (
                sum +
                Number((item.price || "₹0").replace("₹", "")) *
                (item.quantity || 0)
            );
        },
        0
    );

    const shipping = Object.values(shippingCost)
        .reduce((a, b) => a + b, 0);

    const subtotal = itemsPrice + shipping;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    if (orderPlaced) {
        return (
            <div className="success-screen">
                <h1>✅ Order Placed Successfully!</h1>
                <p>Thank you for shopping with ShopNest.</p>
            </div>
        );
    }

    return (
        <>
            <ToastContainer
                // position="top-right"
                // autoClose={3000}
                // theme="colored"
            />

            {isAnimating && <div className="green-spread"></div>}

            <title>Checkout</title>

            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/" className="header-link">
                            <img src="/icons/logo.png" className="logo" alt="logo" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link" href="/">{cart.length} items</a>)
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {cart.map((item, index) => (

                            <div
                                className="cart-item-container"
                                key={index}
                            >
                                <div className="delivery-date">
                                    Delivery date:
                                    {" "}
                                    {deliveryDates[index] || getFormattedDate(8)}
                                </div>

                                <div className="cart-item-details-grid">

                                    <img
                                        className="product-image"
                                        src={item.image}
                                        alt=""
                                    />

                                    <div className="cart-item-details">

                                        <div className="product-name">
                                            {item.name}
                                        </div>

                                        <div className="product-price">
                                            {item.price}
                                        </div>

                                        <div className="product-quantity">

                                            Quantity:
                                            {" "}
                                            {item.quantity}

                                            <span
                                                className="delete-quantity-link link-primary"
                                                onClick={() => deleteItem(index)}
                                            >
                                                Delete
                                            </span>

                                        </div>

                                    </div>

                                    <div className="delivery-options">

                                        <div className="delivery-options-title">
                                            Choose a delivery option:
                                        </div>

                                        <label className="delivery-option">
                                            <input
                                                type="radio"
                                                name={`shipping-${index}`}
                                                defaultChecked
                                                onChange={() =>
                                                    handleShippingChange(index, 0, 8)
                                                }
                                            />

                                            <div>
                                                <div className="delivery-option-date">
                                                    <span>{getFormattedDate(8)}</span>
                                                </div>
                                                <div className="delivery-option-price">
                                                    FREE Shipping
                                                </div>
                                            </div>

                                        </label>

                                        <label className="delivery-option">
                                            <input
                                                type="radio"
                                                name={`shipping-${index}`}
                                                onChange={() =>
                                                    handleShippingChange(index, 449, 4)
                                                }
                                            />

                                            <div>
                                                <div className="delivery-option-date">
                                                    <span>{getFormattedDate(4)}</span>
                                                </div>
                                                <div className="delivery-option-price">
                                                    ₹449 - Shipping
                                                </div>
                                            </div>

                                        </label>

                                        <label className="delivery-option">
                                            <input
                                                type="radio"
                                                name={`shipping-${index}`}
                                                onChange={() =>
                                                    handleShippingChange(index, 899, 1)
                                                }
                                            />

                                            <div>
                                                <div className="delivery-option-date">
                                                    <span>{getFormattedDate(1)}</span>
                                                </div>
                                                <div className="delivery-option-price">
                                                    ₹899 - Shipping
                                                </div>
                                            </div>

                                        </label>

                                    </div>

                                </div>


                            </div>

                        ))}

                        {
                            cart.length > 0 && (
                                <div className="customer-details">

                                    <h3>Delivery Details</h3>

                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="checkout-input"
                                    />

                                    <textarea
                                        placeholder="Enter Delivery Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="checkout-textarea"
                                    />

                                </div>
                            )
                        }

                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        <div className="payment-summary-row">
                            <div>Items ({cart.length})</div>
                            <div className="payment-summary-money">₹{itemsPrice}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">₹{shipping}</div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">₹{subtotal}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">₹{tax.toFixed(2)}</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">₹{total.toFixed(2)}</div>
                        </div>

                        <button className="place-order-button button-primary" onClick={placeOrder} disabled={cart.length === 0}>
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
}