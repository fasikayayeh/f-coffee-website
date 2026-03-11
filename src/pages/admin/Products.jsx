import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Plus, Edit, Trash2, X } from 'lucide-react';

const Products = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        name: '', price: '', description: '', image: '', category: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/coffee');
            setProducts(res.data);
        } catch (err) {
            console.error("Failed to load products", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (currentProduct._id) {
                // Update
                const res = await axios.put(`http://localhost:5000/api/coffee/${currentProduct._id}`,
                    currentProduct,
                    { headers: { 'auth-token': user.token } }
                );
                setProducts(products.map(p => p._id === currentProduct._id ? res.data : p));
            } else {
                // Create
                const res = await axios.post('http://localhost:5000/api/coffee',
                    currentProduct,
                    { headers: { 'auth-token': user.token } }
                );
                setProducts([...products, res.data]);
            }
            setIsEditing(false);
            setCurrentProduct({ name: '', price: '', description: '', image: '', category: '' });
        } catch (err) {
            console.error("Failed to save product", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/coffee/${id}`, {
                headers: { 'auth-token': user.token }
            });
            setProducts(products.filter(p => p._id !== id));
        } catch (err) {
            console.error("Failed to delete product", err);
        }
    };

    const openEditModal = (product = { name: '', price: '', description: '', image: '', category: '' }) => {
        setCurrentProduct(product);
        setIsEditing(true);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-coffee-dark"></div>
        </div>
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-coffee-dark tracking-tight">Manage Products</h1>
                <button
                    onClick={() => openEditModal()}
                    className="bg-accent text-coffee-dark px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-colors flex items-center shadow-sm"
                >
                    <Plus size={20} className="mr-2" /> Add Product
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                    {products.map(product => (
                        <div key={product._id} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group flex flex-col bg-gray-50 aspect-auto">
                            <div className="h-40 overflow-hidden bg-white">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400' }}
                                />
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="font-bold text-coffee-dark mb-1">{product.name}</h3>
                                <p className="text-xs text-accent font-bold uppercase tracking-wider mb-2">{product.category}</p>
                                <p className="text-sm text-gray-500 font-medium mb-4 flex-1 line-clamp-2">{product.description}</p>
                                <div className="flex justify-between items-center mt-auto">
                                    <span className="font-extrabold text-coffee-dark">${product.price?.toFixed(2)}</span>
                                    <div className="flex space-x-2">
                                        <button onClick={() => openEditModal(product)} className="text-blue-500 hover:bg-blue-50 p-2 rounded transition-colors"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit/Add Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
                        <button onClick={() => setIsEditing(false)} className="absolute top-4 right-4 text-gray-400 hover:text-coffee-dark">
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold text-coffee-dark mb-6 border-b pb-4">
                            {currentProduct._id ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-coffee-dark mb-1">Name</label>
                                <input required type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none bg-gray-50" value={currentProduct.name} onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-coffee-dark mb-1">Price ($)</label>
                                    <input required type="number" step="0.01" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none bg-gray-50" value={currentProduct.price} onChange={e => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-coffee-dark mb-1">Category</label>
                                    <input required type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none bg-gray-50" value={currentProduct.category} onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-coffee-dark mb-1">Image URL</label>
                                <input required type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none bg-gray-50" value={currentProduct.image} onChange={e => setCurrentProduct({ ...currentProduct, image: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-coffee-dark mb-1">Description</label>
                                <textarea required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none bg-gray-50 h-24 resize-none" value={currentProduct.description} onChange={e => setCurrentProduct({ ...currentProduct, description: e.target.value })}></textarea>
                            </div>
                            <button type="submit" className="w-full bg-coffee-dark text-cream py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all shadow-md mt-6">
                                Save Product
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
