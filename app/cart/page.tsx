"use client";

import { useCart } from "@/app/store/cart";
import Link from "next/link";

export default function CartPage() {
  const cart = useCart((state) => state.cart);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const decreaseQty = useCart((state) => state.decreaseQty);
  const increase = useCart((state) => state.addToCart);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-500">
          Add products to continue shopping
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-2xl font-semibold mb-8">
        Shopping Cart
      </h1>

      <div className="grid md:grid-cols-[1fr_350px] gap-10">

        {/* LEFT */}
        <div className="space-y-6">

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border rounded-lg p-4"
            >

              <img
                src={item.image}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">

                <h3 className="font-medium">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  ₹{item.price}
                </p>

                {/* quantity */}
                <div className="flex items-center gap-3 mt-2">

                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="border px-2"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increase({
                        ...item,
                        quantity: 1,
                      })
                    }
                    className="border px-2"
                  >
                    +
                  </button>

                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm mt-2"
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* RIGHT */}
        <div className="border rounded-lg p-6 h-fit">

          <h2 className="font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="flex justify-between font-semibold text-lg mb-6">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <Link href="/checkout">
            <button className="bg-[#680000] text-white w-full py-3 rounded">
              Checkout
            </button>
          </Link>

        </div>

      </div>

    </main>
  );
}