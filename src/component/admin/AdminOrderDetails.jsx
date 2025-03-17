import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    getOrdersById,
    updateOrderStatus
} from '../../service/OrderService';
import { ORDER_STATUS } from '../../utils/constants'
import '../../style/adminOrderPageDetails.css'

const AdminOrderDetailsPage = () => {
    const {itemId} = useParams();
    const [orderItems, setOrderItems] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [selectedStatus, setSelectStatus] = useState({});

    useEffect(() => {
        fetchOrderDetails(itemId);
    }, [itemId]);

    const fetchOrderDetails = async (itemId) => {
        try {
            const response = await getOrdersById(itemId);
            setOrderItems(response.orderItemList || []);
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Unable to fetch order');
        }
    };

    const handleStatusChange = (orderItemId, newStatus) => {
        setSelectStatus({...selectedStatus, [orderItemId] : newStatus});
    };

    const handleSubmitStatusChange = async (orderItemId) => {
        try {
            const response = await updateOrderStatus(orderItemId, selectedStatus[orderItemId]);
            setMessage(response.message);
            setError('')
            setTimeout(() => {
                setMessage('');
            }, 2000)
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Unable to update order item status');
        }
    };

    return (
        <div className='order-details-page'>
            <h2>Order Details</h2>
            {message && <p className="message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            {orderItems.length ? (
                orderItems.map((orderItem) => (
                    <div className='order-item-details' key={orderItem.id}>
                        <div className='info'>
                            <h3>Order Information</h3>
                            <p><strong>Order Item ID: </strong>{orderItem.id}</p>
                            <p><strong>Quantity: </strong>{orderItem.quantity}</p>
                            <p><strong>Total Price: </strong>${orderItem.price.toFixed(2)}</p>
                            <p><strong>Order Status: </strong>{orderItem.status}</p>
                            <p><strong>Date Ordered: </strong>{new Date(orderItem.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className='info'>
                            <h3>User Information</h3>
                            <p><strong>Name: </strong>{orderItem.user.name}</p>
                            <p><strong>Email: </strong>{orderItem.user.email}</p>
                            <p><strong>Phone: </strong>{orderItem.user.phoneNumber}</p>
                            <p><strong>Role: </strong>{orderItem.user.role}</p>
                            
                            <div className='info'>
                                <h3>Delivery Address</h3>
                                <p><strong>Street: </strong>{orderItem.user.address?.street}</p>
                                <p><strong>City: </strong>{orderItem.user.address?.city}</p>
                                <p><strong>Province: </strong>{orderItem.user.address?.province}</p>
                                <p><strong>Postal Code: </strong>{orderItem.user.address?.postalCode}</p>
                                <p><strong>Country: </strong>{orderItem.user.address?.country}</p>
                            </div>
                        </div>

                        <div className='info'>
                            <h2>Product Information</h2>
                            <img src={orderItem.product.imageUrl} alt={orderItem.product.name}/>
                            <p><strong>Name: </strong>{orderItem.product.name}</p>
                            <p><strong>Description: </strong>{orderItem.product.description}</p>
                            <p><strong>Price: </strong>${orderItem.product.price.toFixed(2)}</p>
                        </div>
                        <div className='status-change'>
                            <h4>Change Status</h4>
                            <select
                            className='status-option'
                            value={selectedStatus[orderItem.id || orderItem.status]}
                            onChange={(e) => handleStatusChange(orderItem.id, e.target.value)}
                            >
                                {ORDER_STATUS.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}

                            </select>
                            <button className='update-status-button'onClick={() => handleSubmitStatusChange(orderItem.id)}>Update Status</button>
                        </div>
                    </div>
                ))
            ): (
                <p>Loading Order Details...</p>
            )}
        </div>
    )
}

export default AdminOrderDetailsPage;
