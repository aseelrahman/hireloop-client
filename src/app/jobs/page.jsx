import React from "react";
import { getJobs } from "@/lib/api/jobs";
import JobListingContainer from "@/components/jobs/JobListingContainer";

export default async function JobsPage() {
  const jobs = await getJobs();

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
        <JobListingContainer jobs={jobs} />
      </div>
    </main>
  );
}
