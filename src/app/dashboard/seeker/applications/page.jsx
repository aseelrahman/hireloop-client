import { getApplicationByApplicant } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import ApplicationTable from "./ApplicationTable";

const ApplicationsPage = async () => {
  const user = await getUserSession();
  const jobs = (await getApplicationByApplicant(user.id)) ?? [];

  return <ApplicationTable jobs={jobs} />;
};

export default ApplicationsPage;
