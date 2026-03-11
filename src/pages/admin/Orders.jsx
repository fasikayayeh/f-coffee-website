import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Check, X } from 'lucide-react';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/orders', {
                headers: { 'auth-token': user.token }
            });
            // Sort by most recent
            setOrders(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${id}`,
                { status: newStatus },
                { headers: { 'auth-token': user.token } }
            );
            // Optimistic UI update
            setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/orders/${id}`, {
                headers: { 'auth-token': user.token }
            });
            setOrders(orders.filter(o => o._id !== id));
        } catch (err) {
            console.error("Failed to delete order", err);
        }
    }

    if (loading) return (
        <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-coffee-dark"></div>
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-coffee-dark mb-8 tracking-tight">Manage Orders</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 font-semibold text-gray-600">Order ID</th>
                                <th className="p-4 font-semibold text-gray-600">Date</th>
                                <th className="p-4 font-semibold text-gray-600">Total</th>
                                <th className="p-4 font-semibold text-gray-600">Payment</th>
                                <th className="p-4 font-semibold text-gray-600">Status</th>
                                <th className="p-4 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map(order => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-sm font-mono text-gray-500">{order._id.substring(0, 8)}...</td>
                                    <td className="p-4 text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 text-sm font-bold text-coffee-dark">${order.totalPrice.toFixed(2)}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {order.paymentStatus || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                                            className="bg-gray-100 border-none rounded py-1 px-2 text-sm text-coffee-dark font-medium cursor-pointer focus:ring-2 focus:ring-accent"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors flex items-center"
                                        >
                                            <X size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500">No orders found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
