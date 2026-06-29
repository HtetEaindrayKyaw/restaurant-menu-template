import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLocationDot,
  FaPhone,
  FaUtensils,
  FaXTwitter,
} from "react-icons/fa6";

export default function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-[#241816]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h4 className="text-xl font-bold text-white">Bite Me</h4>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
            Order your favorite meals online or reserve a table for dine-in with
            family and friends.
          </p>
          <div className="mt-4 flex gap-3 text-white/70">
            <a href="#" aria-label="Facebook" className="transition hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram" className="transition hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" aria-label="X" className="transition hover:text-white">
              <FaXTwitter />
            </a>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
            Quick Links
          </h5>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>
              <a href="/" className="transition hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/order-menu" className="transition hover:text-white">
                Order Menu
              </a>
            </li>
            <li>
              <a href="/#reserve" className="transition hover:text-white">
                Book Table
              </a>
            </li>
            <li>
              <a href="/#contact" className="transition hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
            Join Our Newsletter
          </h5>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3">
              <FaEnvelope className="text-white/45" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              Subscribe
            </button>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
            Contact
          </h5>
          <ul className="mt-4 space-y-4 text-sm text-white/70">
            <li className="flex items-center gap-3">
              <FaLocationDot className="text-orange-300" />
              123 Food Street, City Center
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-orange-300" />
              +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-3">
              <FaUtensils className="text-orange-300" />
              Open daily: 10:00 AM - 10:00 PM
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/45 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Bite Me Restaurant. All rights reserved.</p>
          <p>Privacy Policy • Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}