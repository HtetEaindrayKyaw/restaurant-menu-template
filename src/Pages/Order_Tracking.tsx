import { useMemo, useState } from "react";
import {
  FaCircleCheck,
  FaClock,
  FaKitchenSet,
  FaLocationDot,
  FaMotorcycle,
  FaTruckFast,
} from "react-icons/fa6";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

type TrackingStep = {
  id: number;
  title: string;
  description: string;
  eta: string;
};

const steps: TrackingStep[] = [
  {
    id: 1,
    title: "Order Confirmed",
    description: "Your order has been received and is now being processed.",
    eta: "Now",
  },
  {
    id: 2,
    title: "Preparing in Kitchen",
    description: "Our chefs are preparing your food with fresh ingredients.",
    eta: "10 - 20 min",
  },
  {
    id: 3,
    title: "Ready for Pickup",
    description: "The food is packed and waiting for the rider.",
    eta: "20 - 25 min",
  },
  {
    id: 4,
    title: "Rider Assigned",
    description: "A delivery rider is on the way to the restaurant.",
    eta: "25 - 30 min",
  },
  {
    id: 5,
    title: "On the Way",
    description: "Your food is on the way to your location.",
    eta: "30 - 45 min",
  },
  {
    id: 6,
    title: "Arriving Soon",
    description: "The rider is close to your address.",
    eta: "5 - 10 min",
  },
  {
    id: 7,
    title: "Delivered",
    description: "Enjoy your meal. Thank you for ordering with us.",
    eta: "Done",
  },
];

const orderItem = {
  name: "Mixed Grilled Platter",
  price: 24,
  quantity: 1,
  image:
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
};

export default function Order_Tracking() {
  const [activeStep] = useState(2);

  const currentStep = useMemo(() => {
    return steps[activeStep - 1];
  }, [activeStep]);

  const subtotal = orderItem.price * orderItem.quantity;
  const tax = Number((subtotal * 0.08).toFixed(2));
  const deliveryFee = 4.5;
  const total = Number((subtotal + tax + deliveryFee).toFixed(2));

  return (
    <main className="min-h-screen bg-[#2b1d1b] text-white">
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <SiteNav />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
                Order Tracking
              </p>
              <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Your food is being prepared
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                This page shows the delivery progress from the kitchen to your
                door, similar to Foodpanda or Grab.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#2c1f1c] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                Estimated Delivery
              </p>
              <p className="mt-2 text-3xl font-bold text-orange-300">
                25 - 35 min
              </p>
              <p className="mt-1 text-sm text-white/60">
                From restaurant to customer
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-orange-500/15 text-orange-300">
              <FaKitchenSet className="text-xl" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {currentStep.title}
              </p>
              <p className="text-sm text-white/60">{currentStep.description}</p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#2c1f1c] p-5">
            <div className="flex items-center justify-between">
              {steps.map((step) => {
                const isActive = step.id <= activeStep;
                const isCurrent = step.id === activeStep;

                return (
                  <div key={step.id} className="flex flex-1 flex-col items-center">
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-full border text-sm font-semibold transition ${
                        isActive
                          ? "border-orange-400 bg-orange-500 text-white"
                          : "border-white/20 bg-white/5 text-white/45"
                      } ${isCurrent ? "shadow-lg shadow-orange-500/25" : ""}`}
                    >
                      {step.id}
                    </div>
                    <div className="mt-2 text-center">
                      <p
                        className={`text-[11px] font-semibold ${
                          isActive ? "text-white" : "text-white/45"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>

                    {step.id !== steps.length && (
                      <div
                        className={`mt-5 h-1 w-full rounded-full ${
                          step.id < activeStep ? "bg-orange-400" : "bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-[#2c1f1c] p-5">
              <div className="flex items-center gap-3">
                <FaKitchenSet className="text-orange-300" />
                <p className="text-sm font-semibold text-white">Kitchen</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Preparing fresh food now.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#2c1f1c] p-5">
              <div className="flex items-center gap-3">
                <FaMotorcycle className="text-orange-300" />
                <p className="text-sm font-semibold text-white">Rider</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Will arrive after pickup.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#2c1f1c] p-5">
              <div className="flex items-center gap-3">
                <FaLocationDot className="text-orange-300" />
                <p className="text-sm font-semibold text-white">Delivery</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Heading to your address.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-[#2c1f1c] p-5">
            <h2 className="text-lg font-bold text-white">Delivery Status</h2>
            <div className="mt-4 space-y-4">
              {steps.map((step) => {
                const completed = step.id < activeStep;
                const active = step.id === activeStep;

                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-4 rounded-2xl p-4 transition ${
                      active ? "bg-white/5" : ""
                    }`}
                  >
                    <div
                      className={`mt-0.5 grid h-10 w-10 place-items-center rounded-full ${
                        completed
                          ? "bg-green-500/15 text-green-400"
                          : active
                          ? "bg-orange-500/15 text-orange-300"
                          : "bg-white/5 text-white/35"
                      }`}
                    >
                      {completed ? (
                        <FaCircleCheck />
                      ) : active ? (
                        <FaClock />
                      ) : (
                        <span className="text-xs font-bold">{step.id}</span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-white">{step.title}</p>
                        <span className="shrink-0 text-xs text-white/50">
                          {step.eta}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-white/65">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <img
                src={orderItem.image}
                alt={orderItem.name}
                className="h-20 w-20 rounded-2xl object-cover"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                  Order Summary
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">
                  {orderItem.name}
                </h3>
                <p className="mt-1 text-sm text-white/60">
                  {orderItem.quantity} item
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3 rounded-3xl border border-white/10 bg-[#2c1f1c] p-5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Subtotal</span>
                <span className="font-semibold text-white">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Tax</span>
                <span className="font-semibold text-white">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Delivery Fee</span>
                <span className="font-semibold text-white">
                  ${deliveryFee.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <span className="font-semibold text-white">Total</span>
                <span className="text-lg font-bold text-orange-300">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <FaLocationDot className="text-orange-300" />
              <h3 className="text-lg font-bold text-white">Delivery Address</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/70">
              123 Food Street, City Center, Yangon
            </p>

            <div className="mt-6 rounded-3xl border border-white/10 bg-[#2c1f1c] p-5">
              <p className="text-sm font-semibold text-white">Rider Update</p>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Once the rider leaves the restaurant, you can expect delivery
                in about 15 to 30 minutes depending on distance and traffic.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-orange-500/15 to-white/5 p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <FaTruckFast className="text-2xl text-orange-300" />
              <div>
                <p className="text-sm font-semibold text-white">
                  Estimated Arrival
                </p>
                <p className="text-sm text-white/60">
                  Rider pickup to customer door
                </p>
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-orange-300">
              25 - 35 min
            </p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              If the rider is already out of the restaurant, delivery time is
              usually around 15 to 25 minutes based on location.
            </p>
          </div>
        </aside>
      </section>

      <SiteFooter />
    </main>
  );
}