import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../../service/ProductService';
import Pagination from '../common/Pagination';
import '../../style/adminProductPage.css'

const AdminProductPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    const fetchProducts = useCallback(async () => {
        try {
            const response = await getAllProducts();
            const productList = response.productList || [];

            setTotalPages(Math.ceil(productList.length / itemsPerPage));
            setProducts(productList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Unable to fetch product');
        }
    }, [currentPage]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleUpdate = async (id) => {
        navigate(`/admin/update-product/${id}`)
    };

    const handleDelete = async(id) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?")

        if (confirmed) {
            try {
                await deleteProduct(id);
                fetchProducts();
            } catch (error) {
                setError(error.response?.data?.message || error.message || 'Unable to delete product');
            }
        }
    };

    return (
        <div className='admin-product-page'>
            <div className='admin-product-list'>
                <div className="admin-product-header">
                    <h2>Products</h2>
                    {error && <p className="error-message">{error}</p>}
                    <button onClick={() => {navigate('/admin/create-product')}}>Create Product</button>
                </div>
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <span>{product.name}</span>
                            <div className='admin-btn'>
                                <button className='admin-btn-update' onClick={() => handleUpdate(product.id)}>Update</button>
                                <button className='admin-btn-delete' onClick={() => handleDelete(product.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
        </div>
    )
};

export default AdminProductPage;
