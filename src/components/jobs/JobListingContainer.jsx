"use client";

import React, { useState, useEffect } from "react";
import JobFilters from "@/components/jobs/JobFilters";
import JobCard from "@/components/jobs/JobCard";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";

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

export default function JobListingContainer({ jobs = [], filters, total }) {
  const [searchQuery, setSearchQuery] = useState(filters?.search);
  const [selectedCategory, setSelectedCategory] = useState(
    filters?.category || "all",
  );
  const [selectedType, setSelectedType] = useState(filters?.type || "all");
  const [isRemoteOnly, setIsRemoteOnly] = useState(filters?.isRemote || false);
  const [page, setPage] = useState(Number(filters?.page) || 1);

  const router = useRouter();

  const totalItems = total;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (page > 3) {
      pages.push("ellipsis");
    }
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);
    return pages;
  };

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = (page - 1) * itemsPerPage + jobs.length;
  // const endItem2 = Math.min(page * itemsPerPage, totalItems);

  useEffect(() => {
    const sp = new URLSearchParams();

    if (searchQuery) {
      sp.set("search", searchQuery);
    }

    if (selectedCategory !== "all") {
      sp.set("category", selectedCategory);
    }
    if (selectedType !== "all") {
      sp.set("type", selectedType);
    }
    if (isRemoteOnly) {
      sp.set("isRemote", true);
    }
    if (page) {
      sp.set("page", page);
    }

    console.log("search params", sp.toString());
    const path = `?${sp.toString()}`;
    router.push(path);
  }, [router, selectedType, selectedCategory, isRemoteOnly, searchQuery, page]);

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

      {jobs.length > 0 ? (
        <>
          <p className="my-5">Total jobs: {jobs.length}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          <Pagination className="w-full">
            <Pagination.Summary>
              Showing {startItem}-{endItem} of {totalItems} results
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => p - 1)}
                >
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>
              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === page}
                      onPress={() => setPage(p)}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                ),
              )}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === totalPages}
                  onPress={() => setPage((p) => p + 1)}
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </>
      ) : (
        <div className="text-center py-16 text-zinc-500 rounded-3xl border border-zinc-800">
          No matching jobs found. Try adjusting your search query or filters.
        </div>
      )}
    </>
  );
}
