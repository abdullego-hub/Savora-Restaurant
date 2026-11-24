import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    LogOut,
    Package,
    Save,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getFromStorage } from "../utils/storage";

export default function Profile() {
    const { user, updateProfile, logout } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: user.name, phone: user.phone });
    const [message, setMessage] = useState({ type: "", text: "" });

    const orders = getFromStorage("savora_orders", []).filter(
        (o) => o.email === user.email
    );

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setMessage({ type: "", text: "" });
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.phone.trim()) {
            setMessage({ type: "error", text: "Name and phone cannot be empty." });
            return;
        }
        if (!/^[0-9+\s-]{7,15}$/.test(form.phone.trim())) {
            setMessage({ type: "error", text: "Please enter a valid phone number." });
            return;
        }
        updateProfile({ name: form.name.trim(), phone: form.phone.trim() });
        setMessage({ type: "success", text: "Profile updated successfully." });
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                    <span className="badge-ember">My Account</span>
                    <h1 className="font-display text-4xl font-bold mt-3">
                        Hello, {user.name.split(" ")[0]}
                    </h1>
                </div>
                <button onClick={handleLogout} className="btn-outline py-2! px-5! text-sm">
                    <LogOut size={16} /> Logout
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Profile details */}
                <section className="card p-6 sm:p-8">
                    <h2 className="font-display text-xl font-bold flex items-center gap-2 mb-6">
                        <User size={20} className="text-ember" /> Profile Details
                    </h2>

                    {message.text && (
                        <p
                            className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 mb-5 ${message.type === "success"
                                    ? "bg-green-50 text-green-700"
                                    : "bg-red-50 text-red-600"
                                }`}
                        >
                            {message.type === "success" ? (
                                <CheckCircle2 size={17} />
                            ) : (
                                <AlertCircle size={17} />
                            )}
                            {message.text}
                        </p>
                    )}

                    <form onSubmit={handleSave} className="space-y-4" noValidate>
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
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1.5">Email</label>
                            <p className="input-field bg-sand/70 flex items-center gap-2 text-mocha">
                                <Mail size={15} /> {user.email}
                            </p>
                            <p className="text-[11px] text-mocha/50 mt-1">
                                Email cannot be changed.
                            </p>
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
                            />
                        </div>
                        <button type="submit" className="btn-primary w-full">
                            <Save size={17} /> Save Changes
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-latte space-y-3 text-sm text-mocha">
                        <p className="flex items-center gap-2">
                            <Mail size={15} className="text-ember" /> {user.email}
                        </p>
                        <p className="flex items-center gap-2">
                            <Phone size={15} className="text-ember" /> {user.phone}
                        </p>
                    </div>
                </section>

                {/* Order history */}
                <section className="lg:col-span-2 card p-6 sm:p-8">
                    <h2 className="font-display text-xl font-bold flex items-center gap-2 mb-6">
                        <Package size={20} className="text-ember" /> Previous Orders
                    </h2>

                    {orders.length === 0 ? (
                        <p className="text-sm text-mocha/60 py-8 text-center">
                            You haven't placed any orders yet. Your order history will appear
                            here.
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {orders.map((order) => (
                                <li
                                    key={order.id}
                                    className="border border-latte rounded-2xl p-4 sm:p-5"
                                >
                                    <div className="flex flex-wrap justify-between gap-2 mb-3">
                                        <div>
                                            <p className="font-bold">{order.id}</p>
                                            <p className="text-xs text-mocha/60">{order.date}</p>
                                        </div>
                                        <span className="self-start bg-ember/10 text-ember-dark text-xs font-semibold px-3 py-1 rounded-full">
                                            {order.status}
                                        </span>
                                    </div>
                                    <ul className="text-sm text-mocha space-y-1">
                                        {order.items.map((item) => (
                                            <li key={item.id}>
                                                {item.name} <span className="text-mocha/50">× {item.qty}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-right font-bold text-ember-dark mt-3">
                                        KSh {order.total.toLocaleString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
}