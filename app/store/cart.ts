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
  decreaseQty: (id: string) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => void;

  fetchCart: () => Promise<void>;
};

export const useCart = create<CartStore>((set) => ({
  cart: [],

  // ➕ ADD (UI only, backend handled elsewhere)
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

  // ➖ DECREASE (SYNC WITH BACKEND)
  decreaseQty: async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const [product_id, sizeRaw] = id.split("-");
const size = sizeRaw === "nosize" ? null : sizeRaw;

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/cart/decrease`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: Number(product_id),
            size: size,
          }),
        }
      );

      // 🔄 refresh cart
      const fetchCart = useCart.getState().fetchCart;
      await fetchCart();

    } catch (error) {
      console.error("DECREASE ERROR:", error);
    }
  },

  // ❌ REMOVE (SYNC WITH BACKEND)
  removeFromCart: async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const [product_id, size] = id.split("-");

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/cart`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: Number(product_id),
            size: size,
          }),
        }
      );

      // 🔄 refresh cart
      const fetchCart = useCart.getState().fetchCart;
      await fetchCart();

    } catch (error) {
      console.error("REMOVE ERROR:", error);
    }
  },

  // 🧹 CLEAR (ONLY FRONTEND)
  clearCart: () => set({ cart: [] }),

  // 🔥 FETCH FROM BACKEND
  fetchCart: async () => {

  try {

    const token = localStorage.getItem("token");

    if (!token) {

      set({ cart: [] });

      return;

    }

    const res = await fetch(

      `${process.env.NEXT_PUBLIC_API_URL}/api/products/cart`,

      {

        headers: {

          Authorization: `Bearer ${token}`,

        },

      }

    );

    const data = await res.json();

console.log("STATUS:", res.status);
console.log("CART RESPONSE:", data);

    if (!res.ok || !data.success) {

      console.error("CART API:", data);

      set({ cart: [] });

      return;

    }

    const formatted = (data.cart || []).map((item: any) => ({

      id: `${item.product_id}-${item.size ?? "nosize"}`,

      title: item.size
        ? `${item.title} (${item.size})`
        : item.title,

      price: item.price,

      image: item.image,

      quantity: item.quantity,

    }));

    set({

      cart: formatted,

    });

  } catch (error) {

    console.error(

      "Fetch cart error:",

      error

    );

    set({

      cart: [],

    });

  }

},
}));