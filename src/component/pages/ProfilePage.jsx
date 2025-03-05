import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedInUserInfo } from "../../service/UserService";
import Pagination from "../common/Pagination";
import "../../style/profilePage.css";

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await getLoggedInUserInfo();
                setUserInfo(response.user || {});
            } catch (error) {
                setError(error.response?.data?.message || error.message || 'Unable to fetch user info');
            }
        }

        fetchUserInfo();
    }
    , []);

    if (!userInfo) {
        return <div>Loading...</div>
    }

    const handleAddressClick = () => {
        navigate(userInfo.address ? '/edit-address' : '/add-address');
    }

    const orderItemList = userInfo.orderItemList || [];
    const totalItems = orderItemList.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentPageItems = orderItemList.slice(startIndex, endIndex);

    return (
        <div className="profile-page">
            <h2>Welcome {userInfo.name}</h2>

            {error ? (
                <p className="error-message">{error}</p>
            ):(
                <div>
                    <p><strong>Name: </strong>{userInfo.name}</p>
                    <p><strong>Email: </strong>{userInfo.email}</p>
                    <p><strong>Phone Number: </strong>{userInfo.phoneNumber}</p>

                    <div>
                        <h3>Address</h3>
                        {userInfo.address ? (
                            <div>
                                <p><strong>Street: </strong>{userInfo.address.street}</p>
                                <p><strong>City: </strong>{userInfo.address.city}</p>
                                <p><strong>Province: </strong>{userInfo.address.province}</p>
                                <p><strong>Postal Code: </strong>{userInfo.address.postalCode}</p>
                                <p><strong>Country: </strong>{userInfo.address.country}</p>
                            </div>
                        ) : (
                            <p>No address found</p>
                        )}
                        <button className="profile-button" onClick={handleAddressClick}>
                            {userInfo.address ? 'Edit Address' : 'Add Address'}
                        </button>
                    </div>
                    <h3>Order History</h3>
                    <ul>
                        {currentPageItems.map(order => (
                            <li key={order.id}>
                                <img src={order.product?.imageUrl} alt={order.product?.name} />
                                <div>
                                    <p><strong>Name: </strong>{order.product.name}</p>
                                    <p><strong>Quantity: </strong>{order.quantity}</p>
                                    <p><strong>Total Price: </strong>{(order.quantity*order.product.price).toFixed(2)}</p>
                                    <p><strong>Status: </strong>{order.status}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page)=>setCurrentPage(page)} />
                </div>
            )}
        </div>
    )
}

export default ProfilePage;
