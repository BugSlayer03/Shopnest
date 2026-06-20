// import { useLocation } from "react-router-dom";
// import { products } from './data/products';
// import { ProductPage } from "./ProductPage";

// export function SearchResults() {
//     const location = useLocation();

//     const searchTerm =
//         new URLSearchParams(location.search)
//             .get("q") || "";

//     const allProducts = [
//         ...products.gadgets,
//         ...products.beauty,
//         ...products.foods,
//         ...products.home_appliance
//     ];

//     const results = allProducts.filter(product =>
//         product.name
//             .toLowerCase()
//             .includes(searchTerm.toLowerCase())
//     );

//     return (
//         <ProductPage
//             title={`Search Results: ${searchTerm}`}
//             products={results}
//         />
//     );
// }

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../config/axios";
import { ProductPage } from "./ProductPage";

export function SearchResults() {

    const location = useLocation();

    const searchTerm =
        new URLSearchParams(location.search)
            .get("q") || "";

    const [results, setResults] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response =
                    await api.get("/api/product/list");

                if (response.data.success) {

                    const filteredProducts =
                        response.data.products.filter(
                            product =>
                                product.name
                                    .toLowerCase()
                                    .includes(
                                        searchTerm.toLowerCase()
                                    )
                        );

                    setResults(filteredProducts);
                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();

    }, [searchTerm]);

    return (
        <ProductPage
            title={`Search Results: ${searchTerm}`}
            products={results}
        />
    );
}