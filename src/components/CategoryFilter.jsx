import { categories } from "../data/foodData";

export default function CategoryFilter({ active, onChange }) {
    return (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onChange(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${active === cat
                            ? "bg-cocoa text-cream border-cocoa shadow-lg shadow-cocoa/20"
                            : "bg-white text-mocha border-latte hover:border-ember hover:text-ember-dark"
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}