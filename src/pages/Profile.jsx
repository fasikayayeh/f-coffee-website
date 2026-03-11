import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { User, Package, Clock, MapPin } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const paymentSuccess = searchParams.get("success");

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { 'auth-token': user.token }
                });
                setProfileData(res.data.user);
                setOrders(res.data.orders);
            } catch (err) {
                console.error("Failed to fetch profile", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user, navigate]);

    if (loading) return (
        <div className="min-h-screen bg-cream flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-coffee-dark"></div>
        </div>
    );

    return (
        <div className="bg-cream min-h-screen py-16">
            <div className="container mx-auto px-4 max-w-5xl">

                {paymentSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-8 text-center" role="alert">
                        <strong className="font-bold">Payment Successful! </strong>
                        <span className="block sm:inline">Your order has been placed and is being processed.</span>
                    </div>
                )}

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12 border border-coffee-light/20">
                    <div className="bg-coffee-dark p-8 md:p-12 text-cream flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-6 mb-6 md:mb-0">
                            <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center text-coffee-dark">
                                <User size={48} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">{profileData?.name}</h1>
                                <p className="text-coffee-light mt-1">{profileData?.email}</p>
                                {profileData?.isAdmin && <span className="inline-block mt-2 bg-accent text-coffee-dark px-3 py-1 text-xs font-bold rounded-full">ADMIN</span>}
                            </div>
                        </div>
                        <button
                            onClick={() => { logout(); navigate('/'); }}
                            className="border-2 border-accent text-accent hover:bg-accent hover:text-coffee-dark transition-colors px-6 py-2 rounded-lg font-bold"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-coffee-dark mb-8 flex items-center">
                    <Package className="mr-3 text-accent" size={32} /> Your Orders
                </h2>

                {orders.length === 0 ? (
                    <div className="bg-white p-12 text-center rounded-2xl shadow border border-gray-100">
                        <p className="text-coffee-medium text-lg">You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-gray-100 pb-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500 font-mono">Order #{order._id}</p>
                                        <div className="flex items-center text-sm text-coffee-medium mt-1">
                                            <Clock size={14} className="mr-1" />
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 flex gap-4">
                                        <span className="px-4 py-1 bg-gray-100 text-coffee-dark rounded-full text-sm font-bold">
                                            {order.status}
                                        </span>
                                        <span className={`px-4 py-1 rounded-full text-sm font-bold ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {order.paymentStatus || 'Pending'}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold text-coffee-dark mb-3">Items</h3>
                                        <ul className="space-y-2">
                                            {order.items.map((item, idx) => (
                                                <li key={idx} className="flex justify-between text-sm text-coffee-medium">
                                                    <span>{item.quantity}x {item.name}</span>
                                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-4 pt-2 border-t border-gray-100 flex justify-between font-bold text-coffee-dark">
                                            <span>Total</span>
                                            <span>${order.totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <h3 className="font-semibold text-coffee-dark mb-2 flex items-center">
                                            <MapPin size={16} className="mr-1 text-accent" /> Delivery Address
                                        </h3>
                                        <p className="text-sm text-coffee-medium whitespace-pre-wrap">{order.address}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
