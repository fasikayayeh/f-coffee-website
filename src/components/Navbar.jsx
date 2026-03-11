import { Link } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, User } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { cart } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="bg-coffee-dark text-cream p-4 sticky top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-wider hover:text-accent transition-colors duration-300">
                    COFFEE<span className="text-accent">HOUSE</span>
                </Link>

                <div className="hidden md:flex space-x-6 items-center uppercase text-sm font-semibold tracking-wide">
                    <Link to="/" className="hover:text-accent transition-colors duration-300">Home</Link>
                    <Link to="/menu" className="hover:text-accent transition-colors duration-300">Menu</Link>
                    <Link to="/services" className="hover:text-accent transition-colors duration-300">Services</Link>
                    <Link to="/contact" className="hover:text-accent transition-colors duration-300">Contact</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link to="/cart" className="relative hover:text-accent transition-colors duration-300">
                        <ShoppingCart size={24} />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-accent text-coffee-dark rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium">Hi, {user.name}</span>
                                <button onClick={logout} className="bg-accent text-coffee-dark px-4 py-1 rounded hover:bg-opacity-90 transition-all font-semibold">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center space-x-1 hover:text-accent transition-colors duration-300">
                                <User size={20} />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>

                    <button className="md:hidden">
                        <MenuIcon size={24} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
