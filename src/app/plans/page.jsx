"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FaCheck, FaUser, FaBuilding, FaArrowRight } from "react-icons/fa";

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState("seekers"); // 'seekers' | 'recruiters'

  const seekersPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Essential tools to kickstart your job hunt.",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic profile",
        "Email alerts",
      ],
      cta: "Current Plan",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "For active job seekers looking for an edge.",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Application tracking",
        "Salary insights",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Premium",
      price: "$39",
      period: "/month",
      description: "Maximum visibility and priority access.",
      features: [
        "Everything in Pro",
        "Unlimited applications",
        "Profile boost to recruiters",
        "Early access to new jobs",
        "Priority support",
      ],
      cta: "Go Premium",
      popular: false,
    },
  ];

  const recruitersPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Great for a company's first year of hiring.",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management",
        "Standard listing visibility",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Growth",
      price: "$49",
      period: "/month",
      description: "For growing teams scaling up hiring efforts.",
      features: [
        "Up to 10 active job posts",
        "Applicant tracking",
        "Basic analytics",
        "Email support",
      ],
      cta: "Choose Growth",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$149",
      period: "/month",
      description: "Advanced hiring suite for high-volume recruitment.",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics dashboard",
        "Featured job listings",
        "Team collaboration",
        "Custom branding & priority support",
      ],
      cta: "Contact Enterprise",
      popular: false,
    },
  ];

  const currentPlans = activeTab === "seekers" ? seekersPlans : recruitersPlans;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col items-center gap-10">
      {/* Page Header */}
      <div className="text-center flex flex-col gap-3 max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Simple, transparent pricing
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
          Choose the right plan designed to fit your career goals or recruitment
          needs.
        </p>
      </div>

      {/* Tab Switcher Toggle */}
      <div className="flex items-center p-1 border border-zinc-200 dark:border-zinc-800 rounded-full bg-zinc-900/50">
        <button
          onClick={() => setActiveTab("seekers")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === "seekers"
              ? "border border-accent text-zinc-900 dark:text-white shadow-sm bg-zinc-800/80"
              : "text-zinc-400 hover:text-white border border-transparent"
          }`}
        >
          <FaUser className="text-xs text-accent" /> For Job Seekers
        </button>
        <button
          onClick={() => setActiveTab("recruiters")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === "recruiters"
              ? "border border-accent text-zinc-900 dark:text-white shadow-sm bg-zinc-800/80"
              : "text-zinc-400 hover:text-white border border-transparent"
          }`}
        >
          <FaBuilding className="text-xs text-accent" /> For Recruiters
        </button>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-4">
        {currentPlans.map((plan, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between p-6 rounded-2xl relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent border ${
              plan.popular
                ? "border-accent shadow-md ring-1 ring-accent/30"
                : "border-zinc-800"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 bg-black dark:bg-black px-3 py-0.5 rounded-full border border-accent">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  Most Popular
                </span>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {plan.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 min-h-8">
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
                  {plan.price}
                </span>
                <span className="text-sm text-zinc-500">{plan.period}</span>
              </div>

              <hr className="border-zinc-800 transition-colors" />

              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Key Features
                </span>
                <ul className="flex flex-col gap-2.5">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-zinc-300"
                    >
                      <FaCheck className="text-accent text-xs mt-1 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <Button
                as={Link}
                href="/signup"
                color={plan.popular ? "primary" : "default"}
                variant={plan.popular ? "solid" : "bordered"}
                className={`w-full flex items-center justify-center gap-2 transition-all active:scale-95 ${
                  plan.popular
                    ? "bg-accent text-white font-semibold"
                    : "border-zinc-700 hover:border-accent text-white"
                }`}
              >
                {plan.cta} <FaArrowRight className="text-xs" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
