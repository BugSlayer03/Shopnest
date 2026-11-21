// import './header.css';
// import './index.css';
// import { products } from "./data/products";
// import { ProductPage } from "./ProductPage";

// export function Foods() {
//     return (
//         <ProductPage
//             title="Foods"
//             products={products.foods}
//         />
//     );
// }

import { useEffect, useState } from "react";
import api from "../config/axios";
import { ProductPage } from "./ProductPage";

export function Foods() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {

    //     const fetchProducts = async () => {

    //         const response =
    //             await api.get("/api/product/list");

    //         if(response.data.success){

    //             const Foods =
    //                 response.data.products.filter(
    //                     product =>
    //                     product.category === "Food"
    //                 );

    //             setProducts(Foods);
    //         }
    //     };

    //     fetchProducts();

    // }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/api/product/list");
    
                if (response.data.success) {
                    const foods =
                        response.data.products.filter(
                            product => product.category === "Food"
                        );
    
                    setProducts(foods);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProducts();
}, []);

    return (
        <ProductPage
            title="Foods"
            products={products}
            loading={loading}
        />
    );
}
