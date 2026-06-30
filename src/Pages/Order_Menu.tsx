import { useEffect, useMemo, useState } from "react";
import {
  FaCartShopping,
  FaMagnifyingGlass,
  FaStar,
  FaRegStar,
  FaEye,
} from "react-icons/fa6";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

type MenuItem = {
  id: number;
  name: string;
  category: "Appetizers" | "Main Course" | "Side Dishes" | "Beverages and Drinks";
  price: string;
  description: string;
  rating: number;
  image: string;
};

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
  },
  {
    id: 2,
    name: "Chicken Wings",
    category: "Appetizers",
    price: "$10",
    description: "Spicy glazed wings served hot and fresh.",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=80",
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
  },
  {
    id: 5,
    name: "Garlic Fries",
    category: "Side Dishes",
    price: "$7",
    description: "Crispy fries tossed with garlic and herbs.",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Rice Pilaf",
    category: "Side Dishes",
    price: "$6",
    description: "Light, fluffy rice with savory seasoning.",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Fresh Lemonade",
    category: "Beverages and Drinks",
    price: "$5",
    description: "Cold lemon drink made fresh daily.",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Iced Tea",
    category: "Beverages and Drinks",
    price: "$4",
    description: "Refreshing tea served with ice and citrus.",
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    name: "Seafood Pasta",
    category: "Main Course",
    price: "$26",
    description: "Creamy pasta with shrimp and herbs.",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 10,
    name: "Hummus Plate",
    category: "Appetizers",
    price: "$9",
    description: "Smooth hummus with pita and olive oil.",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 11,
    name: "Mozzarella Sticks",
    category: "Appetizers",
    price: "$8",
    description: "Crispy outside, melty cheese inside.",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 12,
    name: "Grilled Chicken Bowl",
    category: "Main Course",
    price: "$22",
    description: "Healthy bowl with chicken, rice, and vegetables.",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = [
  "All",
  "Appetizers",
  "Main Course",
  "Side Dishes",
  "Beverages and Drinks",
] as const;

const ITEMS_PER_PAGE = 8;
const MAX_ITEM_QUANTITY = 10;
const MIN_ORDER_TOTAL = 10;
const MAX_ORDER_TOTAL = 500;

export default function Order_Menu() {
  const getCartItems = () => {
    const stored = localStorage.getItem("biteMeCart");
    if (!stored) return [] as { id: number; quantity: number }[];
    try {
      return JSON.parse(stored) as { id: number; quantity: number }[];
    } catch {
      return [];
    }
  };

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addedItemId, setAddedItemId] = useState<number | null>(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [cartItems, setCartItems] = useState<{ id: number; quantity: number }[]>(
    () => getCartItems()
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeCategory]);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  useEffect(() => {
    const syncCartItems = () => {
      setCartItems(getCartItems());
    };

    syncCartItems();
    window.addEventListener("cartchange", syncCartItems);

    return () => {
      window.removeEventListener("cartchange", syncCartItems);
    };
  }, []);

  const saveCartItems = (items: { id: number; quantity: number }[]) => {
    localStorage.setItem("biteMeCart", JSON.stringify(items));
    setCartItems(items);
    window.dispatchEvent(new Event("cartchange"));
  };

  const getItemPrice = (itemId: number) => {
    const item = menuItems.find((menuItem) => menuItem.id === itemId);
    return item ? Number(item.price.replace(/[$,]/g, "")) : 0;
  };

  const addToCart = (itemId: number) => {
    const cart = getCartItems();
    const existing = cart.find((item) => item.id === itemId);
    const currentQuantity = existing?.quantity ?? 0;
    const nextQuantity = currentQuantity + 1;
    const currentTotal = cart.reduce(
      (sum, entry) => sum + getItemPrice(entry.id) * entry.quantity,
      0
    );
    const nextTotal = currentTotal + getItemPrice(itemId);

    if (currentQuantity >= MAX_ITEM_QUANTITY) {
      setPopupMessage(`You can only order up to ${MAX_ITEM_QUANTITY} of this item at a time.`);
      return;
    }

    if (nextTotal > MAX_ORDER_TOTAL) {
      setPopupMessage(`Your order cannot exceed $${MAX_ORDER_TOTAL}.`);
      return;
    }

    const nextCart = existing
      ? cart.map((item) =>
          item.id === itemId ? { ...item, quantity: nextQuantity } : item
        )
      : [...cart, { id: itemId, quantity: 1 }];

    saveCartItems(nextCart);
    setAddedItemId(itemId);
    window.setTimeout(() => {
      setAddedItemId(null);
    }, 2000);
  };

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();

    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchesSearch =
        term.length === 0 ||
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const cartQuantityById = useMemo(() => {
    return cartItems.reduce<Record<number, number>>((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
  }, [cartItems]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;

    return (
      <div className="flex items-center gap-1 text-orange-400">
        {Array.from({ length: 5 }).map((_, index) => {
          if (index < fullStars) return <FaStar key={index} />;
          if (index === fullStars && hasHalf) {
            return <FaStar key={index} className="opacity-60" />;
          }
          return <FaRegStar key={index} className="text-white/35" />;
        })}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#2b1d1b] text-white">
      {popupMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-[2rem] border border-orange-400/20 bg-[#2b1d1b] p-6 shadow-2xl shadow-black/30">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
              Order limit
            </p>
            <h2 className="mt-3 text-xl font-semibold text-white">
              Maximum quantity reached
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              {popupMessage}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setPopupMessage("")}
                className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <SiteNav />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            Order Menu
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Browse the full menu and order online
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
            Search, filter by category, view menu details, and add food directly
            to your cart.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#2c1f1c] px-4 py-3">
              <FaMagnifyingGlass className="text-white/45" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search menu items..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />
            </label>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                    activeCategory === category
                      ? "bg-orange-500 text-white"
                      : "bg-white/5 text-white/75 hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {paginatedItems.map((item) => {
            const cartQuantity = cartQuantityById[item.id] ?? 0;
            const isInCart = cartQuantity > 0;
            const buttonLabel = !isLoggedIn
              ? "Login to order"
              : isInCart
                ? `In cart • ${cartQuantity}`
                : addedItemId === item.id
                  ? "Added"
                  : "Add to cart";

            return (
              <article
                key={item.id}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-52 w-full object-cover"
                />

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                        {item.category}
                      </p>
                      <h2 className="mt-2 text-lg font-bold text-white">
                        {item.name}
                      </h2>
                    </div>
                    <span className="rounded-full bg-orange-500/15 px-3 py-1 text-sm font-semibold text-orange-300">
                      {item.price}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    {renderStars(item.rating)}
                    <span className="text-xs text-white/55">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="mt-auto flex flex-col gap-3 pt-5">
                    <a
                      href={`/menu-details/${item.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      <FaEye />
                      View details
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        if (!isLoggedIn) {
                          window.location.href = "/auth?redirect=/cart-menu";
                          return;
                        }

                        addToCart(item.id);
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
                    >
                      <FaCartShopping />
                      {buttonLabel}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white/70">
            No menu items found for your search or filter.
          </div>
        )}

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-4 py-4 sm:flex-row">
          <p className="text-sm text-white/70">
            Showing {filteredItems.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}
            {" - "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)} of{" "}
            {filteredItems.length}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentPage(index + 1)}
                  className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
                    currentPage === index + 1
                      ? "bg-orange-500 text-white"
                      : "bg-white/5 text-white/75 hover:bg-white/10"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}