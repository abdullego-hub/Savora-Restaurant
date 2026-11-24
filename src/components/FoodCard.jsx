import { useState } from "react";
import { Plus, Star, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function FoodCard({ food }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addToCart(food.id);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    return (
        <div className="card overflow-hidden flex flex-col">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={food.image}
                    alt={food.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {food.tag && (
                    <span className="absolute top-3 left-3 bg-gold/95 text-cocoa text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow">
                        {food.tag}
                    </span>
                )}
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold leading-snug">
                        {food.name}
                    </h3>
                    <span className="flex items-center gap-1 text-sm font-semibold text-gold shrink-0">
                        <Star size={14} fill="currentColor" /> {food.rating}
                    </span>
                </div>

                <p className="text-sm text-mocha/80 mt-2 line-clamp-2 flex-1">
                    {food.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-ember-dark">
                        KSh {food.price.toLocaleString()}
                    </span>
                    <button
                        onClick={handleAdd}
                        className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-all ${added
                                ? "bg-green-600 text-white"
                                : "bg-cocoa text-cream hover:bg-ember"
                            }`}
                    >
                        {added ? (
                            <>
                                <Check size={15} /> Added
                            </>
                        ) : (
                            <>
                                <Plus size={15} /> Add to Cart
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}