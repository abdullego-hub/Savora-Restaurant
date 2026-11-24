import { Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

const DELIVERY_FEE = 150;
const FREE_DELIVERY_MIN = 2000;

export default function Cart() {
    const { detailedCart, subtotal } = useCart();

    const deliveryFee = subtotal >= FREE_DELIVERY_MIN || subtotal === 0 ? 0 : DELIVERY_FEE;
    const total = subtotal + deliveryFee;

    if (detailedCart.length === 0) {
        return (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
                <span className="w-20 h-20 rounded-full bg-sand inline-flex items-center justify-center text-mocha">
                    <ShoppingBag size={36} />
                </span>
                <h1 className="font-display text-3xl font-bold mt-6">
                    Your cart is empty
                </h1>
                <p className="text-mocha/70 mt-2 text-sm">
                    Browse the menu and add some delicious dishes to get started.
                </p>
                <Link to="/menu" className="btn-primary mt-8">
                    Explore Menu <ArrowRight size={18} />
                </Link>
            </main>
        );
    }

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
            <h1 className="font-display text-4xl font-bold mb-8">Your Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-4">
                    {detailedCart.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                    <Link
                        to="/menu"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-mocha hover:text-ember-dark transition-colors"
                    >
                        <ArrowLeft size={16} /> Continue shopping
                    </Link>
                </div>

                <aside className="card p-6 lg:sticky lg:top-24">
                    <h2 className="font-display text-xl font-bold mb-5">Order Summary</h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-mocha">
                            <span>Subtotal ({detailedCart.reduce((s, i) => s + i.qty, 0)} items)</span>
                            <span className="font-semibold text-cocoa">
                                KSh {subtotal.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between text-mocha">
                            <span>Delivery fee</span>
                            <span className="font-semibold text-cocoa">
                                {deliveryFee === 0 ? (
                                    <span className="text-green-600">FREE</span>
                                ) : (
                                    'KSh ' + deliveryFee.toLocaleString()
                                )}
                            </span>
                        </div>
                        {deliveryFee > 0 && (
                            <p className="text-xs text-ember-dark bg-ember/10 rounded-lg px-3 py-2">
                                Add KSh {(FREE_DELIVERY_MIN - subtotal).toLocaleString()} more for
                                free delivery.
                            </p>
                        )}
                        <div className="border-t border-latte pt-3 flex justify-between font-bold text-base">
                            <span>Total</span>
                            <span className="text-ember-dark">KSh {total.toLocaleString()}</span>
                        </div>
                    </div>
                    <Link to="/checkout" className="btn-primary w-full mt-6">
                        Proceed to Checkout <ArrowRight size={18} />
                    </Link>
                </aside>
            </div>
        </main>
    );
}