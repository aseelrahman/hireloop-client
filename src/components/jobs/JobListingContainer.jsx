"use client";

import React, { useState, useMemo } from "react";
import JobFilters from "@/components/jobs/JobFilters";
import JobCard from "@/components/jobs/JobCard";

// "Data Analytics", "data_analytics", "Data-Analytics" -> "data-analytics"
const normalize = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");

// Handles strings, null, or React Aria key objects safely
const toKey = (value) => {
  if (value && typeof value === "object") {
    return normalize(value.id ?? value.key ?? value);
  }
  return value ? normalize(value) : "all";
};

export default function JobListingContainer({ initialJobs = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);

  const filteredJobs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const categoryKey = toKey(selectedCategory);
    const typeKey = toKey(selectedType);

    return initialJobs.filter((job) => {
      const matchesSearch =
        !query ||
        job.title?.toLowerCase().includes(query) ||
        job.company?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query);

      const matchesCategory =
        categoryKey === "all" || normalize(job.category) === categoryKey;

      const matchesType = typeKey === "all" || normalize(job.type) === typeKey;

      const matchesRemote = !isRemoteOnly || job.isRemote === true;

      return matchesSearch && matchesCategory && matchesType && matchesRemote;
    });
  }, [searchQuery, selectedCategory, selectedType, isRemoteOnly, initialJobs]);

  return (
    <>
      <JobFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        isRemoteOnly={isRemoteOnly}
        onRemoteChange={setIsRemoteOnly}
      />

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-zinc-500 rounded-3xl border border-zinc-800">
          No matching jobs found. Try adjusting your search query or filters.
        </div>
      )}
    </>
  );
}
