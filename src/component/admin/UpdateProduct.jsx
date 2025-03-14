import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct, getProductById } from '../../service/ProductService';
import { getAllCategories } from '../../service/CategoryService';
import '../../style/createProduct.css'

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {productId} = useParams();

    useEffect(() => {
        getAllCategories().then((res) => setCategories(res.categoryList));

        if (productId) {
            getProductById(productId).then((response) => {
                setName(response.product.name);
                setDescription(response.product.description);
                setCategoryId(response.product.category.id);
                setPrice(response.product.price);
                setImageUrl(response.product.imageUrl);
            })
        }
    }, [productId]);

    const handleImageUpdate = (e) => {
        setImage(e.target.file[0]);
        setImageUrl(URL.createObjectURL(e.target.file[0]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('')

        try {
            const formData = new FormData();

            if (image) {
                formData.append('image', image);
            }
            formData.append('categoryId', categoryId);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);

            const response = await updateProduct(productId, formData);

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
            <h2>Update Product</h2>
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
                {imageUrl && <img src={imageUrl} alt={name} />}
                <input type='file'
                    onChange={handleImageUpdate}
                />
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default UpdateProduct;
