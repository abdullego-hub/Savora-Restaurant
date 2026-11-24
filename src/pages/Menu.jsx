import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useState } from "react";
import { categories, foods } from "../data/foodData";
import CategoryFilter from "../components/CategoryFilter";
import FoodCard from "../components/FoodCard";

export default function Menu() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState("");

    const rawCategory = searchParams.get("category") || "All";
    const activeCategory = categories.includes(rawCategory) ? rawCategory : "All";

    const filtered = foods.filter((food) => {
        const matchesCategory =
            activeCategory === "All" || food.category === activeCategory;
        const matchesQuery = food.name.toLowerCase().includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
    });

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="text-center mb-8">
                <span className="badge-ember">Our Menu</span>
                <h1 className="font-display text-4xl font-bold mt-3">
                    Explore Our Dishes
                </h1>
                <p className="text-mocha/70 mt-2 text-sm">
                    Hand-crafted with fresh ingredients, priced in Kenyan Shillings.
                </p>
            </div>

            <div className="max-w-md mx-auto mb-8 relative">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-mocha/50"
                />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a dish..."
                    className="input-field pl-11!"
                />
            </div>

            <CategoryFilter
                active={activeCategory}
                onChange={(cat) => setSearchParams(cat === "All" ? {} : { category: cat })}
            />

            {filtered.length === 0 ? (
                <p className="text-center text-mocha/60 mt-14">
                    No dishes match your search. Try a different keyword or category.
                </p>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                    {filtered.map((food) => (
                        <FoodCard key={food.id} food={food} />
                    ))}
                </div>
            )}
        </main>
    );
}