// import './header.css';
// import './index.css';
// import { products } from "./data/products";
// import { ProductPage } from "./ProductPage";

// export function Gadgets() {
//     return (
//         <ProductPage
//             title="Gadgets"
//             products={products.gadgets}
//         />
//     );
// }

import { useEffect, useState } from "react";
import api from "../config/axios";
import { ProductPage } from "./ProductPage";

export function Gadgets() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response =
                    await api.get("/api/product/list");

                if(response.data.success){

                    const gadgets =
                        response.data.products.filter(
                            product =>
                            product.category === "Gadgets"
                        );

                    setProducts(gadgets);
                }

            } catch(error){
                console.log(error);
            }
        };

        fetchProducts();

    }, []);

    return (
        <ProductPage
            title="Gadgets"
            products={products}
        />
    );
}