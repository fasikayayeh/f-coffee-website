import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { Plus, Check, Coffee } from 'lucide-react';

const MOCK_COFFEES = [
    { _id: '1', name: 'Espresso', price: 3.50, description: 'Strong and bold, a classic Italian shot.', category: 'Hot Coffee', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800' },
    { _id: '2', name: 'Cappuccino', price: 4.50, description: 'Equal parts espresso, steamed milk, and foam.', category: 'Hot Coffee', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=800' },
    { _id: '3', name: 'Latte', price: 4.75, description: 'Espresso with plenty of steamed milk and a light layer of foam.', category: 'Hot Coffee', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=800' },
    { _id: '4', name: 'Iced Americano', price: 3.75, description: 'Espresso poured over water and ice.', category: 'Cold Coffee', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba1?auto=format&fit=crop&q=80&w=800' },
    { _id: '5', name: 'Mocha', price: 5.25, description: 'Espresso, bittersweet mocha sauce, and steamed milk.', category: 'Hot Coffee', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=800' },
    { _id: '6', name: 'Cold Brew', price: 4.25, description: 'Steeped for 20 hours for a smooth, rich flavor.', category: 'Cold Coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800' }
];

const Menu = () => {
    const [coffees, setCoffees] = useState([]);
    const [category, setCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);
    const [addedItems, setAddedItems] = useState({});

    useEffect(() => {
        const fetchCoffees = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/coffee');
                if (res.data && res.data.length > 0) {
                    setCoffees(res.data);
                } else {
                    setCoffees(MOCK_COFFEES); // Fallback if DB is empty
                }
            } catch (err) {
                console.error("Error fetching coffees:", err);
                setCoffees(MOCK_COFFEES); // Fallback on error
            } finally {
                setLoading(false);
            }
        };
        fetchCoffees();
    }, []);

    const handleAddToCart = (coffee) => {
        addToCart(coffee);
        setAddedItems(prev => ({ ...prev, [coffee._id]: true }));
        setTimeout(() => {
            setAddedItems(prev => ({ ...prev, [coffee._id]: false }));
        }, 2000);
    };

    const filteredCoffees = category === 'All'
        ? coffees
        : coffees.filter(c => c.category === category);

    const categories = ['All', ...new Set(coffees.map(c => c.category))];

    return (
        <div className="bg-cream min-h-screen py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-coffee-dark mb-4 drop-shadow-sm flex items-center justify-center">
                        <Coffee className="mr-4 text-accent" size={48} />
                        Our Menu
                    </h1>
                    <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all shadow-sm ${category === cat
                                    ? 'bg-coffee-dark text-accent shadow-md transform scale-105'
                                    : 'bg-white text-coffee-medium hover:bg-coffee-light hover:text-cream'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-coffee-dark"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md://grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCoffees.map(coffee => (
                            <div key={coffee._id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                                <div className="h-64 overflow-hidden relative group cursor-pointer" onClick={() => window.location.href = `/product/${coffee._id}`}>
                                    <img
                                        src={coffee.image}
                                        alt={coffee.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800' }}
                                    />
                                    <div className="absolute inset-0 bg-coffee-dark opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full font-bold text-coffee-dark shadow">
                                        ${coffee.price.toFixed(2)}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-2xl font-bold text-coffee-dark hover:text-accent transition-colors cursor-pointer" onClick={() => window.location.href = `/product/${coffee._id}`}>
                                            {coffee.name}
                                        </h3>
                                    </div>
                                    <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">{coffee.category}</p>
                                    <p className="text-coffee-medium mb-6 line-clamp-2 h-12">
                                        {coffee.description}
                                    </p>

                                    <button
                                        onClick={() => handleAddToCart(coffee)}
                                        className={`w-full py-3 rounded-lg font-bold flex items-center justify-center transition-all ${addedItems[coffee._id]
                                            ? 'bg-green-500 text-white'
                                            : 'bg-coffee-dark text-cream hover:bg-accent hover:text-coffee-dark'
                                            }`}
                                    >
                                        {addedItems[coffee._id] ? (
                                            <><Check className="mr-2" size={20} /> Added to Cart</>
                                        ) : (
                                            <><Plus className="mr-2" size={20} /> Add to Cart</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
