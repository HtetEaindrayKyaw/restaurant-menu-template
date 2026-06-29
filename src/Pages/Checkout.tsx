import { useMemo, useState } from "react";
import { FaLocationDot, FaReceipt, FaTruck } from "react-icons/fa6";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
};

const cartItems: CartItem[] = [
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

function getSelectedItemId() {
  const stored = localStorage.getItem("selectedItemId");
  if (stored && !Number.isNaN(Number(stored))) {
    return Number(stored);
  }

  const match = window.location.search.match(/item=(\d+)/);
  if (match) return Number(match[1]);

  return 4;
}

export default function Checkout() {
  const selectedItem = useMemo(() => {
    const id = getSelectedItemId();
    return cartItems.find((item) => item.id === id) ?? cartItems[0];
  }, []);

  const [quantity, setQuantity] = useState(() => {
    const stored = localStorage.getItem("cartQuantity");
    if (!stored) return 1;
    const parsed = Number(stored);
    return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
  });

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");

  const subtotal = Number((selectedItem.price * quantity).toFixed(2));
  const tax = Number((subtotal * 0.08).toFixed(2));
  const deliveryFee = 4.5;
  const total = Number((subtotal + tax + deliveryFee).toFixed(2));

  const handleConfirm = () => {
    if (!deliveryAddress.trim()) return;

    localStorage.removeItem("biteMeCart");
    localStorage.removeItem("cartQuantity");
    window.dispatchEvent(new Event("cartchange"));
    window.location.href = "/order-tracking";
  };


  return (
    <main className="min-h-screen bg-[#2b1d1b] text-white">
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <SiteNav />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            Checkout
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Review your order and delivery details
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
            Check the item, quantity, fees, and delivery address before
            confirming your order.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="space-y-6">
          <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="h-28 w-28 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                  Order Item
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  {selectedItem.name}
                </h2>
                <p className="mt-2 text-sm text-white/65">
                  {selectedItem.category}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-lg">
            <div className="flex items-center gap-2">
              <FaLocationDot className="text-orange-400" />
              <h2 className="text-xl font-bold text-white">Delivery Address</h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Add the location where you want your food delivered.
            </p>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/80">
                  Address
                </span>
                <textarea
                  rows={4}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="House number, street, township, city, landmark..."
                  className="w-full rounded-2xl border border-white/10 bg-[#2c1f1c] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-orange-400"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/80">
                  Delivery Note
                </span>
                <input
                  type="text"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="Apartment, gate code, or special delivery instruction"
                  className="w-full rounded-2xl border border-white/10 bg-[#2c1f1c] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-orange-400"
                />
              </label>
            </div>
          </article>
        </div>

        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-lg">
          <div className="flex items-center gap-2">
            <FaReceipt className="text-orange-400" />
            <h2 className="text-xl font-bold text-white">Order Summary</h2>
          </div>

          <div className="mt-6 space-y-4 rounded-3xl border border-white/10 bg-[#2c1f1c] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">
                  {selectedItem.name}
                </p>
                <p className="mt-1 text-xs text-white/55">Unit price</p>
              </div>
              <span className="text-sm font-semibold text-orange-300">
                ${selectedItem.price.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
              <div>
                <p className="text-sm font-semibold text-white">Quantity</p>
                <p className="mt-1 text-xs text-white/55">
                  Choose how many items you want
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                >
                  -
                </button>
                <span className="min-w-8 text-center text-base font-semibold text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm">
              <span className="text-white/70">Subtotal</span>
              <span className="font-semibold text-white">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Tax</span>
              <span className="font-semibold text-white">${tax.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Delivery Fee</span>
              <span className="font-semibold text-white">
                ${deliveryFee.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-base">
              <span className="font-semibold text-white">Total</span>
              <span className="font-bold text-orange-300">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/10 to-white/5 p-5">
            <div className="flex items-center gap-2">
              <FaTruck className="text-orange-400" />
              <p className="text-sm font-semibold text-white">Fast Delivery</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Estimated arrival in 25 to 35 minutes depending on your location.
            </p>
            {deliveryNote.trim() && (
              <p className="mt-3 text-xs leading-5 text-white/45">
                Note: {deliveryNote}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!deliveryAddress.trim()}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm Order
          </button>

          {!deliveryAddress.trim() && (
            <p className="mt-3 text-center text-xs text-white/45">
              Please enter a delivery address before confirming.
            </p>
          )}
        </aside>
      </section>

      <SiteFooter />
    </main>
  );
}