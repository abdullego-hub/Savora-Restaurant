const categories = [
    "All",
    "Burgers",
    "Pizza",
    "Chicken",
    "Pasta",
    "Seafood",
    "Desserts",
    "Drinks",
];

const foods = [
    {
        id: 1,
        name: "Classic Beef Burger",
        category: "Burgers",
        price: 850,
        description:
            "Juicy flame-grilled beef patty, melted cheddar, lettuce, tomato and our secret house sauce.",
        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        tag: "Bestseller",
    },
    {
        id: 2,
        name: "Double Smash Burger",
        category: "Burgers",
        price: 1150,
        description:
            "Two smashed beef patties, double cheese, caramelised onions and pickles in a toasted brioche bun.",
        image:
            "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        tag: "Bestseller",
    },
    {
        id: 3,
        name: "Cheese Lover's Burger",
        category: "Burgers",
        price: 950,
        description:
            "A three-cheese blend, crispy beef patty, fresh veggies and smoky mayo on a sesame bun.",
        image:
            "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=800&auto=format&fit=crop",
        rating: 4.6,
    },
    {
        id: 4,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 1200,
        description:
            "Wood-fired classic with fresh mozzarella, ripe tomatoes, basil and extra-virgin olive oil.",
        image:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
        rating: 4.7,
    },
    {
        id: 5,
        name: "Pepperoni Blast Pizza",
        category: "Pizza",
        price: 1450,
        description:
            "Loaded with spicy pepperoni, bubbling mozzarella and our signature tomato base.",
        image:
            "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        tag: "Bestseller",
    },
    {
        id: 6,
        name: "BBQ Chicken Pizza",
        category: "Pizza",
        price: 1500,
        description:
            "Smoky BBQ sauce, grilled chicken strips, red onions, coriander and a mozzarella blend.",
        image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
        rating: 4.7,
    },
    {
        id: 7,
        name: "Crispy Fried Chicken (2 pc)",
        category: "Chicken",
        price: 780,
        description:
            "Golden, crunchy on the outside, juicy on the inside — marinated for 24 hours in our spice mix.",
        image:
            "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        tag: "Bestseller",
    },
    {
        id: 8,
        name: "Grilled Chicken Platter",
        category: "Chicken",
        price: 1250,
        description:
            "Herb-grilled chicken breast served with roasted vegetables and a silky pepper sauce.",
        image:
            "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=800&auto=format&fit=crop",
        rating: 4.6,
    },
    {
        id: 9,
        name: "Creamy Alfredo Pasta",
        category: "Pasta",
        price: 1100,
        description:
            "Fettuccine tossed in a rich parmesan cream sauce with garlic butter and cracked black pepper.",
        image:
            "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=800&auto=format&fit=crop",
        rating: 4.7,
    },
    {
        id: 10,
        name: "Tomato Basil Pasta",
        category: "Pasta",
        price: 950,
        description:
            "Spaghetti in a slow-cooked tomato and basil sauce, finished with shaved parmesan.",
        image:
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800&auto=format&fit=crop",
        rating: 4.5,
    },
    {
        id: 11,
        name: "Grilled Salmon",
        category: "Seafood",
        price: 1850,
        description:
            "Norwegian salmon fillet, char-grilled and served with lemon butter and seasonal greens.",
        image:
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        tag: "Chef's Pick",
    },
    {
        id: 12,
        name: "Garlic Butter Shrimp",
        category: "Seafood",
        price: 1600,
        description:
            "Jumbo shrimp sautéed in garlic butter, white wine and fresh parsley. Served with warm bread.",
        image:
            "https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=800&auto=format&fit=crop",
        rating: 4.7,
    },
    {
        id: 13,
        name: "Chocolate Lava Cake",
        category: "Desserts",
        price: 650,
        description:
            "Warm molten chocolate cake with a flowing centre, dusted with cocoa and served with cream.",
        image:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        tag: "Bestseller",
    },
    {
        id: 14,
        name: "Berry Cheesecake",
        category: "Desserts",
        price: 700,
        description:
            "Baked New York-style cheesecake topped with a fresh mixed-berry compote.",
        image:
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop",
        rating: 4.6,
    },
    {
        id: 15,
        name: "Fresh Citrus Cooler",
        category: "Drinks",
        price: 400,
        description:
            "Hand-squeezed lemonade with mint, lime and a touch of honey over crushed ice.",
        image:
            "https://images.unsplash.com/photo-1437418747212-8d9709afab22?q=80&w=800&auto=format&fit=crop",
        rating: 4.5,
    },
    {
        id: 16,
        name: "Barista Cappuccino",
        category: "Drinks",
        price: 350,
        description:
            "Double-shot espresso topped with velvety steamed milk foam and cocoa dust.",
        image:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
        rating: 4.7,
    },
];

export { categories, foods };