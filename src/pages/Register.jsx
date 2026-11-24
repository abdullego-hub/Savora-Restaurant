import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flame, UserPlus, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const { register, user } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirm: "",
    });
    const [error, setError] = useState("");

    if (user) {
        navigate("/", { replace: true });
        return null;
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, phone, password, confirm } = form;

        if (!name.trim() || !email.trim() || !phone.trim() || !password || !confirm) {
            setError("All fields are required.");
            return;
        }
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!/^[0-9+\s-]{7,15}$/.test(phone.trim())) {
            setError("Please enter a valid phone number.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }

        const result = register({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            password,
        });

        if (!result.ok) {
            setError(result.message);
            return;
        }

        navigate("/login", { state: { message: result.message } });
    };

    return (
        <main className="max-w-md mx-auto px-4 sm:px-6 py-16">
            <div className="card p-8">
                <div className="text-center mb-8">
                    <span className="w-14 h-14 rounded-full bg-ember inline-flex items-center justify-center text-white shadow-lg shadow-ember/40 mb-4">
                        <Flame size={26} />
                    </span>
                    <h1 className="font-display text-3xl font-bold">Create Account</h1>
                    <p className="text-sm text-mocha/70 mt-1">
                        Join Savora and start ordering in minutes
                    </p>
                </div>

                {error && (
                    <p className="flex items-center gap-2 bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
                        <AlertCircle size={17} /> {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
                            placeholder="Abdullahi Mohamed"
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium block mb-1.5">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="input-field"
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
                            placeholder="+254 700 000 000"
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium block mb-1.5">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Minimum 6 characters"
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm" className="text-sm font-medium block mb-1.5">
                            Confirm Password
                        </label>
                        <input
                            id="confirm"
                            name="confirm"
                            type="password"
                            value={form.confirm}
                            onChange={handleChange}
                            placeholder="Repeat your password"
                            className="input-field"
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                        <UserPlus size={18} /> Create Account
                    </button>
                </form>

                <p className="text-center text-sm text-mocha/70 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-ember-dark hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </main>
    );
}