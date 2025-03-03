import React, { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";
import { searchProducts, getAllProducts } from "../../service/ProductService";
import "../../style/home.css";

const Home = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let allProducts = [];
                const queryparames = new URLSearchParams(location.search);
                const searchItem = queryparames.get("search");

                if (searchItem) {
                    const response = await searchProducts(searchItem);
                    allProducts = response.productList || [];
                } else {
                    const response = await getAllProducts();
                    allProducts = response.productList || [];
                }

                setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
                setProducts(allProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
            } catch (error) {
                setError(error.response?.data?.message || error.message || 'Unable to fetch products');
            }
        }

        fetchProducts();

    }, [location.search, currentPage]);

    return (
        <div className="home">
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <ProductList products={products} />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
                </div>
            )}

        </div>
    );
}

export default Home;
