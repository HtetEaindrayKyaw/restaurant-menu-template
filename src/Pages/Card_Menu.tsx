import { useMemo, useState } from "react";
import { FaMinus, FaPlus, FaTrash, FaArrowRight } from "react-icons/fa6";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
};

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Crispy Spring Rolls",
    category: "Appetizers",
    price: 8,
    description: "Golden rolls with fresh vegetables and dipping sauce.",
    image:
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Grilled Steak",
    category: "Main Course",
    price: 28,
    description: "Tender steak with fries and herb butter.",
    image:
      "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Mixed Grilled Platter",
    category: "Main Course",
    price: 24,
    description: "A full grilled plate with meats and vegetables.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  },
];

const getStoredCart = () => {
  const stored = localStorage.getItem("biteMeCart");
  if (!stored) return [] as { id: number; quantity: number }[];
  try {
    return JSON.parse(stored) as { id: number; quantity: number }[];
  } catch {
    return [];
  }
};

type CartDetail = MenuItem & { quantity: number };

export default function Cart_Menu() {
  const [cartItems, setCartItems] = useState<{ id: number; quantity: number }[]>(
    () => getStoredCart()
  );
  const [statusMessage, setStatusMessage] = useState("");

  const cartDetails = useMemo(
    () =>
      cartItems
        .map((entry) => {
          const menuItem = menuItems.find((item) => item.id === entry.id);
          return menuItem ? { ...menuItem, quantity: entry.quantity } : null;
        })
        .filter((item): item is CartDetail => item !== null),
    [cartItems]
  );

  const isCartEmpty = cartDetails.length === 0;
  const total = cartDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const saveCart = (items: { id: number; quantity: number }[]) => {
    localStorage.setItem("biteMeCart", JSON.stringify(items));
    window.dispatchEvent(new Event("cartchange"));
  };

  const updateQuantity = (id: number, change: number) => {
    setCartItems((current) => {
      const next = current
        .map((item) =>
          item.id === id
            ? { id, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0);
      saveCart(next);
      return next;
    });
  };

  const removeCartItem = (id: number) => {
    setCartItems((current) => {
      const next = current.filter((item) => item.id !== id);
      saveCart(next);
      return next;
    });
  };

  const handleCheckout = () => {
    saveCart(cartItems);
  };

  const clearCart = () => {
    setCartItems([]);
    saveCart([]);
    setStatusMessage("Your cart is empty. Add items to continue your order.");
    window.setTimeout(() => setStatusMessage(""), 5000);
  };

  return (
    <main className="min-h-screen bg-[#2b1d1b] text-white">
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <SiteNav />
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            Cart Menu
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white">Review your order</h1>
          <p className="mt-3 text-sm leading-7 text-white/70">
            Check your selected menu item before checkout.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-[#2c1f1c] p-4">
            {isCartEmpty ? (
              <div className="grid min-h-[220px] place-items-center rounded-3xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-white/70">
                <p className="text-xl font-semibold text-white">Your cart is empty</p>
                <p className="mt-2 text-sm">
                  Add items from the menu and they will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartDetails.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-28 w-full max-w-[140px] rounded-2xl object-cover sm:w-[140px]"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h2 className="text-lg font-semibold text-white">
                              {item.name}
                            </h2>
                            <p className="mt-1 text-sm text-white/60">
                              {item.category}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeCartItem(item.id)}
                            className="grid h-10 w-10 place-items-center rounded-full border border-red-400/30 bg-red-500/10 text-red-200 transition hover:bg-red-500/20"
                            aria-label="Remove item"
                          >
                            <FaTrash />
                          </button>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-white/70">
                          {item.description}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/10 text-white transition hover:bg-white/10"
                            >
                              <FaMinus />
                            </button>
                            <span className="min-w-[2rem] text-center text-lg font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/10 text-white transition hover:bg-white/10"
                            >
                              <FaPlus />
                            </button>
                          </div>

                          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
                            ${item.price} each
                          </div>

                          <div className="rounded-full border border-white/10 bg-orange-500/10 px-3 py-2 text-sm font-semibold text-orange-200">
                            ${item.price * item.quantity} total
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-bold text-white">Order Summary</h2>

          <div className="mt-6 space-y-4 rounded-3xl border border-white/10 bg-[#2c1f1c] p-5 text-sm">
            {!isCartEmpty ? (
              <>
                <div className="flex items-center justify-between text-white/70">
                  <span>Line items</span>
                  <span>{cartDetails.length}</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Total quantity</span>
                  <span>{cartDetails.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>${total}</span>
                </div>
                <div className="border-t border-white/10 pt-4 text-base font-semibold text-white">
                  <div className="flex items-center justify-between">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-sm text-white/70">
                <p className="font-semibold text-white">No items to review</p>
                <p className="mt-2">Add a menu item to see your order summary.</p>
              </div>
            )}
          </div>

          {statusMessage && (
            <div className="mt-4 rounded-3xl border border-orange-400/20 bg-orange-500/10 px-4 py-3 text-sm text-orange-100 shadow-lg shadow-orange-500/10 animate-slide-up-fade">
              {statusMessage}
            </div>
          )}

          <a
            href="/checkout"
            onClick={handleCheckout}
            className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition ${
              isCartEmpty
                ? "pointer-events-none cursor-not-allowed bg-orange-500/40"
                : "bg-orange-500 hover:bg-orange-400"
            }`}
            aria-disabled={isCartEmpty}
          >
            Proceed to Checkout <FaArrowRight />
          </a>

          <a
            href="/order-menu"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Back to Menu
          </a>

          <button
            type="button"
            onClick={clearCart}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
          >
            <FaTrash />
            Clear Cart
          </button>
        </aside>
      </section>

      <SiteFooter />
    </main>
  );
}