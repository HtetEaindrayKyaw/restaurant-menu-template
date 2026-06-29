import { FaEnvelope, FaLocationDot, FaPhone, FaPaperPlane } from "react-icons/fa6";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

const heroImage =
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#2b1d1b] text-white">
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <SiteNav />
      </section>

      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(247,225,224,.92), rgba(247,225,224,.78)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div className="max-w-xl text-[#2b1d1b]">
            <div className="inline-flex items-center rounded-full bg-orange-500 px-4 py-1 text-xs font-semibold text-white shadow-md">
              Contact Us
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">
              We&apos;d love to hear from you
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-8 text-[#4f3d3d]">
              Send us a message for reservations, private events, questions
              about the menu, or any special requests. We usually reply within
              10 minutes.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="overflow-hidden rounded-[2rem] shadow-2xl">
              <img
                src={heroImage}
                alt="Contact illustration"
                className="h-[320px] w-[420px] object-cover sm:h-[360px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-[#201514] p-6 shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
            Send Message
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white">
            Let us know how we can help
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/65">
            Use the form below to contact the restaurant team. We&apos;ll get
            back to you as soon as possible.
          </p>

          <form className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/80">
                Your Full Name
              </span>
              <input
                type="text"
                placeholder="Please enter your full name"
                className="w-full rounded-2xl border border-white/10 bg-[#2b1d1b] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-orange-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/80">
                Email Address
              </span>
              <input
                type="email"
                placeholder="Please enter your email"
                className="w-full rounded-2xl border border-white/10 bg-[#2b1d1b] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-orange-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/80">
                Message
              </span>
              <textarea
                rows={7}
                placeholder="Write your message"
                className="w-full rounded-2xl border border-white/10 bg-[#2b1d1b] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-orange-400"
              />
            </label>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              <FaPaperPlane />
              Submit
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#f7e1e0] p-5 text-[#2b1d1b] shadow-lg">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-orange-500 shadow-sm">
                <FaPhone className="text-lg" />
              </div>
              <div>
                <p className="text-sm font-semibold">Phone Number</p>
                <p className="mt-1 text-sm text-[#5a4543]">+95 987 654 321</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#f7e1e0] p-5 text-[#2b1d1b] shadow-lg">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-orange-500 shadow-sm">
                <FaEnvelope className="text-lg" />
              </div>
              <div>
                <p className="text-sm font-semibold">Email Address</p>
                <p className="mt-1 text-sm text-[#5a4543]">bite.me@restaurant.com</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#f7e1e0] p-5 text-[#2b1d1b] shadow-lg">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-orange-500 shadow-sm">
                <FaLocationDot className="text-lg" />
              </div>
              <div>
                <p className="text-sm font-semibold">Restaurant Address</p>
                <p className="mt-1 text-sm text-[#5a4543]">
                  No. 22, Yangon Downtown, Myanmar
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-xl">
            <iframe
              title="Restaurant Map"
              src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAP_EMBED_CODE_HERE"
              className="h-[260px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}