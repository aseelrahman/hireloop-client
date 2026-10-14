import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  HiOutlineCheckCircle,
  HiOutlineMail,
  HiOutlineArrowRight,
  HiOutlineHome,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from "react-icons/hi";
import { createSubscription } from "@/lib/actions/subscriptions";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/plans");
  }

  const {
    status,
    customer_details: { email: customerEmail, name: customerName },
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    redirect("/plans");
  }

    if (status == "complete") {
        const subsInfo = {
            email: customerEmail,
            planId: metadata.planId
        }
        
        const result = await createSubscription(subsInfo);

        console.log(result);
  }

  // update the user table about the new plan

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090b] px-4 py-20 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-[#5C53FE]/15 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-87.5 w-87.5 rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      {/* Success Card */}
      <div className="relative z-10 w-full max-w-xl">
        <div className="rounded-3xl border border-white/10 bg-[#121216]/90 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#5C53FE]/20 blur-2xl" />

              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#5C53FE]/30 bg-[#5C53FE]/10">
                <HiOutlineCheckCircle className="h-14 w-14 text-[#8D86FF]" />
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#5C53FE]/30 bg-[#5C53FE]/10 px-4 py-2 text-xs font-medium text-[#A6A0FF]">
              <HiOutlineSparkles className="text-base" />
              Checkout completed
            </div>

            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              You&apos;re all set!
              <span className="block bg-linear-to-r from-[#A6A0FF] to-[#5C53FE] bg-clip-text text-transparent">
                Welcome aboard.
              </span>
            </h1>

            <p className="mx-auto max-w-md text-sm leading-7 text-zinc-400 sm:text-base">
              {customerName ? `Thank you, ${customerName}! ` : "Thank you! "}
              Your checkout was completed successfully. We&apos;re excited to
              have you with us.
            </p>
          </div>

          {/* Divider */}
          <div className="my-9 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          {/* Confirmation Details */}
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5">
                <HiOutlineMail className="text-xl text-[#A6A0FF]" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-200">
                  Email confirmation
                </h3>

                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  A confirmation email will be sent to
                </p>

                <p className="mt-1 break-all text-sm font-medium text-white">
                  {customerEmail || "your registered email"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5">
                <HiOutlineShieldCheck className="text-xl text-[#A6A0FF]" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-200">
                  Secure checkout
                </h3>

                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  Your checkout was securely processed through Stripe.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-10 space-y-3">
            <Link
              href="/dashboard"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#5C53FE] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#4B43E8] hover:shadow-lg hover:shadow-[#5C53FE]/25"
            >
              Go to Dashboard
              <HiOutlineArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-medium text-zinc-300 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <HiOutlineHome className="text-lg" />
              Back to Homepage
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-7 text-center text-xs text-zinc-500">
          Need help?{" "}
          <a
            href="mailto:support@yourdomain.com"
            className="font-medium text-[#A6A0FF] transition-colors hover:text-white"
          >
            Contact Support
          </a>
        </p>
      </div>
    </main>
  );
}
