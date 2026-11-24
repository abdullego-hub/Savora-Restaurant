import { Link } from "react-router-dom";
import { Flame, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-cocoa text-cream/85 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-9 h-9 rounded-full bg-ember flex items-center justify-center text-white">
                            <Flame size={18} />
                        </span>
                        <span className="font-display text-xl font-bold text-cream">Savora</span>
                    </div>
                    <p className="text-sm leading-relaxed text-cream/60">
                        Garissa's favourite kitchen. Fresh ingredients, flame-grilled flavour
                        and delivery straight to your door.
                    </p>
                </div>

                <div>
                    <h3 className="text-cream font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-ember transition-colors">Home</Link></li>
                        <li><Link to="/menu" className="hover:text-ember transition-colors">Menu</Link></li>
                        <li><Link to="/cart" className="hover:text-ember transition-colors">Cart</Link></li>
                        <li><Link to="/profile" className="hover:text-ember transition-colors">My Profile</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-cream font-semibold mb-4">Contact</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin size={16} className="mt-0.5 text-ember shrink-0" />
                            Express Mall, Garissa, Kenya
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone size={16} className="text-ember shrink-0" /> +254 700 123 456
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={16} className="text-ember shrink-0" /> hello@savora.co.ke
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-cream font-semibold mb-4">Opening Hours</h3>
                    <ul className="space-y-2 text-sm text-cream/70">
                        <li className="flex items-center gap-3">
                            <Clock size={16} className="text-ember shrink-0" /> Mon – Fri: 9:00 – 22:00
                        </li>
                        <li className="flex items-center gap-3">
                            <Clock size={16} className="text-ember shrink-0" /> Sat – Sun: 10:00 – 23:00
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-cream/10">
                <p className="max-w-7xl mx-auto px-4 sm:px-6 py-5 text-center text-xs text-cream/50">
                    © 2026 Savora Restaurant. All rights reserved.
                </p>
            </div>
        </footer>
    );
}