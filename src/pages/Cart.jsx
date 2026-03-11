import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const { cart, removeFromCart, clearCart, cartTotal } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCheckout = (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
        if (!address) {
            setError("Please provide a delivery address");
            return;
        }

        // Redirect to Stripe payment Intent
        navigate('/checkout', { state: { address } });
    };

    if (success) {
        return (
            <div className="bg-cream min-h-[70vh] flex flex-col items-center justify-center p-4">
                <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg border border-coffee-light/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-3 bg-green-500"></div>
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag size={48} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-coffee-dark mb-4">Order Placed Successfully!</h2>
                    <p className="text-coffee-medium mb-8 text-lg">Thank you for choosing CoffeeHouse. Your freshly roasted coffee will be on its way soon.</p>
                    <Link to="/menu" className="inline-block bg-accent text-coffee-dark px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-md transform hover:-translate-y-1">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-cream min-h-screen py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-extrabold text-coffee-dark mb-10 flex items-center">
                    <ShoppingBag className="mr-4 text-accent" size={40} /> Your Cart
                </h1>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-coffee-light/20 max-w-2xl mx-auto">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag size={40} className="text-gray-400" />
                        </div>
                        <p className="text-xl text-coffee-medium mb-8 font-medium">Your cart is currently empty.</p>
                        <Link to="/menu" className="inline-flex items-center bg-coffee-dark text-cream px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition-all shadow-md transform hover:-translate-y-1">
                            Browse Menu <ArrowRight className="ml-2" size={20} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-6">
                            {cart.map(item => (
                                <div key={item._id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center shadow-sm hover:shadow-md transition-shadow">
                                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl shadow-sm" />
                                    <div className="ml-6 flex-grow">
                                        <h3 className="text-xl font-bold text-coffee-dark mb-1">{item.name}</h3>
                                        <p className="text-coffee-medium text-sm mb-2">{item.category}</p>
                                        <div className="flex items-center text-coffee-dark font-semibold">
                                            <span>${item.price.toFixed(2)}</span>
                                            <span className="mx-3 text-gray-300">|</span>
                                            <span>Qty: <span className="text-accent">{item.quantity}</span></span>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col items-end justify-between h-24">
                                        <span className="font-extrabold text-xl text-coffee-dark">${(item.price * item.quantity).toFixed(2)}</span>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors flex items-center text-sm font-semibold"
                                        >
                                            <Trash2 size={18} className="mr-1" /> Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-coffee-light/20 h-fit sticky top-24">
                            <h2 className="text-2xl font-bold text-coffee-dark mb-6 border-b border-gray-200 pb-4">Order Summary</h2>
                            <div className="flex justify-between mb-4 text-coffee-medium font-medium">
                                <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-6 text-coffee-medium font-medium pb-6 border-b border-gray-200">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between items-end mb-8">
                                <span className="text-xl font-bold text-coffee-dark">Total</span>
                                <span className="text-3xl font-extrabold text-coffee-dark">${cartTotal.toFixed(2)}</span>
                            </div>

                            {user ? (
                                <form onSubmit={handleCheckout} className="space-y-6 mt-6">
                                    {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded">{error}</div>}
                                    <div>
                                        <label className="block text-sm font-semibold text-coffee-dark mb-2">Delivery Address</label>
                                        <textarea
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all bg-gray-50 text-coffee-dark resize-none h-24"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Enter your full delivery address"
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-accent text-coffee-dark py-4 rounded-xl font-extrabold text-lg hover:bg-opacity-90 transition-all shadow-lg transform hover:-translate-y-1 flex justify-center items-center"
                                        disabled={loading}
                                    >
                                        {loading ? <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-coffee-dark"></div> : 'Place Order'}
                                    </button>
                                </form>
                            ) : (
                                <div className="mt-8 text-center bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <p className="text-coffee-medium mb-4 font-medium">Please login to securely checkout</p>
                                    <Link to="/login" className="block w-full bg-coffee-dark text-cream py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors shadow">
                                        Login to Checkout
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
