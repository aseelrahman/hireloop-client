import JobsTable from "@/components/dashboard/JobsTable";
import { getCompanyJobs } from "@/lib/api/jobs";


const RecruiterJobs = async () => {
  const companyId = "company_123";
  const jobs = (await getCompanyJobs(companyId)) || [];

  // Client components only accept plain JSON — make sure ObjectIds become strings
  const serializedJobs = JSON.parse(JSON.stringify(jobs));

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">Manage All Jobs</h2>
        <p className="text-sm text-default-500">
          {serializedJobs.length} job{serializedJobs.length !== 1 && "s"} posted
          by your company
        </p>
      </div>

      <JobsTable jobs={serializedJobs} />
    </section>
  );
};

export default RecruiterJobs;
