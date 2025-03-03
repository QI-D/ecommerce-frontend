import React, { useState } from "react";
import '../../style/navbar.css';
import { NavLink, useNavigate } from "react-router-dom";
import { isAdmin, isAuthenticated, logout } from "../../service/AuthService";


const Navbar = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const admin = isAdmin();
    const auth = isAuthenticated();

    const handleSearchValue = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        navigate(`/?search=${searchValue}`);
    }

    const handleLogout = () => {
        const confirm = window.confirm('Are you sure you want to logout?');
        if (confirm) {
            logout();
            setTimeout(() => {
                navigate('/login');
            }, 500);
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <NavLink to="/"> <img src="./logo.png" alt="QD Mart" /></NavLink>
            </div>

            <form className="navbar-search" onSubmit={handleSearchSubmit}>
                <input type="text" className="search" placeholder="Search" value={searchValue} onChange={handleSearchValue} />
                <button type="submit" className="search-btn">Search</button>
            </form>

            <div className="navbar-link">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/categories" >Categories</NavLink>
                {auth && <NavLink to="/profile" >My Account</NavLink>}
                {admin && <NavLink to="/admin" >Admin</NavLink>}
                {!auth && <NavLink to="/login" >Login</NavLink>}
                {auth && <NavLink onClick={handleLogout}>logout</NavLink>}
                <NavLink to="/cart">Cart</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;