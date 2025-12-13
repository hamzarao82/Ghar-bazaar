import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Apple, PlayCircle, ArrowRight, Send } from 'lucide-react';

const Footer = () => {
    const footerLinks = {
        about: [
            { label: 'About Us', href: '/about' },
            { label: 'Careers', href: '/careers' },
            { label: 'Press & Media', href: '/press' },
            { label: 'Blog', href: '/blog' },
            { label: 'Investor Relations', href: '/investors' },
        ],
        partnership: [
            { label: 'Become a Supplier', href: '/sell' },
            { label: 'Affiliate Program', href: '/affiliate' },
            { label: 'Advertise with Us', href: '/advertise' },
            { label: 'Business Solutions', href: '/business' },
        ],
        support: [
            { label: 'Help Center', href: '/help' },
            { label: 'Money Refund', href: '/refund' },
            { label: 'Shipping Info', href: '/shipping' },
            { label: 'Returns Policy', href: '/returns' },
            { label: 'Contact Us', href: '/contact' },
        ],
        account: [
            { label: 'Login', href: '/login' },
            { label: 'Register', href: '/register' },
            { label: 'My Orders', href: '/orders' },
            { label: 'Wishlist', href: '/wishlist' },
            { label: 'Track Order', href: '/track-order' },
        ],
    };

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-blue-600' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-sky-500' },
        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-pink-600' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-blue-700' },
        { icon: Youtube, href: 'https://youtube.com', label: 'YouTube', color: 'hover:bg-red-600' },
    ];

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">

                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <span className="text-white font-bold text-2xl">G</span>
                            </div>
                            <span className="text-2xl font-bold">Ghar Bazaar</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                            Your trusted B2B marketplace connecting buyers with verified suppliers worldwide. Quality products, competitive prices, secure transactions.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            <a href="tel:+1234567890" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                                <Phone className="w-4 h-4" />
                                <span>+1 (234) 567-890</span>
                            </a>
                            <a href="mailto:support@gharbazaar.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                                <Mail className="w-4 h-4" />
                                <span>support@gharbazaar.com</span>
                            </a>
                            <div className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>123 Commerce Street, Business District, NY 10001</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white ${social.color} transition-all duration-300`}
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">About</h4>
                        <ul className="space-y-3">
                            {footerLinks.about.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-1 group"
                                    >
                                        <span>{link.label}</span>
                                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Partnership</h4>
                        <ul className="space-y-3">
                            {footerLinks.partnership.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-1 group"
                                    >
                                        <span>{link.label}</span>
                                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Support</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-1 group"
                                    >
                                        <span>{link.label}</span>
                                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Account</h4>
                        <ul className="space-y-3">
                            {footerLinks.account.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-1 group"
                                    >
                                        <span>{link.label}</span>
                                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* App Downloads */}
                        <div className="mt-6 space-y-2">
                            <p className="text-sm font-medium text-white mb-3">Get the App</p>
                            <a href="#" className="flex items-center gap-3 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                                <Apple className="w-6 h-6" />
                                <div>
                                    <p className="text-[10px] text-gray-400">Download on</p>
                                    <p className="text-sm font-medium">App Store</p>
                                </div>
                            </a>
                            <a href="#" className="flex items-center gap-3 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                                <PlayCircle className="w-6 h-6" />
                                <div>
                                    <p className="text-[10px] text-gray-400">GET IT ON</p>
                                    <p className="text-sm font-medium">Google Play</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-400 text-center md:text-left">
                            © {new Date().getFullYear()} Ghar Bazaar. All rights reserved.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                        </div>

                        {/* Payment Methods */}
                        <div className="flex items-center gap-2">
                            {['💳', '🏦', '📱', '🔒'].map((icon, idx) => (
                                <div
                                    key={idx}
                                    className="w-10 h-7 bg-gray-800 rounded flex items-center justify-center text-lg"
                                >
                                    {icon}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
