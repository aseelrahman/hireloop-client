import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";
import { getApplicationByApplicant } from "@/lib/api/applications";
import Link from "next/link";
import { FaExclamationCircle, FaArrowRight } from "react-icons/fa";
import { getPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }
  if (user.role !== "seeker") {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center text-zinc-900 dark:text-white p-6">
        <p className="text-lg text-zinc-500 dark:text-zinc-400 text-center">
          Only job seekers can apply for this position. Please sign in with a
          seeker account to proceed.
        </p>
      </div>
    );
  }

  const applications = await getApplicationByApplicant(user.id);

  const plan = await getPlanById(user?.plan || 'seeker_free');
  console.log(plan);
 
  const job = await getJobById(id);

  const applicationCount = applications?.length || 0;
  const hasReachedLimit = applications.length >= plan.maxApplicationsPerMonth;  

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-8">
      {/* Usage Banner */}
      <div className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider font-semibold text-zinc-500">
            Monthly Quota ({plan.name} Plan)
          </span>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            You have applied to {applicationCount} out of{" "}
            {plan.maxApplicationsPerMonth} positions this month.
          </h2>
        </div>
        <Link
          href="/plan"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline whitespace-nowrap"
        >
          View Plans <FaArrowRight className="text-xs" />
        </Link>
      </div>

      {/* Main Content Area */}
      {hasReachedLimit ? (
        <div className="p-6 border border-amber-500/30 rounded-xl flex items-start gap-4 text-amber-800 dark:text-amber-200">
          <FaExclamationCircle className="text-xl mt-0.5 shrink-0" />
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">Application Limit Reached</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              You have reached your monthly application limit on the {plan.name}{" "}
              plan. Please upgrade your plan to unlock more applications.
            </p>
            <div className="mt-2">
              <Link
                href="/plans"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-zinc-300 dark:border-zinc-700 rounded-lg hover:border-zinc-400 transition"
              >
                Upgrade Plan
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-2 sm:p-4">
          <JobApply applicant={user} job={job} />
        </div>
      )}
    </div>
  );
};

export default ApplyPage;
