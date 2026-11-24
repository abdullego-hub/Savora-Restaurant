import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, AlertCircle, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getFromStorage, saveToStorage } from "../utils/storage";

const DELIVERY_FEE = 150;
const FREE_DELIVERY_MIN = 2000;

export default function Checkout() {
    const { detailedCart, subtotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        address: "",
    });
    const [error, setError] = useState("");
    const [placing, setPlacing] = useState(false);

    const deliveryFee =
        subtotal >= FREE_DELIVERY_MIN || subtotal === 0 ? 0 : DELIVERY_FEE;
    const total = subtotal + deliveryFee;

    if (detailedCart.length === 0) {
        return (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
                <span className="w-20 h-20 rounded-full bg-sand inline-flex items-center justify-center text-mocha">
                    <ShoppingBag size={36} />
                </span>
                <h1 className="font-display text-3xl font-bold mt-6">
                    Nothing to check out
                </h1>
                <p className="text-mocha/70 mt-2 text-sm">
                    Your cart is empty — add some dishes first.
                </p>
                <Link to="/menu" className="btn-primary mt-8">
                    Back to Menu
                </Link>
            </main>
        );
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
            setError("Please fill in your name, phone number and delivery address.");
            return;
        }
        if (!/^[0-9+\s-]{7,15}$/.test(form.phone.trim())) {
            setError("Please enter a valid phone number.");
            return;
        }

        setPlacing(true);

        const order = {
            id: "SV-" + Date.now().toString().slice(-8),
            email: user.email,
            customer: {
                name: form.name.trim(),
                phone: form.phone.trim(),
                address: form.address.trim(),
            },
            items: detailedCart.map(({ id, name, price, qty, image }) => ({
                id,
                name,
                price,
                qty,
                image,
            })),
            subtotal,
            deliveryFee,
            total,
            date: new Date().toLocaleString("en-KE", {
                dateStyle: "medium",
                timeStyle: "short",
            }),
            status: "Preparing",
        };

        const orders = getFromStorage("savora_orders", []);
        saveToStorage("savora_orders", [order, ...orders]);

        clearCart();
        navigate("/order-success", { state: { order } });
    };

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
            <Link
                to="/cart"
                className="inline-flex items-center gap-2 text-sm font-semibold text-mocha hover:text-ember-dark transition-colors"
            >
                <ArrowLeft size={16} /> Back to cart
            </Link>

            <h1 className="font-display text-4xl font-bold mt-4 mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-5 gap-8 items-start">
                <form onSubmit={handleSubmit} className="lg:col-span-3 card p-6 sm:p-8 space-y-5" noValidate>
                    <h2 className="font-display text-xl font-bold flex items-center gap-2">
                        <MapPin size={20} className="text-ember" /> Delivery Details
                    </h2>

                    {error && (
                        <p className="flex items-center gap-2 bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3">
                            <AlertCircle size={17} /> {error}
                        </p>
                    )}

                    <div>
                        <label htmlFor="name" className="text-sm font-medium block mb-1.5">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="text-sm font-medium block mb-1.5">
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="+254 700 000 000"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="text-sm font-medium block mb-1.5">
                            Delivery Address
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            rows="3"
                            value={form.address}
                            onChange={handleChange}
                            className="input-field resize-none"
                            placeholder="Estate / street, building, house number, city..."
                        />
                    </div>

                    <button type="submit" disabled={placing} className="btn-primary w-full">
                        {placing ? "Placing Order..." : 'Place Order — KSh ' + total.toLocaleString()}
                    </button>
                    <p className="text-center text-xs text-mocha/60">
                        Demo checkout — no real payment is processed.
                    </p>
                </form>

                <aside className="lg:col-span-2 card p-6 lg:sticky lg:top-24">
                    <h2 className="font-display text-xl font-bold mb-4">Order Summary</h2>
                    <ul className="space-y-3 max-h-72 overflow-y-auto pr-1">
                        {detailedCart.map((item) => (
                            <li key={item.id} className="flex items-center gap-3">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate">{item.name}</p>
                                    <p className="text-xs text-mocha/60">Qty {item.qty}</p>
                                </div>
                                <span className="text-sm font-bold shrink-0">
                                    KSh {(item.price * item.qty).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t border-latte mt-4 pt-4 space-y-2 text-sm">
                        <div className="flex justify-between text-mocha">
                            <span>Subtotal</span>
                            <span>KSh {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-mocha">
                            <span>Delivery fee</span>
                            <span>
                                {deliveryFee === 0 ? (
                                    <span className="text-green-600 font-semibold">FREE</span>
                                ) : (
                                    'KSh ' + deliveryFee.toLocaleString()
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between font-bold text-base pt-2">
                            <span>Total</span>
                            <span className="text-ember-dark">KSh {total.toLocaleString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}