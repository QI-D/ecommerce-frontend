import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../service/ProductService';
import { getAllCategories } from '../../service/CategoryService';
import '../../style/createProduct.css'

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories().then((res) => setCategories(res.categoryList));
    }, [])

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('categoryId', categoryId);
            formData.append('image', image);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);

            const response = await createProduct(formData);

            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate('/admin/products');
                }, 2000)
            }

        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Unable to create product');
        }
    }

    return (
        <div className='create-product-page'>
            <h2>Create Product</h2>
            {message && <p className='message'>{message}</p>}
            {error && <p className='error-message'>{error}</p>}
            <form onSubmit={handleSubmit} className='product-form'>
                <label>Name</label>
                <input type='text'
                    placeholder='Product Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Description</label>
                <textarea placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                <label>Category</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option>Select Category</option>
                    {categories.map((category) => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                    ))}
                </select>
                <label>Price</label>
                <input type='number'
                    placeholder='Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <label>Image</label>
                <input type='file'
                    onChange={handleImage}
                />
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default CreateProduct;
