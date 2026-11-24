import { Link, useLocation, Navigate } from "react-router-dom";
import { CheckCircle2, Home, UtensilsCrossed } from "lucide-react";

export default function OrderSuccess() {
    const location = useLocation();
    const order = location.state?.order;

    if (!order) return <Navigate to="/" replace />;

    return (
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
            <span className="w-24 h-24 rounded-full bg-green-100 text-green-600 inline-flex items-center justify-center mb-6">
                <CheckCircle2 size={52} />
            </span>
            <h1 className="font-display text-4xl font-bold">Order Placed!</h1>
            <p className="text-mocha/70 mt-3">
                Thank you, {order.customer.name}. Your order is being prepared and will
                arrive soon.
            </p>

            <div className="card p-6 mt-8 text-left">
                <div className="flex flex-wrap justify-between gap-2 border-b border-latte pb-4 mb-4">
                    <div>
                        <p className="text-xs text-mocha/60">Order Number</p>
                        <p className="font-bold text-lg">{order.id}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-mocha/60">Placed On</p>
                        <p className="font-semibold text-sm">{order.date}</p>
                    </div>
                </div>
                <ul className="space-y-2 text-sm">
                    {order.items.map((item) => (
                        <li key={item.id} className="flex justify-between">
                            <span>
                                {item.name} <span className="text-mocha/60">× {item.qty}</span>
                            </span>
                            <span className="font-semibold">
                                KSh {(item.price * item.qty).toLocaleString()}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="border-t border-latte mt-4 pt-3 flex justify-between font-bold">
                    <span>Total Paid (on delivery)</span>
                    <span className="text-ember-dark">KSh {order.total.toLocaleString()}</span>
                </div>
                <p className="text-xs text-mocha/60 mt-3">
                    Delivering to: {order.customer.address} · {order.customer.phone}
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link to="/menu" className="btn-primary">
                    <UtensilsCrossed size={18} /> Order More
                </Link>
                <Link to="/profile" className="btn-outline">
                    View My Orders
                </Link>
                <Link to="/" className="btn-outline">
                    <Home size={18} /> Home
                </Link>
            </div>
        </main>
    );
}