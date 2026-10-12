import React from "react";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import {
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineCurrencyDollar,
  HiArrowRight,
} from "react-icons/hi";
import Image from "next/image";

export default function JobCard({ job }) {
  if (!job) return null;

  const formattedMin = job.salary?.min?.toLocaleString();
  const formattedMax = job.salary?.max?.toLocaleString();
  const currencySymbol =
    job.salary?.currency === "USD" ? "$" : `${job.salary?.currency} `;

  return (
    <Card className="max-w-md bg-zinc-950 text-zinc-100 p-6 rounded-3xl border border-zinc-800/80 shadow-2xl">
      <Card.Header className="flex flex-col items-start gap-4 pb-2">
        {/* Company Header: Logo & Name */}
        <div className="flex items-center gap-3">
          {job.companyLogo ? (
            <div className="relative w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
              <Image
                src={job.companyLogo}
                              alt={`${job.company} logo`}
                              width={50}
                              height={50}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center font-bold text-sm text-zinc-300">
              {job.company?.[0]}
            </div>
          )}

          <span className="text-sm font-medium text-zinc-400">
            {job.company}
          </span>
        </div>

        {/* Job Title & Short Description */}
        <div className="space-y-2">
          <Card.Title className="text-2xl font-bold tracking-tight text-white">
            {job.title}
          </Card.Title>

          <Card.Description className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
            {job.description?.responsibilities}
          </Card.Description>
        </div>
      </Card.Header>

      <Card.Content className="py-3">
        {/* Info Badges */}
        <div className="flex flex-wrap gap-2.5">
          <div className="flex items-center gap-2 bg-zinc-900 text-accent px-3.5 py-2 rounded-full text-xs font-semibold border border-zinc-800/60">
            <HiOutlineLocationMarker className="text-sm" />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2 bg-zinc-900 text-accent px-3.5 py-2 rounded-full text-xs font-semibold capitalize border border-zinc-800/60">
            <HiOutlineBriefcase className="text-sm" />
            <span>{job.isRemote ? "Remote" : job.type}</span>
          </div>

          <div className="flex items-center gap-2 bg-zinc-900 text-accent px-3.5 py-2 rounded-full text-xs font-semibold border border-zinc-800/60">
            <HiOutlineCurrencyDollar className="text-sm" />
            <span>
              {currencySymbol}
              {formattedMin}-{currencySymbol}
              {formattedMax}/year
            </span>
          </div>
        </div>
      </Card.Content>

      <Card.Footer className="pt-4 flex items-center justify-between">
        <Link
          href={`/jobs/${job._id}`}
          className="bg-transparent text-white font-medium hover:text-accent p-0 h-auto min-w-0 flex items-center gap-2 text-base transition-colors group"
        >
          Apply Now
          <HiArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Card.Footer>
    </Card>
  );
}
