import { Link } from 'react-router-dom';
import { Coffee, Package, Truck, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-cream min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-coffee-dark opacity-90 z-0"></div>
                {/* Placeholder for an actual background image - using CSS gradient for now */}
                <div className="absolute inset-0 bg-gradient-to-r from-coffee-dark via-coffee-medium to-coffee-dark opacity-50 z-0"></div>

                <div className="relative z-10 text-center text-cream px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
                        Awaken Your <span className="text-accent italic">Senses</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-light mb-10 opacity-90 animate-fade-in-up animation-delay-200">
                        Artisanal coffee roasted to perfection, delivered fresh to your door.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up animation-delay-400">
                        <Link to="/menu" className="bg-accent text-coffee-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center">
                            Explore Our Menu <ArrowRight className="ml-2" size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-20 px-4 container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-coffee-dark mb-4">Why Choose CoffeeHouse?</h2>
                    <div className="w-24 h-1 bg-accent mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 group">
                        <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:text-coffee-dark transition-colors duration-300">
                            <Coffee size={40} className="text-coffee-medium group-hover:text-coffee-dark" />
                        </div>
                        <h3 className="text-2xl font-bold text-coffee-dark mb-4">Premium Beans</h3>
                        <p className="text-coffee-medium leading-relaxed">We ethically source the top 1% of Arabica beans globally for unparalleled flavor.</p>
                    </div>

                    <div className="p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 group">
                        <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:text-coffee-dark transition-colors duration-300">
                            <Package size={40} className="text-coffee-medium group-hover:text-coffee-dark" />
                        </div>
                        <h3 className="text-2xl font-bold text-coffee-dark mb-4">Freshly Roasted</h3>
                        <p className="text-coffee-medium leading-relaxed">Roasted locally in small batches to guarantee maximum freshness.</p>
                    </div>

                    <div className="p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 group">
                        <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:text-coffee-dark transition-colors duration-300">
                            <Truck size={40} className="text-coffee-medium group-hover:text-coffee-dark" />
                        </div>
                        <h3 className="text-2xl font-bold text-coffee-dark mb-4">Fast Delivery</h3>
                        <p className="text-coffee-medium leading-relaxed">From our roaster to your cup in days, preserving every tasting note.</p>
                    </div>
                </div>
            </section>

            {/* Featured Coffee Preview */}
            <section className="bg-coffee-dark text-cream py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">Taste the Difference</h2>
                    <p className="text-xl opacity-80 mb-10 max-w-2xl mx-auto">Discover our most popular blends and single-origin selections.</p>
                    <Link to="/menu" className="inline-block border-2 border-accent text-accent px-10 py-3 rounded-full font-bold hover:bg-accent hover:text-coffee-dark transition-all">
                        View All Coffee
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
