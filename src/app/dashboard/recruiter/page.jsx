"use client";
import { authClient } from "@/lib/auth-client";
import { FiFileText, FiUsers, FiZap, FiCheckCircle } from "react-icons/fi";
import React from "react";
import DashboardStats from "@/components/dashboard/DashboardStats";

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    <div>Loading.........</div>;
  }

  const recruiterStats = [
    {
      id: "total-posts",
      title: "Total Job Posts",
      value: 48,
      icon: FiFileText,
    },
    {
      id: "total-applicants",
      title: "Total Applicants",
      value: 1284,
      icon: FiUsers,
    },
    {
      id: "active-jobs",
      title: "Active Jobs",
      value: 18,
      icon: FiZap,
    },
    {
      id: "jobs-closed",
      title: "Jobs Closed",
      value: 32,
      icon: FiCheckCircle,
    },
  ];

  const user = session?.user;

  console.log(user);

  return (
    <div className="p-5 space-y-5">
      <h2 className="text-4xl">Welcome back, {user?.name}</h2>
      <DashboardStats statsData={recruiterStats} />
    </div>
  );
};

export default RecruiterDashboardHomePage;
