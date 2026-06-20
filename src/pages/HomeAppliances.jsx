// import './header.css';
// import './index.css';
// import { products } from "./data/products";
// import { ProductPage } from "./ProductPage";

// export function HomeAppliances() {
// //     const [cartCount, setCartCount] = useState(
// //         JSON.parse(localStorage.getItem("cart"))?.length || 0
// //     );

// //     function addToCart(product, quantity) {
// //         const cart = JSON.parse(localStorage.getItem("cart")) || [];

// //         const existingProduct = cart.find(
// //             item => item.name === product.name
// //         );

// //         if (existingProduct) {
// //             existingProduct.quantity += quantity;
// //         }

// //         else {
// //             cart.push({
// //                 name: product.name,
// //                 price: `₹${product.price}`,
// //                 image: product.image,
// //                 quantity
// //             });
// //         }

// //         localStorage.setItem(
// //             "cart",
// //             JSON.stringify(cart)
// //         );

// //         setCartCount(cart.length);
// //     }
// //     return (
// //         <>
// //             <title>Home Appliances</title>
// //             <div className="header">
// //                 <div className="left-section">
// //                     <a href="/" className="header-link">
// //                         <img src="/icons/logo.png" className="logo" alt="logo" />
// //                     </a>
// //                 </div>

// //                 <div className="middle-section">
// //                     <input type="text" className="search-bar" placeholder="Search" />

// //                     <button className="search-button">
// //                         <img src="/icons/search-icon.png" className="search-icon" />
// //                     </button>
// //                 </div>

// //                 <div className="right-section">
// //                     <a href="/orders" className="orders-link header-link">
// //                         <span className="orders-text">Orders</span>
// //                     </a>

// //                     <a href="/checkout" className="cart-link header-link">
// //                         <img src="/icons/cart-icon.png" className="cart-icon" />
// //                         <div className="cart-quantity">{cartCount}</div>
// //                         <div className="cart-text">Cart</div>
// //                     </a>
// //                 </div>
// //             </div>

// //             <div className="products">
// //                 <div className="products-grid">
// //                     {products.home_appliance.map((product, index) => (
// //                         <ProductCard
// //                             key={index}
// //                             product={product}
// //                             addToCart={addToCart}
// //                         />
// //                     ))}
// //                 </div>
// //             </div>
// //         </>
// //     );
// // }

// // function ProductCard({ product, addToCart }) {
// //     const [quantity, setQuantity] = useState(1);
// //     const [added, setAdded] = useState(false);

// //     function handleAdd() {
// //         addToCart(product, quantity);

// //         setAdded(true);

// //         setTimeout(() => {
// //             setAdded(false);
// //         }, 2000);
// //     }

//     return (
//         // <div className="product-container">

//         //     <div className="product-image-container">
//         //         <img
//         //             src={product.image}
//         //             className="product-image"
//         //             alt={product.name}
//         //         />
//         //     </div>

//         //     <div className="product-name limit-to-2-lines">
//         //         {product.name}
//         //     </div>

//         //     <div className="product-rating-container">
//         //         <img
//         //             src={product.rating}
//         //             className="product-rating-stars"
//         //             alt=""
//         //         />

//         //         <div className="product-rating-count link-primary">
//         //             {product.reviews}
//         //         </div>
//         //     </div>

//         //     <div className="product-price">
//         //         ₹{product.price}
//         //     </div>

//         //     <div className="product-quantity-container">

//         //         <select
//         //             value={quantity}
//         //             onChange={(e) =>
//         //                 setQuantity(Number(e.target.value))
//         //             }
//         //         >
//         //             {[...Array(10)].map((_, i) => (
//         //                 <option key={i + 1} value={i + 1}>
//         //                     {i + 1}
//         //                 </option>
//         //             ))}
//         //         </select>

//         //     </div>

//         //     <div className="product-spacer"></div>

//         //     <div
//         //         className="added-to-cart"
//         //         style={{
//         //             opacity: added ? 1 : 0
//         //         }}
//         //     >
//         //         Added
//         //     </div>

//         //     <button
//         //         className="add-to-cart-button button-primary"
//         //         onClick={handleAdd}
//         //     >
//         //         Add to Cart
//         //     </button>

//         // </div>

//         <ProductPage
//             title="HomeAppliances"
//             products={products.home_appliance}
//         />
//     );
// }

import { useEffect, useState } from "react";
import api from "../config/axios";
import { ProductPage } from "./ProductPage";

export function HomeAppliances() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {

            const response =
                await api.get("/api/product/list");

            if(response.data.success){

                const home =
                    response.data.products.filter(
                        product =>
                        product.category === "Home-appliances"
                    );

                setProducts(home);
            }
        };

        fetchProducts();

    }, []);

    return (
        <ProductPage
            title="Home-appliances"
            products={products}
        />
    );
}