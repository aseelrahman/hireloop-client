'use client'
import Image from "next/image";
import { Card } from "@heroui/react";
import {
  HiOutlineBriefcase,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineStar,
} from "react-icons/hi";

const stats = [
  {
    value: "50K",
    label: "Active Jobs",
    icon: HiOutlineBriefcase,
  },
  {
    value: "12K",
    label: "Companies",
    icon: HiOutlineOfficeBuilding,
  },
  {
    value: "2M",
    label: "Job Seekers",
    icon: HiOutlineUserGroup,
  },
  {
    value: "97%",
    label: "Satisfaction Rate",
    icon: HiOutlineStar,
  },
];

const StatsSection = () => {
  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-28 lg:py-36">
      {/* Globe Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: "url('/images/globe.png')" }}
      />

      {/* Extra background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 size-125 -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <h2 className="text-2xl font-medium leading-tight tracking-tight text-white/90 md:text-4xl lg:text-4xl">
            Assisting over{" "}
            <span className="text-white">15,000 job seekers</span>
            <br className="hidden sm:block" /> find their dream positions.
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {stats.map(({ value, label, icon: Icon }) => (
            <Card
              key={label}
              className="group min-h-64 border border-white/10 bg-black/80 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:bg-zinc-950/90 md:min-h-72"
            >
              <div className="flex h-full flex-col justify-between">
                {/* Icon */}
                <div className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:text-accent">
                  <Icon className="size-5" />
                </div>

                {/* Number */}
                <div>
                  <h3 className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
                    {value}
                  </h3>

                  <p className="mt-5 text-base text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
                    {label}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
