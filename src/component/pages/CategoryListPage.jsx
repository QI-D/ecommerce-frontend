import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../service/CategoryService";
import "../../style/categoryListPage.css";

const CategoryListPage = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response.categoryList || []);
            } catch (error) {
                setError(error.response?.data?.message || error.message || 'Unable to fetch categories');
            }
        }

        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
    }

    return (
        <div className="category-list">
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <h2>Categories</h2>
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <button onClick={() => handleCategoryClick(category.id)}>{category.name}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CategoryListPage;
