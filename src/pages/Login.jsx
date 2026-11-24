import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Flame, LogIn, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(location.state?.message || "");

    // Already logged in? Go straight home.
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

        if (!form.email.trim() || !form.password) {
            setError("Please fill in both email and password.");
            return;
        }

        const result = login(form.email.trim(), form.password);
        if (!result.ok) {
            setError(result.message);
            return;
        }

        // Send them back to where they were headed (e.g. /checkout) if possible.
        const from = location.state?.from || "/";
        navigate(from, { replace: true });
    };

    return (
        <main className="max-w-md mx-auto px-4 sm:px-6 py-16">
            <div className="card p-8">
                <div className="text-center mb-8">
                    <span className="w-14 h-14 rounded-full bg-ember inline-flex items-center justify-center text-white shadow-lg shadow-ember/40 mb-4">
                        <Flame size={26} />
                    </span>
                    <h1 className="font-display text-3xl font-bold">Welcome Back</h1>
                    <p className="text-sm text-mocha/70 mt-1">
                        Log in to order your favourite meals
                    </p>
                </div>

                {success && (
                    <p className="flex items-center gap-2 bg-green-50 text-green-700 text-sm rounded-xl px-4 py-3 mb-5">
                        <CheckCircle2 size={17} /> {success}
                    </p>
                )}
                {error && (
                    <p className="flex items-center gap-2 bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
                        <AlertCircle size={17} /> {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
                        <label htmlFor="password" className="text-sm font-medium block mb-1.5">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Your password"
                            className="input-field"
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                        <LogIn size={18} /> Login
                    </button>
                </form>

                <p className="text-center text-sm text-mocha/70 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-ember-dark hover:underline"
                    >
                        Create one here
                    </Link>
                </p>
            </div>
        </main>
    );
}