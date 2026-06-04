"use client";
import WishlistDrawer from "./WishlistDrawer";
import CartDrawer from "./CartDrawer";
import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
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

const SearchOverlay = dynamic(
  () => import("./SearchOverlay"),
  {
    ssr: false,
  }
);

export default function Header() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // account
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement | null>(null);

  const [user, setUser] = useState<any>(null);
  const fetchWishlist = useWishlist((s) => s.fetchWishlist);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }

  const token = localStorage.getItem("token");

  if (token) {
    setTimeout(() => {
      fetchCart();
      fetchWishlist(); // ✅ ADD THIS
    }, 100);
  }
}, []);
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

// 👉 ASK NAME IF NOT EXISTS
if (!result.user.name) {
  const name = prompt("Enter your name");

  if (name) {
    const res2 = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/update-name`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${result.token}`,
        },
        body: JSON.stringify({ name }),
      }
    );

    const updated = await res2.json();

    localStorage.setItem("user", JSON.stringify(updated.user));
    setUser(updated.user);
  } else {
    setUser(result.user);
  }
} else {
  setUser(result.user);
}

setAccountOpen(false);
    },

    failure: function (err: any) {
      console.log("❌ OTP ERROR:", err);
      alert("OTP failed");
    },
  });
};
  // search
  useEffect(() => {

  const script = document.createElement("script");
  script.src = "https://verify.msg91.com/otp-provider.js";
  script.async = true;

  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);
useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      accountRef.current &&
      !accountRef.current.contains(event.target as Node)
    ) {
      setAccountOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

useEffect(() => {
  if (!accountOpen) return;

  const timer = setTimeout(() => {
    setAccountOpen(false);
  }, 6000);

  return () => clearTimeout(timer);
}, [accountOpen]);

  const logout = () => {
  localStorage.removeItem("user");   // ✅ remove correct key
  localStorage.removeItem("token");  // ✅ remove jwt
  setUser(null);                     // ✅ clear state
  setAccountOpen(false);
};

  const cart = useCart((state) => state.cart);
  const fetchCart = useCart((state) => state.fetchCart);
  const addToCart = useCart((state) => state.addToCart);
  const decrease = useCart((state) => state.decreaseQty);
  const removeFromCart = useCart((state) => state.removeFromCart);

  const wishlist = useWishlist((state) => state.wishlist);
  const toggleWishlist = useWishlist((s) => s.toggleWishlist);

  const totalItems = useMemo(() =>
  cart.reduce(
    (acc, item) => acc + item.quantity,
    0
), [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }, [cart]);

  const isMen = pathname?.includes("/men");
  const isWomen = pathname?.includes("/women");

  return (
    <>
  <header className="
sticky top-0 z-50
bg-white/75
backdrop-blur-xl
border-b border-black/5
shadow-[0_4px_30px_rgba(0,0,0,0.03)]
">

    <div className="w-full px-2 md:px-8">

  {/* TOP ROW */}
  {/* TOP ROW */}
<div className="h-13 md:h-15 flex items-center">

  {/* LEFT */}
  <div className="w-[90px] flex items-center gap-3">

  <Menu
    className="w-6 h-6 cursor-pointer"
    onClick={() => setOpen(true)}
  />

  <Search
    className="w-5 h-5 cursor-pointer"
    onClick={() => setSearchOpen(true)}
  />

  {/* DESKTOP CATEGORY LINKS */}
  <div className="hidden md:flex items-center gap-6 text-sm font-medium">

    <Link href="/shop/men/all">
  <span className="
cursor-pointer
tracking-wide
hover:text-[#680000]
transition-all duration-300
relative
after:absolute
after:left-0
after:-bottom-1
after:w-0
after:h-px
after:bg-[#680000]
after:transition-all
hover:after:w-full
">
    MEN
  </span>
</Link>

<Link href="/shop/women/all">
  <span className="
cursor-pointer
tracking-wide
hover:text-[#680000]
transition-all duration-300
relative
after:absolute
after:left-0
after:-bottom-1
after:w-0
after:h-px
after:bg-[#680000]
after:transition-all
hover:after:w-full
">
    WOMEN
  </span>
</Link>

  </div>

</div>

  {/* CENTER */}
  <Link href="/" className="flex justify-center flex-shrink-0">
    <Image
  src="/logo.webp"
  alt="MythStreet"
  width={160}
  height={40}
  priority
  className="
  w-auto
  h-9 md:h-11
  object-contain
  transition duration-300
  hover:opacity-80
"
/>
  </Link>

  {/* RIGHT */}
  <div className="
w-[110px]
flex
items-center
justify-end
gap-2
">

    {/* ACCOUNT */}
    <div className="relative" ref={accountRef}>
      <div
        onClick={() => setAccountOpen(!accountOpen)}
       className="cursor-pointer"
      >
        {user ? (
          <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
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
  startLogin();
  setAccountOpen(false);
}}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition font-medium"
              >
                Login
              </button>

              <button
                onClick={() => {
  startLogin();
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
                {user.name || "User"}
              </p>

              <p
  onClick={() => {
    setAccountOpen(false); // close dropdown
    window.location.href = "/account"; // force navigation
  }}
  className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer transition"
>
  My Account
</p>

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
      <Heart className="w-6 h-6" />
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
      <ShoppingBag className="w-6 h-6" />
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
<div className="
bg-black
text-white/90
text-[10px] md:text-[11px]
tracking-[0.18em]
uppercase
text-center
py-2
border-t border-white/5
whitespace-nowrap
overflow-hidden
">
  Free Shipping On All Orders
</div>

</header>

      <MobileMenu open={open} setOpen={setOpen} />
  
  <SearchOverlay
  open={searchOpen}
  onClose={() => setSearchOpen(false)}
  
/>

<CartDrawer
  open={cartOpen}
  onClose={() => setCartOpen(false)}
  cart={cart}
  subtotal={subtotal}
  addToCart={addToCart}
  decrease={decrease}
  removeFromCart={removeFromCart}
/>
            {/* WISHLIST DRAWER */}
<WishlistDrawer
  open={wishlistOpen}
  onClose={() => setWishlistOpen(false)}
  wishlist={wishlist}
  addToCart={addToCart}
  toggleWishlist={toggleWishlist}
/>

    </>
  );
}