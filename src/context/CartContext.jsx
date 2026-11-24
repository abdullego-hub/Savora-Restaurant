import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";
import { foods } from "../data/foodData";

const CartContext = createContext(null);

// The cart is stored as [{ id, qty }] in Local Storage under "savora_cart".
export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => getFromStorage("savora_cart", []));

    // Keep Local Storage in sync whenever the cart changes.
    useEffect(() => {
        saveToStorage("savora_cart", cart);
    }, [cart]);

    const addToCart = (id, qty = 1) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === id);
            if (existing) {
                return prev.map((item) =>
                    item.id === id ? { ...item, qty: item.qty + qty } : item
                );
            }
            return [...prev, { id, qty }];
        });
    };

    const updateQty = (id, qty) => {
        if (qty <= 0) return removeFromCart(id);
        setCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, qty } : item))
        );
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => setCart([]);

    // Join cart entries with the full food data so components get name/image/price.
    const detailedCart = useMemo(
        () =>
            cart
                .map((item) => ({
                    ...foods.find((f) => f.id === item.id),
                    qty: item.qty,
                }))
                .filter((item) => item.id !== undefined),
        [cart]
    );

    const subtotal = detailedCart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );
    const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                detailedCart,
                addToCart,
                updateQty,
                removeFromCart,
                clearCart,
                subtotal,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}