"use client";

import Link from "next/link";
import { useCart } from "@/app/store/cart";

import {
  ShoppingBag,
  X,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  cart: any[];
  subtotal: number;
  addToCart: any;
  decrease: any;
  removeFromCart: any;
};

export default function CartDrawer({
  open,
  onClose,
  cart,
  subtotal,
  addToCart,
  decrease,
  removeFromCart,
}: Props) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* PANEL */}
      <div className="
absolute right-0 top-0
h-full w-[92%] md:w-96

bg-white/95
backdrop-blur-xl

p-6
shadow-[0_0_40px_rgba(0,0,0,0.12)]

overflow-y-auto
">

        <div className="flex justify-between mb-6">

          <h2 className="font-semibold text-lg">
            Your Cart
          </h2>

          <X
            className="cursor-pointer p-1"
            onClick={onClose}
          />

        </div>

        {cart.length === 0 ? (

          <div className="
h-[65vh]
flex flex-col
items-center
justify-center
text-center
px-6
">

            <ShoppingBag className="
w-16 h-16
text-gray-300
mb-5
" />

            <h3 className="
text-2xl
font-semibold
mb-2
">
              Your cart feels lonely
            </h3>

            <p className="
text-gray-500
text-sm
leading-6
max-w-xs
mb-6
">
              Add your favorite anime and streetwear drops to continue shopping.
            </p>

            <button
              onClick={() => {
                onClose();
                window.location.href =
                  "/shop/all/all";
              }}
              className="
bg-[#680000]
text-white
px-6 py-3
rounded-lg
text-sm
tracking-wide
hover:opacity-90
transition
"
            >
              START SHOPPING
            </button>

          </div>

        ) : (

          <>
            {cart.map((item, index) => (

              <div
                key={`${item.id}-${index}`}
                className="
flex gap-3
border-b
pb-4
mb-4
"
              >

                <Link
                  href={`/product/${item.id.split("-")[0]}`}
                  onClick={onClose}
                >

                  <img
                    src={item.image}
                    className="
w-16 h-20
object-cover
cursor-pointer
"
                  />

                </Link>

                <div className="flex-1">

                  <Link
                    href={`/product/${item.id.split("-")[0]}`}
                    onClick={onClose}
                  >

                    <p className="
text-sm
font-medium
cursor-pointer
hover:underline
">
                      {item.title}
                    </p>

                  </Link>

                  <p className="
text-sm
text-gray-500
">
                    ₹{item.price}
                  </p>

                  <div className="
flex items-center
gap-3
mt-3
">

                    <button
                      onClick={() =>
                        decrease(item.id)
                      }
                      className="
w-8 h-8
rounded-full
border
flex items-center justify-center
hover:bg-black
hover:text-white
transition-all duration-300
"
                    >
                      -
                    </button>

                    <span className="
text-sm
font-medium
min-w-[16px]
text-center
">
                      {item.quantity}
                    </span>

                    <button
                      onClick={async () => {
  const token = localStorage.getItem("token");

  if (!token) return;

  const [product_id, sizeRaw] =
    item.id.split("-");

  const size =
    sizeRaw === "nosize"
      ? null
      : sizeRaw;

  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/cart`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: Number(product_id),
        size,
        title: item.title,
        price: item.price,
        image: item.image,
      }),
    }
  );

  await useCart.getState().fetchCart();
}}
                      className="
w-8 h-8
rounded-full
border
flex items-center justify-center
hover:bg-black
hover:text-white
transition-all duration-300
"
                    >
                      +
                    </button>

                  </div>

                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="
text-xs
text-red-500
"
                >
                  Remove
                </button>

              </div>

            ))}

            <div className="
border-t
pt-4
">

              <div className="
flex justify-between
mb-4
">

                <span>
                  Subtotal
                </span>

                <span>
                  ₹{subtotal}
                </span>

              </div>

              <Link
                href="/checkout"
                onClick={onClose}
              >

                <button className="
w-full
bg-black
hover:bg-[#680000]
text-white
py-3
rounded-xl
tracking-[0.2em]
text-sm
font-semibold
transition-all duration-300
">

                  CHECKOUT

                </button>

              </Link>

            </div>

          </>

        )}

      </div>

    </div>
  );
}