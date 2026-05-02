import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await register(name, email, password);

        if (result.success) {
            navigate('/profile');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="bg-cream min-h-[80vh] flex items-center justify-center p-4 py-16">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-coffee-light/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent via-coffee-dark to-accent"></div>
                <div className="text-center mb-8">
                    <Coffee size={48} className="mx-auto text-coffee-dark mb-4 drop-shadow-sm" />
                    <h2 className="text-3xl font-extrabold text-coffee-dark tracking-tight">Join CoffeeHouse</h2>
                    <p className="text-coffee-medium mt-2">Create an account to start ordering</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-lg mb-6 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-coffee-dark mb-2">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-gray-50 text-coffee-dark"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-coffee-dark mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-gray-50 text-coffee-dark"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-coffee-dark mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-gray-50 text-coffee-dark"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-coffee-dark text-cream py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all flex justify-center items-center shadow-md transform hover:-translate-y-0.5"
                        disabled={loading}
                    >
                        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-cream"></div> : 'Create Account'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm font-medium text-coffee-medium">
                    Already have an account? <Link to="/login" className="text-accent hover:text-coffee-dark font-bold transition-colors">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
