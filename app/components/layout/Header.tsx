"use client";

import { getProducts } from "@/app/data/products";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Heart,
  ShoppingBag,
  User,
  X,
  Search
} from "lucide-react";

import MobileMenu from "./MobileMenu";
import { useCart } from "@/app/store/cart";
import { useWishlist } from "@/app/store/wishlist";
import { usePathname } from "next/navigation";

export default function Header() {
  const [products, setProducts] = useState<any[]>([]);
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hover, setHover] = useState<"men" | "women" | null>(null);

  // account
  const [accountOpen, setAccountOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const [user, setUser] = useState<any>(null);
  const startLogin = () => {
  if (!window.initSendOTP) {
    alert("OTP service not loaded. Refresh page.");
    return;
  }

  window.initSendOTP({
    widgetId: "3664756c466b393432373031",
    tokenAuth: "510536Txv5S33tx69e77c1eP1",

    success: async function (data: any) {
      console.log("MSG91 FULL RESPONSE:", JSON.stringify(data, null, 2));

      // 🔥 VERIFY WITH BACKEND
      const res = await fetch(
        
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-msg91`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: data.token || data.message }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.error);
        return;
      }

      // ✅ SAVE USER
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);

      setUser(result.user);
      setAuthOpen(false);
    },

    failure: function (err: any) {
      console.log("❌ OTP ERROR:", err);
      alert("OTP failed");
    },
  });
};
  // search
  const [search, setSearch] = useState("");
  const filtered = products.filter((p: any) =>
  p.title.toLowerCase().includes(search.toLowerCase())
);

  useEffect(() => {
  getProducts().then(setProducts);

  const script = document.createElement("script");
  script.src = "https://verify.msg91.com/otp-provider.js";
  script.async = true;

  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);

  const logout = () => {
    localStorage.removeItem("myth_user");
    setUser(null);
    setAccountOpen(false);
  };

  const cart = useCart((state) => state.cart);
  const addToCart = useCart((state) => state.addToCart);
  const decrease = useCart((state) => state.decreaseQty);
  const removeFromCart = useCart((state) => state.removeFromCart);

  const wishlist = useWishlist((state) => state.wishlist);
  const toggleWishlist = useWishlist((s) => s.toggleWishlist);

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const isMen = pathname?.includes("/men");
  const isWomen = pathname?.includes("/women");

products.filter((p: any) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
  <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b">

    <div className="w-full px-3 md:px-8">

  {/* TOP ROW */}
  {/* TOP ROW */}
<div className="h-14 md:h-16 flex items-center">

  {/* LEFT */}
  <div className="flex-1 flex items-center gap-3 md:gap-8">

  {/* HAMBURGER */}
  <Menu
    className="w-6 h-6 cursor-pointer"
    onClick={() => setOpen(true)}
  />

  {/* DESKTOP CATEGORY LINKS */}
  <div className="hidden md:flex items-center gap-6 text-sm font-medium">

    <Link href="/shop/men">
      <span className="cursor-pointer hover:text-[#680000] transition">
        MEN
      </span>
    </Link>

    <Link href="/shop/women">
      <span className="cursor-pointer hover:text-[#680000] transition">
        WOMEN
      </span>
    </Link>

  </div>

</div>

  {/* CENTER */}
  <Link href="/" className="flex justify-center flexshrink-0">
    <img src="/logo.png" className="h-8 md:h-10" />
  </Link>

  {/* RIGHT */}
  <div className="flex-1 flex items-center justify-end gap-3 md:gap-5">

    <Search
      className="w-5 h-5 cursor-pointer"
      onClick={() => setSearchOpen(true)}
    />

    {/* ACCOUNT */}
    <div className="relative">
      <div
        onClick={() => setAccountOpen(!accountOpen)}
        className="cursor-pointer"
      >
        {user ? (
          <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">
            {user.name?.charAt(0)}
          </div>
        ) : (
          <User className="w-5 h-5" />
        )}
      </div>

      {accountOpen && (
        <div className="absolute right-0 top-10 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50 animate-dropdown">

          {!user ? (
            <>
              <button
                onClick={() => {
                  setAuthOpen(true);
                  setAccountOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition font-medium"
              >
                Login
              </button>

              <button
                onClick={() => {

                  setAuthOpen(true);
                  setAccountOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition font-medium"
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              <p className="px-3 mb-3 text-sm text-gray-500">
                Signed in as
              </p>

              <p className="px-3 font-semibold mb-4">
                {user.name}
              </p>

              <Link href="/account">
                <p className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer transition">
                  My Account
                </p>
              </Link>

              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 rounded-md text-red-500 hover:bg-red-50 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}
    </div>

    {/* WISHLIST */}
    <div
      className="relative cursor-pointer"
      onClick={() => setWishlistOpen(true)}
    >
      <Heart className="w-5 h-5" />
      {wishlist.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#680000] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {wishlist.length}
        </span>
      )}
    </div>

    {/* CART */}
    <div
      className="relative cursor-pointer"
      onClick={() => setCartOpen(true)}
    >
      <ShoppingBag className="w-5 h-5" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#680000] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {totalItems}
        </span>
      )}
    </div>

  </div>

</div>
</div>
      
{/* announcement bar */}
<div className="bg-[#680000] text-white text-sm text-center py-2">
  Free Shipping on All Orders • New Drop Live • Limited Stock
</div>

</header>

      <MobileMenu open={open} setOpen={setOpen} />
            {/* AUTH MODAL */}
      {authOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">

          <div className="bg-white w-full max-w-md p-8 relative">

            <X
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setAuthOpen(false)}
            />

            <h2 className="text-xl font-semibold mb-6">
  Login / Signup
</h2>

            <button
  onClick={startLogin}
  className="w-full bg-black text-white py-3"
>
  Continue with Mobile
</button>

          </div>

        </div>
      )}

      {/* SEARCH */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">

          <div className="bg-white p-6 shadow-xl">

            <div className="max-w-4xl mx-auto">

              <div className="flex gap-4 items-center">

                <Search className="w-5 h-5" />

                <input
                  placeholder="Search for products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      window.location.href = `/search?q=${search}`;
                      }
                      }}
                      className="flex-1 outline-none text-lg"
                />

                <X
                  className="cursor-pointer"
                  onClick={() => setSearchOpen(false)}
                />

              </div>

              {search && (
  <div className="mt-6 max-h-80 overflow-y-auto">

    {filtered.length === 0 && (
      <div className="p-6 text-center text-sm text-gray-500">
        No products found
      </div>
    )}

    {filtered.map((item) => (
      <Link
        key={item.id}
        href={`/product/${item.id}`}
        onClick={() => setSearchOpen(false)}
      >
        <div className="flex gap-3 p-3 hover:bg-gray-100 border-b">
          <img
            src={item.image}
            className="w-14 h-16 object-cover"
          />

          <div>
            <p className="text-sm font-medium">
              {item.title}
            </p>

            <p className="text-sm text-gray-500">
              ₹{item.price}
            </p>
          </div>
        </div>
      </Link>
    ))}

  </div>
)}

            </div>

          </div>

        </div>
      )}
            {/* WISHLIST DRAWER */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-50">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setWishlistOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-96 bg-white p-6 shadow-xl overflow-y-auto">

            <div className="flex justify-between mb-6">
              <h2 className="font-semibold text-lg">
                Wishlist
              </h2>

              <X onClick={() => setWishlistOpen(false)} />
            </div>

            {wishlist.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 border-b pb-4 mb-4"
              >
                <img
                  src={item.image}
                  className="w-16 h-20 object-cover"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {item.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() =>
                      addToCart({
                        id: String(item.id),
                        title: item.title,
                        price: item.price,
                        image: item.image,
                        quantity: 1,
                      })
                    }
                    className="text-xs text-[#680000]"
                  >
                    Move to cart
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(item)}
                  className="text-xs text-red-500"
                >
                  Remove
                </button>

              </div>
            ))}

          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setCartOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-96 bg-white p-6 shadow-xl overflow-y-auto">

            <div className="flex justify-between mb-6">
              <h2 className="font-semibold text-lg">
                Your Cart
              </h2>

              <X onClick={() => setCartOpen(false)} />
            </div>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 border-b pb-4 mb-4"
              >
                <img
                  src={item.image}
                  className="w-16 h-20 object-cover"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {item.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    ₹{item.price}
                  </p>

                  <div className="flex gap-2 mt-2">

                    <button
                      onClick={() => decrease(item.id)}
                      className="border px-2"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        addToCart({
                          ...item,
                          quantity: 1,
                        })
                      }
                      className="border px-2"
                    >
                      +
                    </button>

                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-red-500"
                >
                  Remove
                </button>

              </div>
            ))}

            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <Link href="/checkout" onClick={() => setCartOpen(false)}>
  <button className="w-full bg-[#680000] text-white py-3">
    CHECKOUT
  </button>
</Link>
            </div>

          </div>
        </div>
      )}

    </>
  );
}