import React from "react";
import { getCompanies } from "@/lib/api/companies";
import CompanyTable from "./CompanyTable";

export default async function AdminCompaniesPage() {
  const companies = await getCompanies();

  // Blank Handler for Approve Action
  const handleApprove = async (companyId) => {
    "use server";
    // TODO: Put your approve logic here
  };

  // Blank Handler for Reject Action
  const handleReject = async (companyId) => {
    "use server";
    // TODO: Put your reject logic here
  };

  return (
    <div className="m-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Companies for review ({companies.length})
        </h2>
      </div>

      <CompanyTable companies={companies} />
    </div>
  );
}
