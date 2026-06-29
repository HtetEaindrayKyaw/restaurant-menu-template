
import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FaBell,
  FaCartShopping,
  FaChevronDown,
  FaCircleUser,
  FaEnvelope,
  FaLock,
  FaUser,
  FaXmark,
} from "react-icons/fa6";
import logo from "../assets/images/Bite Me.png";

type User = {
  name: string;
  email: string;
};

type AuthMode = "login" | "register";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  status: "pending" | "confirmed" | "rejected";
  read: boolean;
  createdAt: string;
};

type ProfileData = {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  password: string;
  profileChoice: string;
};

const USER_KEY = "biteMeUser";
const NOTIFICATION_KEY = "biteMeNotifications";
const PROFILE_KEY = "biteMeProfile";

const defaultNotifications: NotificationItem[] = [
  {
    id: "booking-1",
    title: "Table booking confirmed",
    message: "Your reservation for tonight has been confirmed by the restaurant.",
    status: "confirmed",
    read: false,
    createdAt: "Just now",
  },
  {
    id: "order-1",
    title: "Order being prepared",
    message: "Your food is now in the kitchen and will be sent soon.",
    status: "pending",
    read: false,
    createdAt: "2 min ago",
  },
];

const profileChoices = [
  { id: "Classic", label: "Classic", swatch: "bg-orange-500/20 text-orange-200" },
  { id: "Chef", label: "Chef", swatch: "bg-emerald-500/20 text-emerald-200" },
  { id: "Dining", label: "Dining", swatch: "bg-sky-500/20 text-sky-200" },
  { id: "VIP", label: "VIP", swatch: "bg-fuchsia-500/20 text-fuchsia-200" },
];

function readUser(): User | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

function readNotifications(): NotificationItem[] {
  if (typeof window === "undefined") return defaultNotifications;
  const stored = localStorage.getItem(NOTIFICATION_KEY);
  if (!stored) return defaultNotifications;
  try {
    const parsed = JSON.parse(stored) as NotificationItem[];
    return Array.isArray(parsed) ? parsed : defaultNotifications;
  } catch {
    return defaultNotifications;
  }
}

function readProfile(fallbackUser?: User | null): ProfileData {
  const fallback: ProfileData = {
    name: fallbackUser?.name ?? "",
    address: "",
    phoneNumber: "",
    email: fallbackUser?.email ?? "",
    password: "",
    profileChoice: "Classic",
  };

  if (typeof window === "undefined") return fallback;
  const stored = localStorage.getItem(PROFILE_KEY);
  if (!stored) return fallback;
  try {
    const parsed = JSON.parse(stored) as ProfileData;
    return {
      ...fallback,
      ...parsed,
      name: parsed.name || fallback.name,
      email: parsed.email || fallback.email,
      profileChoice: parsed.profileChoice || fallback.profileChoice,
    };
  } catch {
    return fallback;
  }
}

