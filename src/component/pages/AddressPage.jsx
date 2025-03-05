import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { saveAddress } from "../../service/AddressService";
import { getLoggedInUserInfo } from "../../service/UserService";
import "../../style/addressPage.css";

const AddressPage = () => {
    const [address, setAddress] = useState(
        {
            street: '',
            city: '',
            province: '',
            postalCode: '',
            country: ''
        }
    );

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const fetchUserInfo = async () => {
            try {
                const response = await getLoggedInUserInfo();
                if (response.user.address) {
                    setAddress(response.user.address);
                }
            } catch (error) {
                setError(error.response?.data?.message || error.message || 'Unable to fetch user info');
            }
        }

        if (location.pathname === '/edit-address') {
            fetchUserInfo();
        }

    }, [location.pathname]);

    const handleChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await saveAddress(address);

            if (response.status === 200) {
                navigate('/profile');
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Failed to save/update address');
        }
    }

    return (
        <div className="address-page">
            <h2>{location.pathname === '/edit-address' ? 'Edit Address' : 'Add Address'}</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Street:
                    <input type="text" name="street" value={address.street} onChange={handleChange} required />
                </label>
                <label>City:
                    <input type="text" name="city" value={address.city} onChange={handleChange} required />
                </label>
                <label>Province:
                    <input type="text" name="province" value={address.province} onChange={handleChange} required />
                </label>
                <label>Postal Code:
                    <input type="text" name="postalCode" value={address.postalCode} onChange={handleChange} required />
                </label>
                <label>Country:
                    <input type="text" name="country" value={address.country} onChange={handleChange} required />
                </label>
                <br />
                <button type="submit">{location.pathname === '/edit-address' ? 'Update Address' : 'Save Address'}</button>
            </form>
        </div>
    )
}

export default AddressPage;
