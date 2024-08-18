import create from 'zustand';

export interface CartItemType {
    cart_item: {
        id: string
        productId: string;
        quantity: number;
        userId: string;
    };
    product: {
        category: string;
        description: string;
        id: string;
        imageUrl: string;
        name: string;
        price: string;
        stock: number;
    };
}

interface CartStore {
    items: CartItemType[];
    isLoading: boolean;
    error: string | null;
    fetchCart: () => Promise<void>;
    addToCart: (productId: string, quantity: number) => Promise<void>;
    removeFromCart: (cartItemId: string) => Promise<void>;
    updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
    getTotalUniqueItems: () => number;
}

const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    isLoading: false,
    error: null,
    fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/cart');
            if (!response.ok) throw new Error('Failed to fetch cart');
            const data = await response.json();
            set({ items: data, isLoading: false });
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },
    addToCart: async (productId, quantity) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, quantity }),
            });
            if (!response.ok) throw new Error('Failed to add item to cart');
            const newItem = await response.json();
            set((state) => ({ items: [...state.items, newItem], isLoading: false }));
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },
    removeFromCart: async (cartItemId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`/api/cart/${cartItemId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to remove item from cart');
            set((state) => ({
                items: state.items.filter(item => item.cart_item.id !== cartItemId),
                isLoading: false
            }));
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },
    updateQuantity: async (cartItemId, quantity) => {
        set((state) => ({
            items: state.items.map(item =>
                item.cart_item.id === cartItemId ? { ...item, cart_item: { ...item.cart_item, quantity } } : item
            )
        }));
        try {
            const response = await fetch(`/api/cart/${cartItemId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity }),
            });
            if (!response.ok) throw new Error('Failed to update item quantity');
            const updatedItem = await response.json();
            set((state) => ({
                items: state.items.map(item =>
                    item.cart_item.id === updatedItem.id ? {
                        ...item,
                        cart_item: {
                            ...item.cart_item,
                            ...updatedItem,
                        }
                    } : item
                ),
            }));
        } catch (error) {
            set((state) => ({
                error: (error as Error).message,
                items: state.items.map(item =>
                    item.cart_item.id === cartItemId ? { ...item, cart_item: { ...item.cart_item, quantity: item.cart_item.quantity } } : item
                )
            }));
        }
    },
    getTotalUniqueItems: () => get().items.length,
}));

export default useCartStore;