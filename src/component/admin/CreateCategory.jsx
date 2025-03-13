import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../../service/CategoryService';
import '../../style/createCategory.css'

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await createCategory({name});

            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate('/admin/categories');
                }, 2000)
            }

        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Unable to create category');
        }
    }

    return (
        <div className='create-category-page'>
            <h2>Create Category</h2>
            {message && <p className='message'>{message}</p>}
            <form onSubmit={handleSubmit} className='category-form'>
                <input type='text'
                    placeholder='Category Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default CreateCategory;
