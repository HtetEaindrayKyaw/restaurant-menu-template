import { useEffect, useState } from "react";
import { FaArrowRight, FaLocationDot } from "react-icons/fa6";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

type Dish = {
  title: string;
  description: string;
  image: string;
};

const dishes: Dish[] = [
  {
    title: "Mixed Grilled Platter",
    description:
      "A vibrant fusion of Eastern European, Central Asian, and Mediterranean flavors.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Grilled Steak Plate",
    description:
      "Served with crisp fries, fire-roasted tomatoes, and a classic rich finish.",
    image:
      "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Mediterranean Skewers",
    description:
      "Tender, colorful, and full of bright spices, herbs, and smoky flavor.",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Roasted Chicken Bowl",
    description:
      "A hearty plate with warm seasoning, fresh sides, and balanced texture.",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
  },
];

const heroImage =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80";

const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAP_EMBED_CODE_HERE";

export default function Homepage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % dishes.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  const visibleSlides = [0, 1, 2].map(
    (offset) => dishes[(activeIndex + offset) % dishes.length]
  );

  return (
    <main className="min-h-screen bg-[#2b1d1b] text-white">
      <style>
        {`
          @keyframes biteFadeUp {
            from {
              opacity: 0;
              transform: translateY(24px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes biteScaleIn {
            from {
              opacity: 0;
              transform: scale(.94);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes biteSlowZoom {
            from {
              background-size: 102%;
            }
            to {
              background-size: 108%;
            }
          }

          .bite-fade-up {
            animation: biteFadeUp .72s cubic-bezier(.22, 1, .36, 1) both;
          }

          .bite-scale-in {
            animation: biteScaleIn .64s cubic-bezier(.22, 1, .36, 1) both;
          }

          .bite-hero-motion {
            animation: biteSlowZoom 16s ease-in-out infinite alternate;
          }

          .bite-interactive {
            transition:
              transform .24s ease,
              box-shadow .24s ease,
              background-color .24s ease,
              border-color .24s ease,
              opacity .24s ease;
          }

          .bite-interactive:hover,
          .bite-interactive:focus-visible {
            transform: translateY(-3px);
          }

          .bite-image-lift {
            transition: transform .35s ease, filter .35s ease;
          }

          .bite-image-lift:hover {
            transform: scale(1.045);
            filter: saturate(1.08);
          }

          @media (prefers-reduced-motion: reduce) {
            .bite-fade-up,
            .bite-scale-in,
            .bite-hero-motion {
              animation: none;
            }

            .bite-interactive,
            .bite-image-lift {
              transition: none;
            }

            .bite-interactive:hover,
            .bite-interactive:focus-visible,
            .bite-image-lift:hover {
              transform: none;
            }
          }
        `}
      </style>

      <section
        className="bite-hero-motion relative isolate overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(26,16,14,.55), rgba(26,16,14,.9)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-4 sm:px-6 lg:px-8">
          <SiteNav />

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-xl">
              <div
                className="bite-fade-up inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-xs font-medium text-orange-200"
                style={{ animationDelay: "80ms" }}
              >
                <FaLocationDot />
                Premium Dining Experience
              </div>

              <h1
                className="bite-fade-up mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
                style={{ animationDelay: "180ms" }}
              >
                Discover Delicious Food & Elegant Dining
              </h1>

              <p
                className="bite-fade-up mt-5 max-w-lg text-sm leading-7 text-white/75 sm:text-base"
                style={{ animationDelay: "280ms" }}
              >
                Experience restaurant meals, discover rich ingredients, and
                enjoy savory dishes in a relaxing, inviting atmosphere. Every
                plate is crafted to feel memorable from the first bite to the
                last.
              </p>

              <div
                className="bite-fade-up mt-8 flex flex-wrap items-center gap-4"
                style={{ animationDelay: "380ms" }}
              >
                <a
                  href="/order-menu"
                  className="bite-interactive inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/20 hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
                >
                  Order Menu <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/book-table"
                  className="bite-interactive inline-flex items-center gap-2 rounded-full bg-orange-100 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-black/20 hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-100"
                >
                  Book a Table <FaArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="menu"
        className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="bite-fade-up mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
              Our Dishes
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white">
              Curated plates with rich flavor
            </h2>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <article className="bite-fade-up grid gap-5 sm:grid-cols-[1fr_180px] sm:items-center">
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-wide text-white">
                  Explore the world&apos;s best mixed grilled platters.
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-7 text-white/70">
                  A vibrant fusion of Eastern European, Central Asian, and
                  Mediterranean flavors.
                </p>
              </div>

              <div className="h-44 w-full overflow-hidden rounded-full shadow-2xl shadow-black/30 sm:h-44">
                <img
                  src={dishes[0].image}
                  alt={dishes[0].title}
                  className="bite-image-lift h-full w-full object-cover"
                />
              </div>
            </article>

            <article
              className="bite-fade-up grid gap-5 sm:grid-cols-[180px_1fr] sm:items-center"
              style={{ animationDelay: "120ms" }}
            >
              <div className="h-44 w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
                <img
                  src={dishes[1].image}
                  alt={dishes[1].title}
                  className="bite-image-lift h-full w-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold uppercase tracking-wide text-white">
                  Specifically, a masterfully grilled steak plate.
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-7 text-white/70">
                  Served with a rustic board, crispy fries, and fire-roasted
                  tomatoes for a classic, global favorite.
                </p>
              </div>
            </article>
          </div>

          <div className="grid gap-6">
            <div
              className="bite-scale-in rounded-[24px] border border-white/10 bg-[#3a2826] p-6 shadow-2xl shadow-black/20"
              style={{ animationDelay: "160ms" }}
            >
              <div
                key={activeIndex}
                className="grid gap-6 md:grid-cols-3"
                aria-live="polite"
              >
                {visibleSlides.map((dish, index) => (
                  <div
                    key={dish.title}
                    className="bite-scale-in text-center"
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <div className="mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-orange-500/70 shadow-xl shadow-black/25">
                      <img
                        src={dish.image}
                        alt={dish.title}
                        className="bite-image-lift h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-white">
                      {dish.title}
                    </h3>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center gap-2">
                {dishes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`bite-interactive h-3 w-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300 ${
                      index === activeIndex
                        ? "scale-125 bg-orange-500"
                        : "bg-white/35 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    type="button"
                  />
                ))}
              </div>
            </div>

            <article
              id="about"
              className="bite-fade-up rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:border-orange-300/30 hover:bg-white/[0.07]"
              style={{ animationDelay: "220ms" }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
                    About Restaurant
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    Elegant Dining Experience Since 2010
                  </h3>
                </div>
              </div>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
                Since 2010, we have been combining premium ingredients, creative
                presentation, and a warm atmosphere to create unforgettable
                dining experiences. Our chefs prepare each dish with care so
                every meal feels relaxed, special, and satisfying.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="bite-fade-up overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/20">
          <iframe
            title="Google Map"
            src={mapEmbedUrl}
            className="h-[320px] w-full border-0 sm:h-[380px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
