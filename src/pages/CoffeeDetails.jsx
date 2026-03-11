import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Plus, Check, Star, MessageSquare, ArrowLeft } from 'lucide-react';

const CoffeeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [coffee, setCoffee] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Review form state
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [reviewError, setReviewError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const fetchCoffeeAndReviews = async () => {
            try {
                const coffeeRes = await axios.get(`http://localhost:5000/api/coffee/find/${id}`);
                setCoffee(coffeeRes.data);

                const reviewRes = await axios.get(`http://localhost:5000/api/reviews/${id}`);
                setReviews(reviewRes.data);
            } catch (err) {
                console.error("Failed to load coffee details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCoffeeAndReviews();
    }, [id]);

    const handleAddToCart = () => {
        if (coffee) {
            addToCart(coffee);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
        if (!comment.trim()) {
            setReviewError("Please enter a comment");
            return;
        }

        setSubmitting(true);
        setReviewError('');

        try {
            const res = await axios.post(
                'http://localhost:5000/api/reviews',
                { coffeeId: id, rating, comment },
                { headers: { 'auth-token': user.token } }
            );
            setReviews([res.data, ...reviews]);
            setComment('');
            setRating(5);
        } catch (err) {
            setReviewError(err.response?.data || "Failed to submit review");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-cream flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-coffee-dark"></div>
        </div>
    );

    if (!coffee) return (
        <div className="min-h-screen bg-cream flexflex-col justify-center items-center text-center p-4">
            <h2 className="text-3xl text-coffee-dark font-bold mb-4">Coffee not found</h2>
            <button onClick={() => navigate('/menu')} className="text-accent font-semibold flex items-center justify-center">
                <ArrowLeft className="mr-2" size={20} /> Back to Menu
            </button>
        </div>
    );

    const avgRating = reviews.length > 0
        ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
        : "New";

    return (
        <div className="bg-cream min-h-screen py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                <button onClick={() => navigate('/menu')} className="mb-8 text-coffee-medium hover:text-coffee-dark font-bold flex items-center transition-colors">
                    <ArrowLeft className="mr-2" size={20} /> Back to Menu
                </button>

                {/* Coffee Details Section */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl mb-16 border border-coffee-light/20 flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-96 md:h-auto">
                        <img
                            src={coffee.image}
                            alt={coffee.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800' }}
                        />
                    </div>
                    <div className="md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
                        <div className="uppercase tracking-widest text-accent text-sm font-bold mb-2">
                            {coffee.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-coffee-dark mb-4">{coffee.name}</h1>

                        <div className="flex items-center mb-6">
                            <div className="flex items-center text-yellow-500 mr-4">
                                <Star className="fill-current" size={20} />
                                <span className="ml-1 font-bold text-coffee-dark bg-yellow-100 px-2 rounded">{avgRating}</span>
                            </div>
                            <span className="text-coffee-medium text-sm">({reviews.length} reviews)</span>
                        </div>

                        <p className="text-coffee-medium text-lg mb-8 leading-relaxed">
                            {coffee.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-4xl font-extrabold text-coffee-dark">${coffee.price.toFixed(2)}</span>
                            <button
                                onClick={handleAddToCart}
                                className={`px-8 py-4 rounded-xl font-bold flex items-center justify-center transition-all shadow-md transform hover:-translate-y-1 ${added ? 'bg-green-500 text-white' : 'bg-coffee-dark text-cream hover:bg-accent hover:text-coffee-dark'
                                    }`}
                            >
                                {added ? (
                                    <><Check className="mr-2" size={24} /> Added</>
                                ) : (
                                    <><Plus className="mr-2" size={24} /> Add to Cart</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-coffee-dark mb-8 flex items-center border-b pb-4">
                        <MessageSquare className="mr-3 text-accent" size={32} /> Reviews & Ratings
                    </h2>

                    {/* Review Form */}
                    <div className="bg-white p-8 rounded-2xl shadow border border-gray-100 mb-10">
                        <h3 className="text-xl font-bold text-coffee-dark mb-4">Write a Review</h3>
                        {user ? (
                            <form onSubmit={handleSubmitReview} className="space-y-4">
                                {reviewError && <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{reviewError}</div>}

                                <div>
                                    <label className="block text-sm font-semibold text-coffee-dark mb-2">Rating</label>
                                    <div className="flex space-x-2">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                type="button"
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className={`transition-colors focus:outline-none ${star <= rating ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'}`}
                                            >
                                                <Star size={28} className={star <= rating ? "fill-current" : ""} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-coffee-dark mb-2">Comment</label>
                                    <textarea
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all bg-gray-50 text-coffee-dark resize-none h-24"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="What did you think of this coffee?"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-accent text-coffee-dark px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all disabled:opacity-50"
                                >
                                    {submitting ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </form>
                        ) : (
                            <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-200">
                                <p className="text-coffee-medium mb-3">Please login to write a review.</p>
                                <button onClick={() => navigate('/login')} className="text-coffee-dark font-bold underline hover:text-accent disabled:opacity-50">
                                    Log In Here
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Reviews List */}
                    {reviews.length === 0 ? (
                        <p className="text-coffee-medium italic text-center py-8">No reviews yet. Be the first to review!</p>
                    ) : (
                        <div className="space-y-6">
                            {reviews.map(review => (
                                <div key={review._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-4">
                                        <div>
                                            <h4 className="font-bold text-coffee-dark">{review.userId?.name || 'Anonymous User'}</h4>
                                            <p className="text-xs text-gray-500 mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} className={i < review.rating ? "fill-current" : "text-gray-300"} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-coffee-medium leading-relaxed">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CoffeeDetails;
