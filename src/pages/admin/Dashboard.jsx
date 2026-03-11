import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users/stats', {
                    headers: { 'auth-token': user.token }
                });
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch admin stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [user.token]);

    if (loading) return (
        <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-coffee-dark"></div>
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-coffee-dark mb-8 tracking-tight">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Stat Cards */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
                        <DollarSign size={28} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-coffee-dark">${stats?.totalRevenue.toFixed(2)}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mr-4">
                        <ShoppingCart size={28} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Orders</p>
                        <h3 className="text-2xl font-bold text-coffee-dark">{stats?.totalOrders}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-14 h-14 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mr-4">
                        <Users size={28} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Users</p>
                        <h3 className="text-2xl font-bold text-coffee-dark">{stats?.totalUsers}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-14 h-14 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mr-4">
                        <TrendingUp size={28} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Avg Order Value</p>
                        <h3 className="text-2xl font-bold text-coffee-dark">
                            ${stats?.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : '0.00'}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-96 flex flex-col items-center justify-center text-center">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130362-1800926.png" alt="Empty graph" className="h-48 opacity-50 mb-4" />
                <h3 className="text-xl font-bold text-coffee-dark">Detailed Analytics Coming Soon</h3>
                <p className="text-gray-500 max-w-md mx-auto mt-2">We are currently collecting more ordering data to generate comprehensive sales charts.</p>
            </div>
        </div>
    );
};

export default Dashboard;
