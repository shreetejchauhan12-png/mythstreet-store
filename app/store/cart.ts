import { create } from "zustand";

type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];

  addToCart: (item: CartItem) => void;
  decreaseQty: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  fetchCart: () => Promise<void>;
};

export const useCart = create<CartStore>((set) => ({
  cart: [],

  // ➕ ADD
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id);

      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return {
        cart: [...state.cart, { ...item, quantity: 1 }],
      };
    }),

  // ➖ DECREASE
  decreaseQty: (id) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  // ❌ REMOVE
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  // 🧹 CLEAR
  clearCart: () => set({ cart: [] }),

  // 🔥 FETCH FROM BACKEND
  fetchCart: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      const formatted = data.cart.map((item: any) => ({
        id: `${item.product_id}-${item.size}`, // ✅ CRITICAL FIX
        title: `${item.title} (${item.size})`, // optional but better UX
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      }));

      set({ cart: formatted });

    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  },
}));