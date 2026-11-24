import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
    const { updateQty, removeFromCart } = useCart();

    return (
        <div className="flex gap-4 bg-white rounded-2xl border border-latte/70 p-3 sm:p-4 items-center">
            <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0"
            />

            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm sm:text-base truncate">
                    {item.name}
                </h4>
                <p className="text-xs text-mocha/70 mt-0.5">{item.category}</p>
                <p className="text-sm font-bold text-ember-dark mt-1">
                    KSh {item.price.toLocaleString()}
                </p>
            </div>

            <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 bg-sand rounded-full px-1.5 py-1">
                    <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-ember hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                    <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-ember hover:text-white transition-colors"
                        aria-label="Increase quantity"
                    >
                        <Plus size={14} />
                    </button>
                </div>
                <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-500 hover:text-red-700 inline-flex items-center gap-1 font-medium"
                >
                    <Trash2 size={13} /> Remove
                </button>
            </div>
        </div>
    );
}