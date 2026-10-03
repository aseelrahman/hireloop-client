"use client";

import React from "react";
import { Card } from "@heroui/react";

/**
 * Reusable Single Stat Card (HeroUI v3)
 */
export function StatCard({
  icon: Icon,
  title,
  value,
  change,
  isPositive = true,
  iconBg = "bg-neutral-800/60",
  iconColor = "text-neutral-300",
}) {
  return (
    <Card
      variant="default"
      className="bg-[#18181b] border border-neutral-800/80 rounded-2xl shadow-sm hover:border-neutral-700 transition-colors p-6 flex flex-col gap-4"
    >
      {/* Header section with icon badge and optional change badge */}
      <Card.Header >
        {Icon && (
          <div
            className={`w-10 h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}

        {change && (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            }`}
          >
            {isPositive ? `+${change}` : `-${change}`}
          </span>
        )}
      </Card.Header>

      {/* Content section containing title and value */}
      <Card.Content className="p-0 flex flex-col gap-1 mt-2">
        <Card.Description className="text-xs font-medium text-neutral-400 tracking-wide m-0">
          {title}
        </Card.Description>
        <Card.Title className="text-2xl font-bold text-white tracking-tight m-0">
          {typeof value === "number" ? value.toLocaleString() : value}
        </Card.Title>
      </Card.Content>
    </Card>
  );
}

