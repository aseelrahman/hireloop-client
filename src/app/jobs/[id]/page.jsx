import { getJobById } from "@/lib/api/jobs";
import React from "react";
import Link from "next/link";
import {
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineCurrencyDollar,
  HiOutlineCalendar,
  HiArrowLeft,
  HiCheckCircle,
  HiBriefcase,
  HiGift,
} from "react-icons/hi";
import Image from "next/image";

export default async function JobDetailPage({ params }) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8 md:p-12 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <p className="text-zinc-400 mb-6">
          The position you are looking for might have been removed or does not
          exist.
        </p>
        <Link
          href="/jobs"
          className="text-accent hover:underline flex items-center gap-2"
        >
          <HiArrowLeft /> Back to Jobs
        </Link>
      </main>
    );
  }

  const formattedMin = job.salary?.min?.toLocaleString();
  const formattedMax = job.salary?.max?.toLocaleString();
  const currencySymbol =
    job.salary?.currency === "USD" ? "$" : `${job.salary?.currency} `;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Navigation */}
        <div>
          <Link
            href="/jobs"
            className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm transition-colors w-fit"
          >
            <HiArrowLeft /> Back to all listings
          </Link>
        </div>

        {/* Header Card */}
        <div className="border border-zinc-800 p-8 rounded-3xl bg-zinc-900/30 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Company Logo & Title info */}
            <div className="flex items-start gap-4">
              {job.companyLogo ? (
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center p-2 shrink-0">
                  <Image
                    src={job.companyLogo}
                    alt={`${job.company} logo`}
                    height={100}
                    width={100}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl border border-zinc-800 bg-zinc-900 flex items-center justify-center font-bold text-lg text-zinc-300 shrink-0">
                  {job.company?.[0]}
                </div>
              )}

              <div>
                <span className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
                  {job.company}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-1">
                  {job.title}
                </h1>
              </div>
            </div>

            {/* Apply Button */}
            <Link
              href={`/apply/${job._id}`}
              className="bg-white text-zinc-950 font-semibold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors text-center shadow-lg"
            >
              Apply Now
            </Link>
          </div>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-800/80">
            <div className="flex items-center gap-2 text-accent px-4 py-2 rounded-full text-xs font-semibold border border-zinc-800 bg-zinc-900/50">
              <HiOutlineLocationMarker className="text-sm" />
              <span>{job.location}</span>
            </div>

            <div className="flex items-center gap-2 text-accent px-4 py-2 rounded-full text-xs font-semibold capitalize border border-zinc-800 bg-zinc-900/50">
              <HiOutlineBriefcase className="text-sm" />
              <span>{job.isRemote ? "Remote" : job.type}</span>
            </div>

            <div className="flex items-center gap-2 text-accent px-4 py-2 rounded-full text-xs font-semibold border border-zinc-800 bg-zinc-900/50">
              <HiOutlineCurrencyDollar className="text-sm" />
              <span>
                {currencySymbol}
                {formattedMin} - {currencySymbol}
                {formattedMax} / year
              </span>
            </div>

            <div className="flex items-center gap-2 text-zinc-400 px-4 py-2 rounded-full text-xs font-semibold border border-zinc-800 bg-zinc-900/50">
              <HiOutlineCalendar className="text-sm text-zinc-500" />
              <span>Apply by: {job.deadline}</span>
            </div>
          </div>
        </div>

        {/* Job Content Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Left Column (Responsibilities & Requirements) */}
          <div className="md:col-span-2 space-y-8">
            {/* Responsibilities */}
            <div className="border border-zinc-800 p-6 rounded-3xl bg-zinc-900/20 space-y-3">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <HiBriefcase className="text-accent" /> Responsibilities
              </h2>
              <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                {job.description?.responsibilities}
              </p>
            </div>

            {/* Requirements */}
            <div className="border border-zinc-800 p-6 rounded-3xl bg-zinc-900/20 space-y-3">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <HiCheckCircle className="text-accent" /> Requirements &
                Qualifications
              </h2>
              <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                {job.description?.requirements}
              </p>
            </div>

            {/* Benefits */}
            <div className="border border-zinc-800 p-6 rounded-3xl bg-zinc-900/20 space-y-3">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <HiGift className="text-accent" /> Benefits & Perks
              </h2>
              <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                {job.description?.benefits}
              </p>
            </div>
          </div>

          {/* Right Column (Sidebar Summary Card) */}
          <div className="space-y-6">
            <div className="border border-zinc-800 p-6 rounded-3xl bg-zinc-900/30 space-y-4 sticky top-6">
              <h3 className="text-lg font-semibold text-white">Job Overview</h3>

              <div className="space-y-3 text-sm text-zinc-300">
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Category</span>
                  <span className="capitalize font-medium">{job.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Employment Type</span>
                  <span className="capitalize font-medium">{job.type}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Location Type</span>
                  <span className="font-medium">
                    {job.isRemote ? "Remote" : "On-site"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Status</span>
                  <span className="text-emerald-400 capitalize font-medium">
                    {job.status}
                  </span>
                </div>
              </div>

              <Link
                href={`/apply/${job._id}`}
                className="w-full bg-white text-zinc-950 font-semibold py-3 rounded-2xl hover:bg-zinc-200 transition-colors text-center block shadow-md mt-4"
              >
                Apply For This Role
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
