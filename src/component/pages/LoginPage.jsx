import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/AuthService";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(formData);

            if (response.status === 200) {
                setMessage(response.message);
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                setMessage('');
                navigate('/profile');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Unable to login');
        }
    }

    return (
        <div className="register-page">
            <h2>Login</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label>Password: </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required>
                </input>
                <br />
                <button type="submit">Login</button>
                <p className="register-link">Don't have an account? <a href="/register">Register</a></p>
            </form>
        </div>
    )
}

export default LoginPage;