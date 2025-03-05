import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../service/AuthService";
import "../../style/authPage.css";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        // Check if passwords match whenever either password field changes
        if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
            const newPassword = e.target.name === 'password' ? e.target.value : formData.password;
            const newConfirmPassword = e.target.name === 'confirmPassword' ? e.target.value : confirmPassword;
            setPasswordMatch(newPassword === newConfirmPassword);
        }
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(formData.password === e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwordMatch) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await registerUser(formData);

            if (response.status === 200) {
                setMessage(response.message);
                setMessage('');
                navigate('/login');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Unable to register user');
        }
    }

    return (
        <div className="register-page">
            <h2>Register</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label>Name: </label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <label>Phone Number: </label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                <label>Password: </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={formData.password && confirmPassword ? (passwordMatch ? 'input-success' : 'input-error') : ''}
                    required
                />
                <label>Confirm Password: </label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className={formData.password && confirmPassword ? (passwordMatch ? 'input-success' : 'input-error') : ''}
                    required
                />
                {!passwordMatch && confirmPassword && <p className="error-message">Passwords do not match</p>}
                <br />
                <button type="submit">Register</button>
                <p className="login-link">Already have an account? <a href="/login">Login</a></p>
            </form>
        </div>
    )
}

export default RegisterPage;