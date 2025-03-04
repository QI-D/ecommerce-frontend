import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";
import { getProductsByCategory } from "../../service/ProductService";
import "../../style/home.css";

const CategoryProductPage = () => {

    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await getProductsByCategory(categoryId);
                const allProducts = response.productList || [];

                setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
                setProducts(allProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
            } catch (error) {
                setError(error.response?.data?.message || error.message || 'Unable to fetch products');
            }
        }

        fetchProductsByCategory();
    }, [categoryId, currentPage]);

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

export default CategoryProductPage;
