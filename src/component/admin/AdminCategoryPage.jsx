import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    getAllCategories,
    deleteCategory
 } from '../../service/CategoryService';
import '../../style/adminCategoryPage.css'

const AdminCategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await getAllCategories();
            setCategories(response.categoryList || []);
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Unable to fetch category');
        }
    }

    const handleUpdate = async (id) => {
        navigate(`/admin/update-category/${id}`)
    }

    const handleDelete = async(id) => {
        const confirmed = window.confirm("Are you sure you want to delete this category?")

        if (confirmed) {
            try {
                await deleteCategory(id);
                fetchCategories();
            } catch (error) {
                setError(error.response?.data?.message || error.message || 'Unable to delete category');
            }
        }
    }

    return (
        <div className='admin-category-page'>
            <div className='admin-category-list'>
                <div className="admin-category-header">
                    <h2>Categories</h2>
                    <button onClick={() => {navigate('/admin/create-category')}}>Create Category</button>
                    {error && <p className="error-message">{error}</p>}
                </div>
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <span>{category.name}</span>
                            <div className='admin-btn'>
                                <button className='admin-btn-update' onClick={() => handleUpdate(category.id)}>Update</button>
                                <button className='admin-btn-delete' onClick={() => handleDelete(category.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AdminCategoryPage;
