import { Coffee, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-coffee-dark text-cream pt-12 pb-6">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                    <h3 className="text-2xl font-bold tracking-wider mb-4 flex items-center">
                        <Coffee className="mr-2 text-accent" /> COFFEE<span className="text-accent">HOUSE</span>
                    </h3>
                    <p className="text-sm opacity-80 leading-relaxed mb-4">
                        Experience the perfect blend of tradition and modern coffee culture. We source the finest beans globally for your daily inspiration.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-accent transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-accent transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="hover:text-accent transition-colors"><Twitter size={20} /></a>
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-semibold border-b border-coffee-light pb-2 mb-4 inline-block">Quick Links</h4>
                    <ul className="space-y-2 text-sm opacity-80 font-medium">
                        <li><Link to="/menu" className="hover:text-accent transition-colors">Our Menu</Link></li>
                        <li><Link to="/services" className="hover:text-accent transition-colors">Coffee Services</Link></li>
                        <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold border-b border-coffee-light pb-2 mb-4 inline-block">Contact Us</h4>
                    <ul className="space-y-2 text-sm opacity-80">
                        <li>123 Coffee Street, Bean Town 10001</li>
                        <li>Phone: (555) 123-4567</li>
                        <li>Email: hello@coffeehouse.com</li>
                        <li className="pt-2 text-accent font-semibold">Open: Mon-Sun 7am - 8pm</li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-xs opacity-60 border-t border-coffee-light pt-6">
                <p>&copy; {new Date().getFullYear()} CoffeeHouse. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
