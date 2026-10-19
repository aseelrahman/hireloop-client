import Link from "next/link";
import {
  HiOutlineShieldExclamation,
  HiArrowLeft,
  HiOutlineHome,
} from "react-icons/hi";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-zinc-950 px-4 py-12 text-white sm:px-6">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#5C53FE]/20 bg-[#5C53FE]/10">
          <HiOutlineShieldExclamation className="h-10 w-10 text-[#5C53FE]" />
        </div>

        {/* Error code */}
        <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-[#8B83FF] uppercase">
          Error 403
        </p>

        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Access Forbidden
        </h1>

        <p className="mx-auto mb-9 max-w-md text-sm leading-7 text-zinc-400 sm:text-base">
          You don&apos;t have permission to access this page. If you believe this is
          a mistake, please contact your administrator.
        </p>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#5C53FE] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#4B42E8] hover:shadow-lg hover:shadow-[#5C53FE]/20"
          >
            <HiArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
          >
            <HiOutlineHome className="h-4 w-4" />
            Dashboard
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-12 text-xs text-zinc-600">
          403 Forbidden · You are not authorized to view this resource.
        </p>
      </div>
    </main>
  );
}
