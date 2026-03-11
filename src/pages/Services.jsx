import { Coffee, Truck, Calendar, Award } from 'lucide-react';

const Services = () => {
    return (
        <div className="bg-cream min-h-screen py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-coffee-dark mb-4 drop-shadow-sm">Our Services</h1>
                    <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                    <p className="text-xl text-coffee-medium max-w-2xl mx-auto">Beyond the cup—discover how we bring the perfect coffee experience to you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Service 1 */}
                    <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-coffee-light/10 group">
                        <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center mb-6 text-coffee-dark group-hover:bg-accent group-hover:text-white transition-colors">
                            <Truck size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-coffee-dark mb-4">Coffee Delivery</h2>
                        <p className="text-coffee-medium leading-relaxed mb-6">Get freshly roasted beans or perfectly brewed hot coffee delivered to your home or office within 30 minutes. We ensure temperature and quality are maintained.</p>
                        <button className="text-accent font-bold flex items-center hover:text-coffee-dark transition-colors">
                            Learn More <span className="ml-2">→</span>
                        </button>
                    </div>

                    {/* Service 2 */}
                    <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-coffee-light/10 group">
                        <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center mb-6 text-coffee-dark group-hover:bg-accent group-hover:text-white transition-colors">
                            <Coffee size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-coffee-dark mb-4">Online Ordering</h2>
                        <p className="text-coffee-medium leading-relaxed mb-6">Skip the line. Order your favorite drinks online, customize your brew, and pick it up at your convenience at any of our local branches.</p>
                        <button className="text-accent font-bold flex items-center hover:text-coffee-dark transition-colors">
                            Learn More <span className="ml-2">→</span>
                        </button>
                    </div>

                    {/* Service 3 */}
                    <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-coffee-light/10 group">
                        <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center mb-6 text-coffee-dark group-hover:bg-accent group-hover:text-white transition-colors">
                            <Award size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-coffee-dark mb-4">Fresh Roasted Beans</h2>
                        <p className="text-coffee-medium leading-relaxed mb-6">Subscribe to our monthly bean box. We curate and deliver single-origin and premium blends sourced globally, roasted right before shipping.</p>
                        <button className="text-accent font-bold flex items-center hover:text-coffee-dark transition-colors">
                            Learn More <span className="ml-2">→</span>
                        </button>
                    </div>

                    {/* Service 4 */}
                    <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-coffee-light/10 group">
                        <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center mb-6 text-coffee-dark group-hover:bg-accent group-hover:text-white transition-colors">
                            <Calendar size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-coffee-dark mb-4">Coffee Catering</h2>
                        <p className="text-coffee-medium leading-relaxed mb-6">Elevate your events with our mobile espresso bar. Our professional baristas will craft artisan drinks for your corporate event, wedding, or party.</p>
                        <button className="text-accent font-bold flex items-center hover:text-coffee-dark transition-colors">
                            Learn More <span className="ml-2">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
