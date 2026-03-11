import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
        }, 1000);
    };

    return (
        <div className="bg-cream min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-coffee-dark mb-4">Get in Touch</h1>
                    <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                    <p className="text-xl text-coffee-medium max-w-2xl mx-auto">Have questions about our beans, need help with an order, or want to say hi? We'd love to hear from you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-coffee-light/20">

                    {/* Contact Info */}
                    <div className="bg-coffee-dark text-cream p-12 flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-bold mb-8 text-accent">Contact Information</h2>
                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <MapPin className="text-accent mt-1 mr-4 flex-shrink-0" size={24} />
                                    <div>
                                        <h3 className="font-semibold text-lg">Our Location</h3>
                                        <p className="text-gray-300 mt-1">123 Coffee Street<br />Bean Town, NY 10001<br />United States</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Phone className="text-accent mt-1 mr-4 flex-shrink-0" size={24} />
                                    <div>
                                        <h3 className="font-semibold text-lg">Phone Number</h3>
                                        <p className="text-gray-300 mt-1">(555) 123-4567<br />(555) 987-6543</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Mail className="text-accent mt-1 mr-4 flex-shrink-0" size={24} />
                                    <div>
                                        <h3 className="font-semibold text-lg">Email Address</h3>
                                        <p className="text-gray-300 mt-1">hello@coffeehouse.com<br />support@coffeehouse.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Clock className="text-accent mt-1 mr-4 flex-shrink-0" size={24} />
                                    <div>
                                        <h3 className="font-semibold text-lg">Business Hours</h3>
                                        <p className="text-gray-300 mt-1">Monday - Friday: 7am - 8pm<br />Saturday - Sunday: 8am - 9pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="p-12">
                        <h2 className="text-3xl font-bold text-coffee-dark mb-8">Send us a Message</h2>

                        {submitted ? (
                            <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center">
                                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                                <p>Thank you for reaching out. We will get back to you within 24 hours.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 bg-coffee-dark text-cream px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all font-semibold"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-coffee-dark mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all bg-gray-50 text-coffee-dark"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-coffee-dark mb-2">Your Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all bg-gray-50 text-coffee-dark"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-coffee-dark mb-2">Message</label>
                                    <textarea
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all bg-gray-50 text-coffee-dark resize-none h-32"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-accent text-coffee-dark py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-md transform hover:-translate-y-1"
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
