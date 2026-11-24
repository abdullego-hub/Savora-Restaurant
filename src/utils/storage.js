const getFromStorage = (key, fallback = null) => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
};

const saveToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const removeFromStorage = (key) => {
    localStorage.removeItem(key);
};

export { getFromStorage, saveToStorage, removeFromStorage };