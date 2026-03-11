import { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock } from "lucide-react";

// Use a test key for development
const stripePromise = loadStripe("pk_test_51O1_dummy_key_for_testing_12345");

const CheckoutForm = ({ clientSecret, orderData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:5173/profile", // redirect directly, or handle locally
            },
            redirect: 'if_required',
        });

        if (error) {
            setMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            // Save order to our backend
            try {
                await axios.post(
                    'http://localhost:5000/api/orders',
                    {
                        ...orderData,
                        paymentStatus: "Paid",
                        paymentIntentId: paymentIntent.id
                    },
                    { headers: { 'auth-token': user.token } }
                );
                clearCart();
                navigate("/profile?success=true");
            } catch (err) {
                setMessage("Payment succeeded, but order creation failed.");
            }
        } else {
            setMessage("An unexpected error occurred.");
        }
        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="w-full bg-accent text-coffee-dark py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-md transform hover:-translate-y-1 flex items-center justify-center disabled:opacity-50"
            >
                {isLoading ? <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-coffee-dark"></div> : <><Lock className="mr-2" size={20} /> Pay Now</>}
            </button>
            {message && <div id="payment-message" className="text-red-500 text-sm mt-4 text-center">{message}</div>}
        </form>
    );
};

const Payment = () => {
    const [clientSecret, setClientSecret] = useState("");
    const { cart, cartTotal } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const address = location.state?.address || "";

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (cart.length === 0) {
            navigate('/cart');
            return;
        }

        const items = cart.map(item => ({
            coffeeId: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        }));

        // Fetch client secret
        axios.post("http://localhost:5000/api/payment/create-payment-intent",
            { items, totalPrice: cartTotal },
            { headers: { 'auth-token': user.token } }
        )
            .then((res) => setClientSecret(res.data.clientSecret))
            .catch((err) => console.error("Stripe Error:", err));
    }, [cart, user]);

    const appearance = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#D4A373',
            colorBackground: '#ffffff',
            colorText: '#3E2723',
        },
    };
    const options = { clientSecret, appearance };

    const orderData = {
        items: cart.map(item => ({
            coffeeId: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        totalPrice: cartTotal,
        address,
    }

    return (
        <div className="bg-cream min-h-screen py-16 flex justify-center items-center">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-coffee-light/20 relative overflow-hidden">
                <h1 className="text-3xl font-extrabold text-coffee-dark mb-6 text-center border-b pb-4">Secure Checkout</h1>
                <div className="mb-6 flex justify-between text-lg font-bold text-coffee-dark bg-gray-50 p-4 rounded-xl">
                    <span>Total to Pay:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>

                {clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm clientSecret={clientSecret} orderData={orderData} />
                    </Elements>
                ) : (
                    <div className="flex justify-center my-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-accent"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payment;
