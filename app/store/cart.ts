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

  // 🆕 NEW
  fetchCart: () => Promise<void>;
};

export const useCart = create<CartStore>((set) => ({
  cart: [],

  addToCart: (item) =>
    set((state) => {
      let updatedCart;

      const existing = state.cart.find((i) => i.id === item.id);

      if (existing) {
        updatedCart = state.cart.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        updatedCart = [...state.cart, { ...item, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return { cart: updatedCart };
    }),

  decreaseQty: (id) =>
    set((state) => {
      const updatedCart = state.cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return { cart: updatedCart };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== id);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return { cart: updatedCart };
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: [] });
  },

  // 🆕 FETCH CART FROM BACKEND
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
        id: `${item.product_id}`,
        title: item.title,
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