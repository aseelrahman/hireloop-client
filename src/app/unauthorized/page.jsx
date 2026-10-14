'use client'
import Link from "next/link";
import {
  HiOutlineLockClosed,
  HiOutlineArrowLeft,
  HiOutlineHome,
} from "react-icons/hi2";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 text-white">
      <div className="text-center max-w-md space-y-6">
        {/* Icon / Badge */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-900 border border-gray-800 shadow-xl text-red-500">
          <HiOutlineLockClosed className="h-10 w-10" />
        </div>

        {/* Heading & Message */}
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wider text-red-400 uppercase bg-red-950/50 border border-red-900/50 px-3 py-1 rounded-full">
            403 - Unauthorized
          </span>
          <h1 className="text-3xl font-bold tracking-tight">Access Denied</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Sorry, you don&apos;t have the necessary permissions to view this
            page. Please log in with an authorized account or return home.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white text-gray-950 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100"
          >
            <HiOutlineHome className="h-4 w-4" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 text-gray-200 border border-gray-800 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-gray-800 hover:text-white"
          >
            <HiOutlineArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
