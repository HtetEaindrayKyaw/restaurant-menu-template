import { useEffect, useMemo, useState } from "react";
import {
  FaArrowRight,
  FaCheck,
  FaChevronLeft,
  FaClock,
  FaLocationDot,
  FaRegCalendarDays,
  FaUsers,
  FaXmark,
} from "react-icons/fa6";

import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

type TableOption = {
  id: string;
  label: string;
  seats: number;
  area: "Window" | "Center";
  available: boolean;
};

type Step = 1 | 2 | 3;

const tables: TableOption[] = [
  { id: "T1", label: "Table 1", seats: 2, area: "Window", available: true },
  { id: "T2", label: "Table 2", seats: 2, area: "Center", available: true },
  { id: "T3", label: "Table 3", seats: 4, area: "Window", available: true },
  { id: "T4", label: "Table 4", seats: 4, area: "Center", available: true },
  { id: "T5", label: "Table 5", seats: 6, area: "Window", available: false },
  { id: "T6", label: "Table 6", seats: 6, area: "Center", available: true },
  { id: "T7", label: "Table 7", seats: 8, area: "Window", available: true },
  { id: "T8", label: "Table 8", seats: 8, area: "Center", available: false },
];

const heroImage =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80";

const slideshowImages = [
  "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80",
];

