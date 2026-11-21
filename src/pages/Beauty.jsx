// import './header.css';
// import './index.css';
// import { products } from "./data/products";
// import { ProductPage } from "./ProductPage";

// export function Beauty() {
//     return (
//         <ProductPage
//             title="Beauty"
//             products={products.beauty}
//         />
//     );
// }

import { useEffect, useState } from "react";
import api from "../config/axios";
import { ProductPage } from "./ProductPage";

export function Beauty() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {

    //     const fetchProducts = async () => {

    //         const response =
    //             await api.get("/api/product/list");

    //         if(response.data.success){

    //             const beauty =
    //                 response.data.products.filter(
    //                     product =>
    //                     product.category === "Beauty"
    //                 );

    //             setProducts(beauty);
    //         }
    //     };

    //     fetchProducts();

    // }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/api/product/list");
    
                if (response.data.success) {
                    const beauty =
                        response.data.products.filter(
                            product => product.category === "Beauty"
                        );
    
                    setProducts(beauty);
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
            title="Beauty"
            products={products}
            loading={loading}
        />
    );
}
