import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Flame, Menu as MenuIcon, ShoppingCart, User, LogOut, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const { itemCount } = useCart();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setOpen(false);
        navigate("/");
    };

    const linkClass = ({ isActive }) =>
        `block px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive
            ? "bg-cocoa text-cream"
            : "text-mocha hover:bg-sand hover:text-cocoa"
        }`;

    return (
        <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-latte/60">
            <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
                <Link to="/" className="flex items-center gap-2">
                    <span className="w-10 h-10 rounded-full bg-ember flex items-center justify-center text-white shadow-lg shadow-ember/40">
                        <Flame size={20} />
                    </span>
                    <span className="font-display text-2xl font-bold tracking-tight">
                        Savora
                    </span>
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-1">
                    <NavLink to="/" className={linkClass} end>
                        Home
                    </NavLink>
                    <NavLink to="/menu" className={linkClass}>
                        Menu
                    </NavLink>
                    <NavLink to="/cart" className={linkClass}>
                        Cart
                    </NavLink>
                    {user && (
                        <NavLink to="/profile" className={linkClass}>
                            Profile
                        </NavLink>
                    )}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <Link
                        to="/cart"
                        className="relative w-10 h-10 rounded-full bg-white border border-latte flex items-center justify-center hover:border-ember transition-colors"
                        aria-label="Cart"
                    >
                        <ShoppingCart size={18} />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-ember text-white text-[11px] font-bold flex items-center justify-center">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <button onClick={handleLogout} className="btn-outline py-2! px-4! text-sm">
                            <LogOut size={16} /> Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-sm font-medium text-mocha hover:text-ember transition-colors"
                            >
                                Login
                            </Link>
                            <Link to="/register" className="btn-primary py-2! px-5! text-sm">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden w-10 h-10 rounded-full bg-white border border-latte flex items-center justify-center"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? <X size={20} /> : <MenuIcon size={20} />}
                </button>
            </nav>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden border-t border-latte/60 bg-cream px-4 py-3 space-y-1">
                    <NavLink to="/" className={linkClass} end onClick={() => setOpen(false)}>
                        Home
                    </NavLink>
                    <NavLink to="/menu" className={linkClass} onClick={() => setOpen(false)}>
                        Menu
                    </NavLink>
                    <NavLink to="/cart" className={linkClass} onClick={() => setOpen(false)}>
                        Cart {itemCount > 0 && `(${itemCount})`}
                    </NavLink>
                    {user ? (
                        <>
                            <NavLink to="/profile" className={linkClass} onClick={() => setOpen(false)}>
                                <span className="inline-flex items-center gap-2">
                                    <User size={15} /> Profile
                                </span>
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 rounded-full text-sm font-medium text-red-600 hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>
                                Login
                            </NavLink>
                            <NavLink to="/register" className={linkClass} onClick={() => setOpen(false)}>
                                Sign Up
                            </NavLink>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}