function saveProfile(profile: ProfileData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export default function SiteNav() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const authPanelRef = useRef<HTMLDivElement | null>(null);
  const profilePanelRef = useRef<HTMLDivElement | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileViewOpen, setProfileViewOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [notifications, setNotifications] = useState<NotificationItem[]>(defaultNotifications);
  const [cartCount, setCartCount] = useState(0);
  const [cartLink, setCartLink] = useState("/order-menu");

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    profileChoice: "Classic",
  });

  useEffect(() => {
    const syncFromStorage = () => {
      const storedUser = readUser();
      setUser(storedUser);
      setNotifications(readNotifications());
      setProfileData(readProfile(storedUser));
      updateCartState();
    };

    syncFromStorage();
    window.addEventListener("storage", syncFromStorage);
    window.addEventListener("cartchange", syncFromStorage as EventListener);
    window.addEventListener("authchange", syncFromStorage as EventListener);
    window.addEventListener("notificationschange", syncFromStorage as EventListener);

    return () => {
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener("cartchange", syncFromStorage as EventListener);
      window.removeEventListener("authchange", syncFromStorage as EventListener);
      window.removeEventListener("notificationschange", syncFromStorage as EventListener);
    };
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideRoot = rootRef.current?.contains(target);
      const insideAuth = authPanelRef.current?.contains(target);
      const insideProfile = profilePanelRef.current?.contains(target);

      if (!insideRoot && !insideAuth && !insideProfile) {
        setProfileOpen(false);
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  useEffect(() => {
    if (profileViewOpen && user) {
      setProfileData(readProfile(user));
    }
  }, [profileViewOpen, user]);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications],
  );

  const initials = useMemo(() => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [user]);

  const updateCartState = () => {
    const stored = localStorage.getItem("biteMeCart");
    if (!stored) {
      setCartCount(0);
      setCartLink("/order-menu");
      return;
    }

    try {
      const cart = JSON.parse(stored) as { id: number; quantity: number }[];
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
      setCartLink(cart.length > 0 ? "/cart-menu" : "/order-menu");
    } catch {
      setCartCount(0);
      setCartLink("/order-menu");
    }
  };

  const syncUser = (nextUser: User | null) => {
    setUser(nextUser);
    if (nextUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(USER_KEY);
    }
    window.dispatchEvent(new Event("authchange"));
  };

  const syncNotifications = (nextNotifications: NotificationItem[]) => {
    setNotifications(nextNotifications);
    localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(nextNotifications));
    window.dispatchEvent(new Event("notificationschange"));
  };

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthError("");
    setAuthOpen(true);
    setProfileOpen(false);
    setNotificationOpen(false);
    setProfileViewOpen(false);
  };

  const openProfile = () => {
    if (!user) {
      openAuth("login");
      return;
    }

    setProfileOpen((prev) => !prev);
    setNotificationOpen(false);
    setAuthOpen(false);
  };

  const openNotifications = () => {
    if (!user) {
      openAuth("login");
      return;
    }

    setNotificationOpen((prev) => !prev);
    setProfileOpen(false);
    setAuthOpen(false);

    if (!notificationOpen) {
      const marked = notifications.map((item) => ({ ...item, read: true }));
      syncNotifications(marked);
    }
  };

  const handleAuthSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError("");

    if (!email.trim() || !password.trim()) {
      setAuthError("Please enter your email and password.");
      return;
    }

    if (authMode === "register") {
      if (!fullName.trim()) {
        setAuthError("Please enter your full name.");
        return;
      }

      if (password !== confirmPassword) {
        setAuthError("Passwords do not match.");
        return;
      }

      const nextUser = {
        name: fullName.trim(),
        email: email.trim(),
      };

      syncUser(nextUser);
      saveProfile({
        ...profileData,
        name: nextUser.name,
        email: nextUser.email,
        password: password.trim(),
      });

      setAuthOpen(false);
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    const derivedName =
      fullName.trim() || email.trim().split("@")[0] || "Guest User";

    const nextUser = {
      name: derivedName,
      email: email.trim(),
    };

    syncUser(nextUser);
    saveProfile({
      ...readProfile(nextUser),
      name: nextUser.name,
      email: nextUser.email,
      password: password.trim(),
    });

    setAuthOpen(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogout = () => {
    syncUser(null);
    setProfileOpen(false);
    setNotificationOpen(false);
    setProfileViewOpen(false);
    setAuthOpen(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAuthError("");
  };

  const openProfileView = () => {
    if (!user) {
      openAuth("login");
      return;
    }

    setProfileData(readProfile(user));
    setProfileViewOpen(true);
    setProfileOpen(false);
  };

  const handleProfileSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextProfile: ProfileData = {
      ...profileData,
      name: profileData.name.trim(),
      address: profileData.address.trim(),
      phoneNumber: profileData.phoneNumber.trim(),
      email: profileData.email.trim(),
      password: profileData.password,
      profileChoice: profileData.profileChoice,
    };

    saveProfile(nextProfile);
    if (nextProfile.name || nextProfile.email) {
      syncUser({
        name: nextProfile.name || user?.name || "Guest User",
        email: nextProfile.email || user?.email || "",
      });
    }
    setProfileViewOpen(false);
  };

  const statusStyles = {
    pending: "bg-amber-500/15 text-amber-700",
    confirmed: "bg-green-500/15 text-green-700",
    rejected: "bg-red-500/15 text-red-700",
  } as const;

  return (
    <header
      ref={rootRef}
      className="relative flex items-center justify-between gap-4 rounded-full border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-sm"
    >
      <a href="/" className="flex items-center gap-3">
        <img
          src={logo}
          alt="Bite Me logo"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold tracking-wide text-white">Bite Me</p>
          <p className="text-xs text-white/60">Restaurant</p>
        </div>
      </a>

      <nav className="hidden items-center gap-8 md:flex">
        <a href="/" className="text-sm text-white/75 transition hover:text-white">
          Home
        </a>
        <a
          href="/order-menu"
          className="text-sm text-white/75 transition hover:text-white"
        >
          Order Menu
        </a>
        <a
          href="/book-table"
          className="text-sm text-white/75 transition hover:text-white"
        >
          Book Table
        </a>
        <a
          href="/contact"
          className="text-sm text-white/75 transition hover:text-white"
        >
          Contact
        </a>
      </nav>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={openNotifications}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Notifications"
          >
            <FaBell />
            {user && unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full bg-orange-500 ring-2 ring-[#2b1d1b]" />
            )}
          </button>

          {notificationOpen && user && (
            <div className="absolute right-0 top-12 z-50 w-[320px] rounded-2xl border border-white/10 bg-[#2b1d1b] p-3 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <p className="text-sm font-semibold text-white">Notifications</p>
                  <p className="text-xs text-white/50">
                    Booking updates and admin responses
                  </p>
                </div>
                <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/70">
                  {notifications.length}
                </span>
              </div>

              <div className="max-h-[280px] space-y-3 overflow-auto py-3">
                {notifications.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/65">
                    No notifications yet.
                    <div className="mt-1 text-xs text-white/45">
                      Booking requests, confirmations, and rejects will appear here.
                    </div>
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`rounded-2xl border border-white/10 bg-white/5 p-3 ${
                        item.read ? "opacity-80" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-white/65">
                            {item.message}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold ${statusStyles[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-white/40">
                        <span>{item.createdAt}</span>
                        {!item.read && <span>New</span>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={openProfile}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            aria-label={user ? "Profile" : "Login"}
          >
            {user ? (
              <div className="grid h-7 w-7 place-items-center rounded-full bg-orange-500/20 text-sm font-semibold text-orange-200">
                {user.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase() || "U"}
              </div>
            ) : (
              <FaUser className="text-lg" />
            )}
            <FaChevronDown className="text-[11px] opacity-70" />
          </button>

          {profileOpen && user && (
            <div
              ref={profilePanelRef}
              className="absolute right-0 top-12 z-50 w-[280px] rounded-2xl border border-white/10 bg-[#2b1d1b] p-4 shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-orange-500/15 text-orange-300">
                  <FaCircleUser className="text-xl" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                  <p className="truncate text-xs text-white/55">{user.email}</p>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <button
                  type="button"
                  onClick={openProfileView}
                  className="flex w-full items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/10"
                >
                  <span>View Profile</span>
                  <FaCircleUser className="text-xs" />
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-between rounded-xl bg-red-500/10 px-3 py-2 text-left text-sm text-red-200 transition hover:bg-red-500/20"
                >
                  <span>Logout</span>
                  <FaXmark className="text-xs" />
                </button>
              </div>
            </div>
          )}
        </div>

        <a
          href={cartLink}
          className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          aria-label="View cart"
        >
          <FaCartShopping className="text-lg" />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-orange-500 px-1.5 text-xs font-bold text-white">
              {cartCount}
            </span>
          )}
        </a>

        {/* <a
          href="/order-menu"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
        >
          Order Now <FaArrowRight className="text-xs" />
        </a> */}
      </div>

      {authOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[90] grid place-items-center bg-black/65 px-4 py-6 backdrop-blur-sm">
            <div
              ref={authPanelRef}
              className="w-full max-w-md rounded-[28px] bg-white p-6 text-[#222] shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#222]">
                    {authMode === "login" ? "Login" : "Register"}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#666]">
                    {authMode === "login"
                      ? "Sign in to view your profile and notifications."
                      : "Create your profile so you can book tables and track updates."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAuthOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-[#f3f3f3] text-[#333] transition hover:bg-[#eaeaea]"
                  aria-label="Close"
                >
                  <FaXmark />
                </button>
              </div>

              <div className="mt-5 flex rounded-full bg-[#f3f4f6] p-1">
                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    authMode === "login" ? "bg-white text-[#222] shadow-sm" : "text-[#666]"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode("register")}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    authMode === "register"
                      ? "bg-white text-[#222] shadow-sm"
                      : "text-[#666]"
                  }`}
                >
                  Register
                </button>
              </div>

              <form className="mt-5 space-y-4" onSubmit={handleAuthSubmit}>
                {authMode === "register" && (
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#333]">
                      Full Name
                    </span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full rounded-2xl border border-[#d7d7d7] bg-white px-4 py-3 text-sm outline-none focus:border-orange-400"
                    />
                  </label>
                )}

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#333]">
                    Email
                  </span>
                  <div className="flex items-center rounded-2xl border border-[#d7d7d7] bg-white px-4 py-3">
                    <FaEnvelope className="text-[#888]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="ml-3 w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#333]">
                    Password
                  </span>
                  <div className="flex items-center rounded-2xl border border-[#d7d7d7] bg-white px-4 py-3">
                    <FaLock className="text-[#888]" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="ml-3 w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </label>

                {authMode === "register" && (
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#333]">
                      Confirm Password
                    </span>
                    <div className="flex items-center rounded-2xl border border-[#d7d7d7] bg-white px-4 py-3">
                      <FaLock className="text-[#888]" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="ml-3 w-full bg-transparent text-sm outline-none"
                      />
                    </div>
                  </label>
                )}

                {authError && (
                  <p className="text-sm font-medium text-red-600">{authError}</p>
                )}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
                >
                  {authMode === "login" ? "Login" : "Create Account"}
                </button>
              </form>
            </div>
          </div>,
          document.body,
        )}

      {profileViewOpen &&
        user &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-sm">
            <div
              ref={profilePanelRef}
              className="w-full max-w-5xl overflow-hidden rounded-[30px] border border-white/10 bg-[#1c1212] text-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div>
                  <h2 className="text-2xl font-bold">Your Profile</h2>
                  <p className="mt-1 text-sm text-white/55">
                    Update your contact details and choose a profile style.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setProfileViewOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/75 hover:bg-white/10"
                  aria-label="Close profile"
                >
                  <FaXmark />
                </button>
              </div>

              <form onSubmit={handleProfileSave} className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
                <aside className="border-b border-white/10 bg-white/5 p-6 lg:border-b-0 lg:border-r">
                  <div className="flex flex-col items-center rounded-[24px] border border-white/10 bg-[#261717] p-6 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/20 text-2xl font-black text-orange-200">
                      {profileData.name
                        ? profileData.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()
                        : initials}
                    </div>
                    <p className="mt-4 text-xl font-semibold">{profileData.name || user.name}</p>
                    <p className="text-sm text-white/60">{profileData.email || user.email}</p>
                    <p className="mt-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                      Profile: {profileData.profileChoice}
                    </p>
                  </div>

                  <div className="mt-6 rounded-[24px] border border-white/10 bg-[#241616] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
                      Choose Profile
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {profileChoices.map((choice) => (
                        <button
                          key={choice.id}
                          type="button"
                          onClick={() =>
                            setProfileData((current) => ({
                              ...current,
                              profileChoice: choice.id,
                            }))
                          }
                          className={`rounded-2xl border px-4 py-4 text-left transition ${
                            profileData.profileChoice === choice.id
                              ? "border-orange-400 bg-orange-500/10"
                              : "border-white/10 bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-full ${choice.swatch}`}
                          >
                            <FaCircleUser className="text-xl" />
                          </div>
                          <p className="mt-3 text-sm font-semibold">{choice.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </aside>

                <div className="space-y-5 p-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-white/85">
                        Name
                      </span>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData((current) => ({ ...current, name: e.target.value }))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/35"
                        placeholder="Full name"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-white/85">
                        Email
                      </span>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData((current) => ({ ...current, email: e.target.value }))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/35"
                        placeholder="Email address"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-white/85">
                        Phone Number
                      </span>
                      <input
                        type="tel"
                        value={profileData.phoneNumber}
                        onChange={(e) =>
                          setProfileData((current) => ({
                            ...current,
                            phoneNumber: e.target.value,
                          }))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/35"
                        placeholder="+95 ..."
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-white/85">
                        Password
                      </span>
                      <input
                        type="password"
                        value={profileData.password}
                        onChange={(e) =>
                          setProfileData((current) => ({ ...current, password: e.target.value }))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/35"
                        placeholder="Password"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white/85">
                      Address
                    </span>
                    <textarea
                      value={profileData.address}
                      onChange={(e) =>
                        setProfileData((current) => ({ ...current, address: e.target.value }))
                      }
                      rows={5}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/35"
                      placeholder="Home address"
                    />
                  </label>

                  <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setProfileViewOpen(false)}
                      className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
