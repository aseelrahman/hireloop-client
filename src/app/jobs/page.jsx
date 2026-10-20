import React from "react";
import { getJobs } from "@/lib/api/jobs";
import JobListingContainer from "@/components/jobs/JobListingContainer";

export default async function JobsPage({ searchParams }) {
  const filters = await searchParams;
  const filtersObj = {
    ...filters,
    isRemote: filters?.isRemote === "true",
  };

  const querySearch = new URLSearchParams(filters);
  const queryString = querySearch.toString();
  console.log("serch query: ", filters, queryString);
  const { jobs, total } = await getJobs(queryString);

  return (
    <main className="min-h-screen bg-zinc-950 p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Explore Open Roles
          </h1>
          <p className="text-zinc-400 mt-1">
            Find your next career opportunity
          </p>
        </div>

        {/* Client Wrapper Component handling state and rendering */}
        <JobListingContainer filters={filtersObj} jobs={jobs} total={total} />
      </div>
    </main>
  );
}
