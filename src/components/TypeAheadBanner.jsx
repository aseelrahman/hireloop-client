"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Chip } from "@heroui/react";
import { FaBriefcase, FaArrowRight, FaMagnifyingGlass } from "react-icons/fa6";

const DEFAULT_ROLES = [
  "Software Engineering",
  "Product Design",
  "Data Science",
  "Marketing & Growth",
  "DevOps & Cloud",
  "Executive Leadership",
];

const POPULAR_SEARCHES = [
  "Remote",
  "Full-time",
  "Frontend",
  "Product Manager",
  "Entry Level",
];

export default function TypeAheadBanner({
  roles = DEFAULT_ROLES,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseDuration = 2200,
}) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetText = roles[currentRoleIndex];
    const isWordComplete = !isDeleting && currentText === targetText;
    const isWordDeleted = isDeleting && currentText === "";

    let delay = isDeleting ? deletingSpeed : typingSpeed;
    if (isWordComplete) delay = pauseDuration;

    const timer = setTimeout(() => {
      if (isWordComplete) {
        // Pause is over, start deleting
        setIsDeleting(true);
      } else if (isWordDeleted) {
        // Move on to the next word
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        // Type or delete one character
        setCurrentText(
          isDeleting
            ? targetText.substring(0, currentText.length - 1)
            : targetText.substring(0, currentText.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    currentRoleIndex,
    roles,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <section className="relative overflow-hidden bg-[#030712] py-24 text-white sm:py-32">
      {/* Background Ambient Glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-10 h-100 w-175 -translate-x-1/2 rounded-full bg-indigo-600/30 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Announcement Chip */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <Chip className="border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 font-medium text-indigo-400">
            <FaBriefcase className="mr-1 text-xs" />
            Over 15,000+ Active Job Postings
          </Chip>
        </motion.div>

        {/* Headline with typeahead role */}
        <h1 className="mt-8 flex min-h-35 flex-col items-center justify-center text-4xl font-extrabold tracking-tight sm:min-h-45 sm:text-6xl">
          <span className="block text-slate-100">
            Find your dream career in
          </span>

          <motion.span
            className="mt-2 inline-flex items-center bg-linear-to-r from-indigo-400 via-sky-300 to-indigo-300 bg-clip-text pb-2 leading-tight text-transparent"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
          >
            <span>{currentText}</span>

            {/* Blinking cursor */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="ml-1 select-none font-normal text-indigo-400"
            >
              |
            </motion.span>
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-lg"
        >
          Connect with top-tier companies, showcase your skills, and apply to
          thousands of verified remote and full-time positions.
        </motion.p>

        {/* Action Buttons (real links styled as buttons) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/jobs"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-colors hover:bg-indigo-500 sm:w-auto"
          >
            <FaMagnifyingGlass className="text-sm" />
            Explore All Jobs
          </Link>

          <Link
            href="/post-a-job"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-8 py-3 font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-900 sm:w-auto"
          >
            Post a Job
            <FaArrowRight className="text-xs" />
          </Link>
        </motion.div>

        {/* Popular searches */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400"
        >
          <span className="mr-1 text-slate-500">Popular Searches:</span>
          {POPULAR_SEARCHES.map((tag) => (
            <Link
              key={tag}
              href={`/jobs?query=${encodeURIComponent(tag)}`}
              className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 transition-colors hover:border-indigo-500/50 hover:text-indigo-300"
            >
              {tag}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
