import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryById, updateCategory } from '../../service/CategoryService';
import '../../style/createCategory.css'

const UpdateCategory = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const {categoryId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategory(categoryId);
    }, [categoryId])

    const fetchCategory = async (categoryId) => {
        try {
            const response = await getCategoryById(categoryId);
            setName(response.category.name);
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Unable to fetch category by ID');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updateCategory(categoryId, {name});

            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate('/admin/categories');
                }, 2000)
            }

        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Unable to update category');
        }
    }

    return (
        <div className='create-category-page'>
            <h2>Update Category</h2>
            {message && <p className='message'>{message}</p>}
            <form onSubmit={handleSubmit} className='category-form'>
                <input type='text'
                    placeholder='Category Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default UpdateCategory;
