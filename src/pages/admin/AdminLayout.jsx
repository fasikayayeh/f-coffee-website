import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Coffee, Users, LogOut } from 'lucide-react';

const AdminLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    if (!user || (!user.isAdmin)) {
        return <Navigate to="/login" replace />;
    }

    const navItems = [
        { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/orders', icon: <ShoppingCart size={20} />, label: 'Orders' },
        { path: '/admin/products', icon: <Coffee size={20} />, label: 'Products' },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-coffee-dark text-cream flex flex-col hidden md:flex">
                <div className="p-6">
                    <Link to="/" className="text-2xl font-bold tracking-wider hover:text-accent transition-colors">
                        COFFEE<span className="text-accent">ADMIN</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${location.pathname === item.path
                                    ? 'bg-accent text-coffee-dark font-bold'
                                    : 'hover:bg-coffee-medium text-gray-300'
                                }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-coffee-light/20">
                    <button
                        onClick={logout}
                        className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl hover:bg-red-500 hover:text-white transition-colors text-gray-300"
                    >
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center md:hidden">
                    <Link to="/" className="text-xl font-bold text-coffee-dark tracking-wider">
                        COFFEE<span className="text-accent">ADMIN</span>
                    </Link>
                    <button className="text-coffee-dark"><LayoutDashboard size={24} /></button>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
