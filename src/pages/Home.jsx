import { Link } from "react-router-dom";
import { ArrowRight, Star, Quote, Clock, Bike, Award } from "lucide-react";
import { foods } from "../data/foodData";
import FoodCard from "../components/FoodCard";

const categoryImages = {
    Burgers:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop",
    Pizza:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop",
    Chicken:
        "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop",
    Pasta:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=400&auto=format&fit=crop",
    Seafood:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=400&auto=format&fit=crop",
    Desserts:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop",
    Drinks:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400&auto=format&fit=crop",
};

const testimonials = [
    {
        name: "Abdirahman Dekow",
        role: "Regular Customer",
        text: "The double smash burger is hands-down the best in Nairobi. Delivery is always fast and the food arrives hot.",
        color: "bg-ember",
    },
    {
        name: "Najma Ahmed",
        role: "Food Blogger",
        text: "Savora's grilled salmon rivals five-star hotel kitchens. Beautiful packaging and generous portions too.",
        color: "bg-gold",
    },
    {
        name: "Adesh Fx.",
        role: "Weekend Loyalist",
        text: "Ordered for a family dinner — everything from the pizza to the lava cake was perfect. Highly recommended!",
        color: "bg-cocoa",
    },
];

export default function Home() {
    const featured = foods.filter((f) => f.tag).slice(0, 4);

    return (
        <main>
            {/* ---------- Hero ---------- */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 grid lg:grid-cols-2 gap-10 items-center">
                <div>
                    <span className="badge-ember mb-5">
                        <Star size={12} fill="currentColor" /> Rated 4.9 by 2,000+ foodies
                    </span>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                        Taste the Magic of{" "}
                        <span className="text-ember">Fresh, Flame-Grilled</span> Goodness
                    </h1>
                    <p className="text-mocha/80 text-lg mt-5 max-w-lg leading-relaxed">
                        From sizzling burgers to wood-fired pizza — Savora brings the finest
                        flavours of Garissa straight to your doorstep, hot and fresh.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8">
                        <Link to="/menu" className="btn-primary">
                            Explore Menu <ArrowRight size={18} />
                        </Link>
                        <Link to="/menu" className="btn-outline">
                            Order Now
                        </Link>
                    </div>

                    <div className="flex flex-wrap gap-8 mt-10">
                        <div className="flex items-center gap-3">
                            <span className="w-11 h-11 rounded-2xl bg-sand flex items-center justify-center text-ember">
                                <Clock size={20} />
                            </span>
                            <div>
                                <p className="font-bold text-sm">30 min</p>
                                <p className="text-xs text-mocha/70">Average delivery</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-11 h-11 rounded-2xl bg-sand flex items-center justify-center text-ember">
                                <Award size={20} />
                            </span>
                            <div>
                                <p className="font-bold text-sm">16+ dishes</p>
                                <p className="text-xs text-mocha/70">Chef-crafted menu</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-11 h-11 rounded-2xl bg-sand flex items-center justify-center text-ember">
                                <Bike size={20} />
                            </span>
                            <div>
                                <p className="font-bold text-sm">Citywide</p>
                                <p className="text-xs text-mocha/70">Free delivery over KSh 2,000</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-4 bg-linear-to-tr from-ember/20 to-gold/20 rounded-[2.5rem] rotate-3" />
                    <img
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop"
                        alt="A spread of delicious Savora dishes"
                        className="relative rounded-[2.5rem] w-full h-80 sm:h-105 object-cover shadow-2xl shadow-cocoa/25"
                    />
                    <div className="absolute -bottom-5 -left-4 sm:left-6 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                            <Clock size={18} />
                        </span>
                        <div>
                            <p className="text-xs text-mocha/70">Order arrives in</p>
                            <p className="font-bold text-sm">25 – 35 minutes</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------- Categories ---------- */}
            <section className="bg-sand/60 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10">
                        <span className="badge-ember">Popular Categories</span>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3">
                            Craving Something?
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                        {Object.entries(categoryImages).map(([name, img]) => (
                            <Link
                                key={name}
                                to={'/menu?category=' + name}
                                className="group bg-white rounded-2xl p-3 text-center card"
                            >
                                <img
                                    src={img}
                                    alt={name}
                                    loading="lazy"
                                    className="w-full h-20 sm:h-24 rounded-xl object-cover mb-3 transition-transform duration-500 group-hover:scale-105"
                                />
                                <p className="text-sm font-semibold group-hover:text-ember-dark transition-colors">
                                    {name}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- Featured dishes ---------- */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="badge-ember">Featured Dishes</span>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3">
                            Our Customers' Favourites
                        </h2>
                    </div>
                    <Link
                        to="/menu"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-ember-dark hover:gap-3 transition-all"
                    >
                        View full menu <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featured.map((food) => (
                        <FoodCard key={food.id} food={food} />
                    ))}
                </div>
            </section>

            {/* ---------- Special offers ---------- */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 grid md:grid-cols-2 gap-6">
                <div className="relative overflow-hidden rounded-3xl bg-ember text-white p-8 sm:p-10">
                    <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10" />
                    <div className="absolute -right-2 bottom-0 w-24 h-24 rounded-full bg-white/10" />
                    <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                        New Customers
                    </span>
                    <h3 className="font-display text-3xl font-bold mt-4">
                        20% Off Your First Order
                    </h3>
                    <p className="text-white/85 mt-2 text-sm max-w-sm">
                        Use code <span className="font-bold">SAVORA20</span> at checkout and
                        taste the difference today.
                    </p>
                    <Link to="/register" className="btn-light mt-6 text-sm">
                        Claim Offer <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="relative overflow-hidden rounded-3xl bg-cocoa text-cream p-8 sm:p-10">
                    <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-ember/20" />
                    <span className="text-xs font-bold uppercase tracking-widest bg-gold/25 text-gold px-3 py-1 rounded-full">
                        Every Friday
                    </span>
                    <h3 className="font-display text-3xl font-bold mt-4">
                        Free Delivery Friday
                    </h3>
                    <p className="text-cream/70 mt-2 text-sm max-w-sm">
                        Zero delivery fees on all orders every Friday. No minimum spend.
                    </p>
                    <Link to="/menu" className="btn-light mt-6 text-sm">
                        Order Now <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            {/* ---------- Testimonials ---------- */}
            <section className="bg-sand/60 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10">
                        <span className="badge-ember">Testimonials</span>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3">
                            What Our Customers Say
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t) => (
                            <figure key={t.name} className="card p-7">
                                <Quote size={28} className="text-ember/40" />
                                <blockquote className="text-sm text-mocha leading-relaxed mt-3">
                                    "{t.text}"
                                </blockquote>
                                <figcaption className="flex items-center gap-3 mt-5">
                                    <span
                                        className={'w-11 h-11 rounded-full ' + t.color + ' text-white flex items-center justify-center font-bold text-sm'}
                                    >
                                        {t.name.charAt(0)}
                                    </span>
                                    <div>
                                        <p className="font-semibold text-sm">{t.name}</p>
                                        <p className="text-xs text-mocha/60">{t.role}</p>
                                    </div>
                                    <span className="ml-auto flex gap-0.5 text-gold">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={13} fill="currentColor" />
                                        ))}
                                    </span>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}