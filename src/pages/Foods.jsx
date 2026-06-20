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

    useEffect(() => {

        const fetchProducts = async () => {

            const response =
                await api.get("/api/product/list");

            if(response.data.success){

                const Foods =
                    response.data.products.filter(
                        product =>
                        product.category === "Food"
                    );

                setProducts(Foods);
            }
        };

        fetchProducts();

    }, []);

    return (
        <ProductPage
            title="Foods"
            products={products}
        />
    );
}