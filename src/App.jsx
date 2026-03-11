import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Services from './pages/Services';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import CoffeeDetails from './pages/CoffeeDetails';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Products from './pages/admin/Products';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product/:id" element={<CoffeeDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
