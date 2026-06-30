import { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa6";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  rating: number;
  image: string;
  ingredients: string[];
};

const nutritionInfo = [
  { label: "Calories", value: "450 kcal" },
  { label: "Protein", value: "12g" },
  { label: "Carbs", value: "52g" },
  { label: "Gluten Free", value: "Available" },
];

const pairWellWith = [
  {
    name: "Craft Beer",
    image:
      "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c0?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Classic Burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Soft Drink",
    image:
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=80",
  },
];

const USER_KEY = "biteMeUser";
const MAX_ITEM_QUANTITY = 10;
const MAX_ORDER_TOTAL = 500;

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Crispy Spring Rolls",
    category: "Appetizers",
    price: "$8",
    description: "Golden rolls with fresh vegetables and dipping sauce.",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Cabbage", "Carrot", "Wrapper", "Sweet chili sauce"],
  },
  {
    id: 3,
    name: "Grilled Steak",
    category: "Main Course",
    price: "$28",
    description: "Tender steak with fries and herb butter.",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Beef steak", "Potatoes", "Herbs", "Butter"],
  },
  {
    id: 4,
    name: "Mixed Grilled Platter",
    category: "Main Course",
    price: "$24",
    description: "A full grilled plate with meats and vegetables.",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Chicken", "Beef", "Vegetables", "House sauce"],
  },
];

function getMenuIdFromUrl() {
  const match = window.location.pathname.match(/menu-details\/(\d+)/);
  return match ? Number(match[1]) : 1;
}

function readIsLoggedIn() {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem("isLoggedIn") === "true") return true;

  const storedUser = localStorage.getItem(USER_KEY);
  if (!storedUser) return false;

  try {
    return Boolean(JSON.parse(storedUser));
  } catch {
    return false;
  }
}

export default function Menu_details() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const selectedItem = useMemo(() => {
    const id = getMenuIdFromUrl();
    return menuItems.find((item) => item.id === id) ?? menuItems[0];
  }, []);

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(readIsLoggedIn());
    };

    syncAuthState();
    window.addEventListener("authchange", syncAuthState);
    window.addEventListener("storage", syncAuthState);

    return () => {
      window.removeEventListener("authchange", syncAuthState);
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  const handleOrderNow = () => {
    if (!readIsLoggedIn()) {
      window.location.href = `/auth?redirect=/menu-details/${selectedItem.id}`;
      return;
    }

    const storedCart = localStorage.getItem("biteMeCart");
    let cartItems: { id: number; quantity: number }[] = [];

    if (storedCart) {
      try {
        cartItems = JSON.parse(storedCart) as { id: number; quantity: number }[];
      } catch {
        cartItems = [];
      }
    }

    const existingItem = cartItems.find((item) => item.id === selectedItem.id);
    const currentQuantity = existingItem?.quantity ?? 0;
    const selectedItemPrice = Number(selectedItem.price.replace(/[$,]/g, ""));
    const currentTotal = cartItems.reduce((sum, item) => {
      const menuItem = menuItems.find((entry) => entry.id === item.id);
      const itemPrice = menuItem ? Number(menuItem.price.replace(/[$,]/g, "")) : 0;
      return sum + itemPrice * item.quantity;
    }, 0);

    if (currentQuantity >= MAX_ITEM_QUANTITY) return;
    if (currentTotal + selectedItemPrice > MAX_ORDER_TOTAL) return;

    const nextCart = existingItem
      ? cartItems.map((item) =>
          item.id === selectedItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cartItems, { id: selectedItem.id, quantity: 1 }];

    localStorage.setItem("biteMeCart", JSON.stringify(nextCart));
    localStorage.setItem("selectedItemId", String(selectedItem.id));
    window.dispatchEvent(new Event("cartchange"));
    window.location.href = "/cart-menu";
  };

  return (
    <main className="min-h-screen bg-[#2b1d1b] text-white">
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <SiteNav />
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <img
          src={selectedItem.image}
          alt={selectedItem.name}
          className="h-[420px] w-full rounded-[2rem] object-cover"
        />

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            Menu Details
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white">{selectedItem.name}</h1>
          <p className="mt-3 text-sm text-white/70">{selectedItem.category}</p>

          <div className="mt-4 flex items-center gap-2 text-orange-400">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar className="opacity-60" />
            <span className="ml-2 text-sm text-white/65">
              {selectedItem.rating.toFixed(1)}
            </span>
          </div>

          <p className="mt-5 text-sm leading-7 text-white/70">
            {selectedItem.description}
          </p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-white">Ingredients</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
              {selectedItem.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-orange-500/15 px-4 py-2 text-sm font-semibold text-orange-300">
              {selectedItem.price}
            </span>
            <button
              type="button"
              onClick={handleOrderNow}
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              {isLoggedIn ? "Order Now" : "Login to Order"}
            </button>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
  <div className="rounded-[2rem] bg-[#f7e1e0] p-6 text-[#2b1d1b]">
    <h2 className="text-2xl font-semibold sm:text-3xl">
      Nutritional Information
    </h2>

    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {nutritionInfo.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl bg-white/35 px-4 py-5 text-center"
        >
          <p className="text-sm text-[#5f4a49]">{item.label}</p>
          <p className="mt-2 text-lg font-semibold text-[#2b1d1b]">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  </div>

  <div className="mt-10">
    <h2 className="text-3xl font-semibold text-white sm:text-4xl">
      Pairs Well With
    </h2>

    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pairWellWith.map((item) => (
        <article
          key={item.name}
          className="overflow-hidden rounded-[1.5rem] bg-[#f7e1e0] p-3 text-center text-[#2b1d1b]"
        >
          <img
            src={item.image}
            alt={item.name}
            className="h-44 w-full rounded-[1rem] object-cover"
          />
          <p className="mt-3 pb-2 text-base font-medium">{item.name}</p>
        </article>
      ))}
    </div>
  </div>
</section>

      <SiteFooter />
    </main>
  );
}
