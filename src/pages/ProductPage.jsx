import './header.css';
import './index.css';
import { useState,useEffect } from "react";
import api from "../config/axios";

export function ProductPage({ title, products }) {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {

        const loadCartCount = async () => {

            const token =
                localStorage.getItem("token");

            if (!token) return;

            try {

                const response = await api.get(
                    "/api/user/cart",
                    {
                        headers: {
                            token
                        }
                    }
                );

                if (response.data.success) {
                    setCartCount(
                        response.data.cartData?.length || 0
                    );
                }

            } catch (error) {
                console.log(error);
            }
        };

        loadCartCount();

    }, []);

    async function addToCart(product, quantity) {

        const token =
            localStorage.getItem("token");

        const response = await api.get(
            "/api/user/cart",
            {
                headers: {
                    token
                }
            }
        );

        const cart =
            response.data.cartData || [];

        const existingProduct = cart.find(
            item => item.name === product.name
        );

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({
                name: product.name,
                price: `₹${product.price}`,
                image: product.image,
                quantity
            });
        }

        console.log("Cart before save:", cart);

        await api.post(
            "/api/user/cart",
            {
                cartData: cart
            },
            {
                headers: {
                    token
                }
            }
        );

        setCartCount(cart.length);
    }

    return (
        <>
            <title>{title}</title>

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

                        <div className="cart-quantity">
                            {cartCount}
                        </div>

                        <div className="cart-text">
                            Cart
                        </div>
                    </a>
                </div>
            </div>

            <div className="products">
                <div className="products-grid">
                    {products.map((product, index) => (
                        <ProductCard
                            key={index}
                            product={product}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

function ProductCard({ product, addToCart }) {
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    function handleAdd() {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");

            window.location.href = "/login";

            return;
        }

        addToCart(product, quantity);

        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 2000);
    }

    return (
        <div className="product-container">
            <div className="product-image-container">
                <img
                    src={product.image[0]}
                    className="product-image"
                    alt={product.name}
                />
            </div>

            <div className="product-name limit-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img
                    src={product.rating}
                    className="product-rating-stars"
                    alt=""
                />

                <div className="product-rating-count link-primary">
                    {product.reviews}
                </div>
            </div>

            <div className="product-price">
                ₹{product.price}
            </div>

            <div className="product-quantity-container">
                <select
                    value={quantity}
                    onChange={(e) =>
                        setQuantity(Number(e.target.value))
                    }
                >
                    {[...Array(10)].map((_, i) => (
                        <option
                            key={i + 1}
                            value={i + 1}
                        >
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>

            <div className="product-spacer"></div>

            <div
                className="added-to-cart"
                style={{
                    opacity: added ? 1 : 0
                }}
            >
                Added
            </div>

            <button
                className="add-to-cart-button button-primary"
                onClick={handleAdd}
            >
                Add to Cart
            </button>
        </div>
    );
}