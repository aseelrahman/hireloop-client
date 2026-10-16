"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { Table, Button, toast } from "@heroui/react";
import { updateCompany } from "@/lib/actions/companies";

// Helper to format date strings
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

// Helper to render company logo or fallback initials avatar
const CompanyAvatar = ({ name, logoUrl }) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "CO";

  if (logoUrl) {
    return (
      <Image
        src={logoUrl}
        alt={name}
        width={40}
        height={40}
        className="size-10 rounded-lg object-cover"
      />
    );
  }

  return (
    <span className="flex size-10 items-center justify-center rounded-lg bg-zinc-800 text-xs font-bold text-zinc-200">
      {initials}
    </span>
  );
};

// Status indicator pill
const StatusBadge = ({ status }) => {
  const normalizedStatus = (status || "Pending").toLowerCase();

  const styles = {
    pending: "text-amber-400 bg-amber-400",
    approved: "text-emerald-400 bg-emerald-400",
    rejected: "text-rose-400 bg-rose-400",
  };

  const activeStyle = styles[normalizedStatus] || styles.pending;

  return (
    <span className="inline-flex items-center gap-2 text-sm capitalize">
      <span className={`size-1.5 rounded-full ${activeStyle.split(" ")[1]}`} />
      <span className={activeStyle.split(" ")[0]}>{status || "Pending"}</span>
    </span>
  );
};

export default function CompanyTable({ companies = [] }) {
  const [isPending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState(null);

  const handleApprove = async (id) => {
    const result = await updateCompany(id, { status: "Approved" });
    if (result.modifiedCount) {
      toast.success(`Approved company with ID: ${id}`, result);
    }
  };

  const handleReject = async (id) => {
    const result = await updateCompany(id, { status: "Rejected" });
    if (result.modifiedCount) {
      toast.danger(`Reject company with ID: ${id}`);
    }
  };

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Companies for review">
          <Table.Header>
            <Table.Column isRowHeader>Company Name</Table.Column>
            <Table.Column>Recruiter Email</Table.Column>
            <Table.Column>Industry</Table.Column>
            <Table.Column>Jobs</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Date Submitted</Table.Column>
            <Table.Column className="text-right">Actions</Table.Column>
          </Table.Header>

          <Table.Body>
            {companies.map((company) => {
              const id = company._id.toString();
              const status = (company.status || "Pending").toLowerCase();
              const isLoading = isPending && loadingId === id;

              return (
                <Table.Row key={id} id={id}>
                  {/* Company Name + Avatar */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <CompanyAvatar
                        name={company.name}
                        logoUrl={company.logoUrl}
                      />
                      <span className="font-medium text-white">
                        {company.name}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Recruiter Email */}
                  <Table.Cell className="text-zinc-300">
                    {company.recruiterEmail || company.email || "N/A"}
                  </Table.Cell>

                  {/* Industry Pill */}
                  <Table.Cell>
                    <span className="inline-block rounded-full bg-zinc-800/80 px-3 py-1 text-xs capitalize text-zinc-400">
                      {company.industry || "General"}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="inline-block rounded-full bg-zinc-800/80 px-3 py-1 text-xs capitalize text-zinc-400">
                      {company.jobCount || "Data not available"}
                    </span>
                  </Table.Cell>

                  {/* Status Badge */}
                  <Table.Cell>
                    <StatusBadge status={company.status} />
                  </Table.Cell>

                  {/* Submission Date */}
                  <Table.Cell className="text-zinc-400">
                    {formatDate(company.createdAt)}
                  </Table.Cell>

                  {/* Action Buttons */}
                  <Table.Cell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {status !== "approved" && (
                        <Button
                          size="sm"
                          isPending={isLoading}
                          onPress={() => handleApprove(id)}
                          className="border border-emerald-800/40 bg-emerald-950/40 text-xs font-medium text-emerald-400 hover:bg-emerald-900/50"
                        >
                          Approve
                        </Button>
                      )}
                      {status !== "rejected" && (
                        <Button
                          size="sm"
                          isPending={isLoading}
                          onPress={() => handleReject(id)}
                          className="border border-rose-800/40 bg-rose-950/40 text-xs font-medium text-rose-400 hover:bg-rose-900/50"
                        >
                          Reject
                        </Button>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