export default function Book_Table() {
  const [open, setOpen] = useState(false);
  const [showLeavePrompt, setShowLeavePrompt] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [activeSlide, setActiveSlide] = useState(0);

  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [guests, setGuests] = useState<number>(2);
  const [selectedTable, setSelectedTable] = useState<TableOption | null>(null);
  const [note, setNote] = useState("");

  const availableTables = useMemo(() => {
    return tables.filter((table) => table.available && table.seats >= guests);
  }, [guests]);

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (open && !showSuccess) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [open, showSuccess]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);

  const resetFlow = () => {
    setOpen(false);
    setShowLeavePrompt(false);
    setShowSuccess(false);
    setStep(1);
    setBookingDate("");
    setBookingTime("");
    setGuests(2);
    setSelectedTable(null);
    setNote("");
  };

  const goNext = () => {
    if (step === 1) {
      if (!bookingDate || !bookingTime) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!selectedTable) return;
      setStep(3);
      return;
    }

    setShowSuccess(true);
  };

  const goBack = () => {
    if (step === 1) {
      setShowLeavePrompt(true);
      return;
    }

    setStep((prev) => (prev - 1) as Step);
  };

  return (
    <main className="min-h-screen bg-[#2b1d1b] text-white">
          <section className="mx-auto max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
    <SiteNav />
  </section>
      <section
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(247,225,224,.92), rgba(247,225,224,.75)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto grid min-h-[540px] max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="max-w-xl text-[#2b1d1b]">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-1 text-xs font-semibold text-white shadow-md">
              <FaLocationDot />
              Premium Restaurant
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Premium Dining Experience
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-[#4f3d3d]">
              Reserve your table in seconds and enjoy a premium dining
              experience with your family and friends.
            </p>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-orange-400"
            >
              Book A Table <FaArrowRight />
            </button>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="overflow-hidden rounded-[2rem] shadow-2xl">
              <img
                src={heroImage}
                alt="Restaurant interior"
                className="h-[360px] w-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
                Restaurant Gallery
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Discover our dining spaces
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                Enjoy a quick slideshow of our restaurant ambiance, seating style,
                and premium dining corners.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-[#2c1f1c] shadow-2xl">
              <img
                src={slideshowImages[activeSlide]}
                alt={`Restaurant view ${activeSlide + 1}`}
                className="h-[420px] w-full object-cover transition duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-5 text-white">
                <p className="text-sm uppercase tracking-[0.25em] text-orange-300">
                  View {activeSlide + 1} of {slideshowImages.length}
                </p>
                <p className="mt-2 max-w-2xl text-sm text-white/90">
                  A modern restaurant interior designed for memorable meals.
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              {slideshowImages.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`overflow-hidden rounded-3xl border p-0 transition ${
                    index === activeSlide
                      ? "border-orange-400 shadow-lg"
                      : "border-white/10 hover:border-orange-300"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-28 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {open && !showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm">
          <div className="relative w-full max-w-[980px] max-h-[90vh] overflow-y-auto overflow-hidden rounded-[28px] bg-[#f5f4f7] text-[#222] shadow-2xl">
            <button
              type="button"
              onClick={() => setShowLeavePrompt(true)}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white text-[#222] shadow-sm transition hover:bg-gray-100"
              aria-label="Close booking"
            >
              <FaXmark />
            </button>

            <div className="p-6 sm:p-7">
              <h2 className="text-2xl font-semibold text-[#222]">
                Reserve a Table
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#666]">
                Planning a night out? Let us know when you&apos;re coming and
                we&apos;ll have a table waiting for you.
              </p>

              <div className="mt-6 flex items-center justify-between">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold transition ${
                      step >= num
                        ? "border-indigo-400 bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                        : "border-[#d6d6d6] bg-white text-[#666]"
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#333]">
                      Booking Date
                    </span>
                    <div className="flex items-center rounded-xl border border-[#d7d7d7] bg-white px-3 py-2">
                      <FaRegCalendarDays className="text-[#888]" />
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="ml-3 w-full bg-transparent text-sm outline-none"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#333]">
                      Booking Time
                    </span>
                    <div className="flex items-center rounded-xl border border-[#d7d7d7] bg-white px-3 py-2">
                      <FaClock className="text-[#888]" />
                      <input
                        type="time"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="ml-3 w-full bg-transparent text-sm outline-none"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#333]">
                      Number of Guests
                    </span>
                    <div className="flex items-center rounded-xl border border-[#d7d7d7] bg-white px-3 py-2">
                      <FaUsers className="text-[#888]" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="ml-3 w-full bg-transparent text-sm outline-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>
                            {n} person{n > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-[#222]">
                        Available Tables
                      </p>
                      <p className="text-xs text-green-600">
                        {availableTables.length} tables available
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {tables.map((table) => {
                        const canUse = table.available && table.seats >= guests;
                        const active = selectedTable?.id === table.id;

                        return (
                          <button
                            key={table.id}
                            type="button"
                            disabled={!canUse}
                            onClick={() => canUse && setSelectedTable(table)}
                            className={`min-h-[120px] rounded-2xl border p-3 text-left transition ${
                              active
                                ? "border-indigo-400 bg-indigo-50 shadow-lg"
                                : canUse
                                ? "border-[#e6e6e6] bg-white hover:-translate-y-0.5 hover:shadow-md"
                                : "cursor-not-allowed border-[#ececec] bg-[#f4f4f4] opacity-45"
                            }`}
                          >
                            <div className="mb-2 flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-semibold text-[#222]">
                                  {table.label}
                                </p>
                                <p className="mt-1 text-xs text-[#777]">
                                  {table.seats} seats
                                </p>
                              </div>
                              <div
                                className={`h-3 w-3 rounded-full ${
                                  canUse ? "bg-green-500" : "bg-gray-400"
                                }`}
                              />
                            </div>

                            <div className="rounded-2xl bg-[#f8fbff] p-2 text-xs text-[#555]">
                              <p>Near {table.area.toLowerCase()}</p>
                              <p className="mt-1">
                                {canUse ? "Available now" : "Not available"}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="rounded-3xl border border-[#e5e5e5] bg-white p-5 shadow-sm">
                      <p className="text-sm font-semibold text-[#222]">
                        Special Request
                      </p>
                      <p className="mt-1 text-xs text-[#777]">
                        Birthday, window seats, VIP area, or anything else.
                      </p>

                      <textarea
                        rows={8}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Birthday, Window Seats, VIP area"
                        className="mt-4 w-full rounded-2xl border border-[#d7d7d7] bg-white px-3 py-3 text-sm outline-none"
                      />
                    </div>

                    <div className="mt-5 flex justify-end">
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={!selectedTable}
                        className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="mt-6 rounded-3xl border border-[#e5e5e5] bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-[#222]">
                    Booking Summary
                  </p>

                  <div className="mt-4 space-y-3 text-sm text-[#555]">
                    <div className="flex justify-between border-b border-[#eee] pb-2">
                      <span className="font-medium text-[#333]">Date</span>
                      <span>{bookingDate || "—"}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#eee] pb-2">
                      <span className="font-medium text-[#333]">Time</span>
                      <span>{bookingTime || "—"}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#eee] pb-2">
                      <span className="font-medium text-[#333]">Guests</span>
                      <span>{guests}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#eee] pb-2">
                      <span className="font-medium text-[#333]">Table</span>
                      <span>{selectedTable?.label || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-[#333]">Area</span>
                      <span>{selectedTable?.area || "—"}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d8d8d8] bg-white px-5 py-3 text-sm font-semibold text-[#333] transition hover:bg-[#f5f5f5]"
                >
                  <FaChevronLeft /> {step === 1 ? "Leave Page" : "Back"}
                </button>

                {step !== 2 && (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={
                      (step === 1 && (!bookingDate || !bookingTime)) ||
                      (step === 3 && !selectedTable)
                    }
                    className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {step === 3 ? "Confirm Booking" : "Next"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
          <div className="w-full max-w-[520px] rounded-[28px] bg-white p-6 text-center text-[#222] shadow-2xl animate-[pulse_0.7s_ease-in-out_1]">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-400/15">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-400 text-white">
                <FaCheck className="text-2xl" />
              </div>
            </div>

            <h2 className="mt-6 text-3xl font-bold">Booking Success</h2>
            <p className="mt-3 text-sm leading-6 text-[#666]">
              Your reservation has been confirmed successfully. A confirmation
              email and booking details have been sent to you.
            </p>

            <div className="mt-6 rounded-3xl border border-[#e7edf7] bg-[#eef4fb] p-5 text-left">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm">
                  <span className="text-xs font-bold text-orange-500">BM</span>
                </div>
                <div>
                  <p className="font-semibold">Bite Me Restaurant</p>
                  <p className="text-xs text-[#667]">
                    Table {selectedTable?.label || "—"} • {guests} Guests
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-[#444]">
                <div className="flex justify-between border-t border-[#dce6f1] pt-3">
                  <span className="font-medium">Booking Date</span>
                  <span>{bookingDate || "—"}</span>
                </div>
                <div className="flex justify-between border-t border-[#dce6f1] pt-3">
                  <span className="font-medium">Booking Time</span>
                  <span>{bookingTime || "—"}</span>
                </div>
                <div className="flex justify-between border-t border-[#dce6f1] pt-3">
                  <span className="font-medium">Note</span>
                  <span>{note || "—"}</span>
                </div>
              </div>
            </div>

            <button
                type="button"
                onClick={() => {
                    resetFlow();
                    window.location.href = "/order-menu";
                }}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
                >
                View Menu
            </button>
          </div>
        </div>
      )}

      {showLeavePrompt && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-[560px] rounded-[24px] bg-white p-6 text-[#222] shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Don&apos;t lose your table!</h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-[#666]">
                  You&apos;re just a couple of steps away from securing your fine
                  dining experience. If you leave now, your progress won&apos;t be
                  saved.
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-3xl text-orange-500">
                <FaRegCalendarDays />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <a
                href="/book_table"
                className="inline-flex items-center justify-center rounded-full border border-[#ddd] bg-white px-6 py-3 text-sm font-semibold text-[#555] transition hover:bg-[#f4f4f4]"
              >
                Leave Page
              </a>

              <button
                type="button"
                onClick={() => setShowLeavePrompt(false)}
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
              >
                Keep Reserving
              </button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </main>
  );
}