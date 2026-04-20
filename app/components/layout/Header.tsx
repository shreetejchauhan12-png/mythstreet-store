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
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // search
  const [search, setSearch] = useState("");
  const filtered = products.filter((p: any) =>
  p.title.toLowerCase().includes(search.toLowerCase())
);

  useEffect(() => {
  getProducts().then(setProducts);
}, []);

  const register = () => {
    if (!name || !email || !password) {
      alert("Fill all fields");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("myth_users") || "[]");

    const exists = users.find(
      (u: any) => u.email === email
    );

    if (exists) {
      alert("User already exists");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    localStorage.setItem(
      "myth_users",
      JSON.stringify(users)
    );

    localStorage.setItem(
      "myth_user",
      JSON.stringify(newUser)
    );

    setUser(newUser);
    setAuthOpen(false);
  };
    const login = () => {
    const users =
      JSON.parse(localStorage.getItem("myth_users") || "[]");

    const found = users.find(
      (u: any) =>
        u.email === email &&
        u.password === password
    );

    if (!found) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem(
      "myth_user",
      JSON.stringify(found)
    );

    setUser(found);
    setAuthOpen(false);
  };

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
  <div className="h-14 flex items-center justify-between">

    {/* LEFT */}
    <div className="flex items-center gap-3">
      <Menu
        className="w-6 h-6 cursor-pointer"
        onClick={() => setOpen(true)}
      />
    </div>

    {/* CENTER */}
    <Link href="/" className="flex justify-center">
      <img src="/logo.png" className="h-8 md:h-10" />
    </Link>

    {/* RIGHT */}
    <div className="flex items-center gap-3">

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
          <div className="absolute right-0 top-8 w-56 bg-white shadow-xl border p-4 z-50">

            {!user ? (
              <>
                <button
                  onClick={() => {
                    setAuthMode("login");
                    setAuthOpen(true);
                    setAccountOpen(false);
                  }}
                  className="block w-full text-left py-2"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    setAuthMode("register");
                    setAuthOpen(true);
                    setAccountOpen(false);
                  }}
                  className="block w-full text-left py-2"
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                <p className="font-medium mb-3">
                  Hello {user.name}
                </p>

                <Link href="/account">
                  <p className="py-2 cursor-pointer">
                    My Account
                  </p>
                </Link>

                <button
                  onClick={logout}
                  className="py-2 text-red-500"
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
              {authMode === "login" ? "Login" : "Create Account"}
            </h2>

            {authMode === "register" && (
              <input
                placeholder="Full name"
                className="w-full border p-3 mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              placeholder="Email"
              className="w-full border p-3 mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Password"
              type="password"
              className="w-full border p-3 mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={authMode === "login" ? login : register}
              className="w-full bg-black text-white py-3"
            >
              {authMode === "login" ? "Login" : "Create Account"}
            </button>

            <p className="text-sm mt-4 text-center">
              {authMode === "login"
                ? "Don't have account?"
                : "Already have account?"}

              <span
                className="ml-2 underline cursor-pointer"
                onClick={() =>
                  setAuthMode(
                    authMode === "login"
                      ? "register"
                      : "login"
                  )
                }
              >
                {authMode === "login"
                  ? "Create one"
                  : "Login"}
              </span>
            </p>

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