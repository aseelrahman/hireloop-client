import { Table } from "@heroui/react";
import Link from "next/link";
import {
  BsCodeSlash,
  BsCompass,
  BsDatabase,
  BsCloudArrowUp,
  BsRobot,
  BsBriefcase,
} from "react-icons/bs";

// Icon + box color, picked from the job title (whole-word match)
const getJobIcon = (title = "") => {
  const t = title.toLowerCase();
  if (/\b(frontend|web|software|developer)\b/.test(t))
    return { Icon: BsCodeSlash, box: "bg-zinc-200 text-zinc-800" };
  if (/\b(designer|product)\b/.test(t))
    return { Icon: BsCompass, box: "bg-zinc-700 text-zinc-100" };
  if (/\b(data|scientist)\b/.test(t))
    return { Icon: BsDatabase, box: "bg-zinc-800 text-zinc-100" };
  if (/\b(cloud|architect)\b/.test(t))
    return { Icon: BsCloudArrowUp, box: "bg-red-900 text-red-200" };
  if (/\b(ai|ml|research)\b/.test(t))
    return { Icon: BsRobot, box: "bg-zinc-800 text-zinc-100" };
  return { Icon: BsBriefcase, box: "bg-zinc-800 text-zinc-100" };
};

// Outlined status pills
const STATUS_STYLES = {
  applied: ["Applied", "border-white text-white"],
  review: ["Review", "border-amber-500 text-amber-400"],
  shortlisted: ["Shortlisted", "border-green-500 text-green-400"],
  rejected: ["Rejected", "border-red-500 text-red-400"],
  offered: ["Offered", "border-zinc-300 text-zinc-100"],
};

const StatusBadge = ({ status = "applied" }) => {
  const key = status.toLowerCase().replace("in ", "");
  const [label, style] = STATUS_STYLES[key] ?? [
    status,
    "border-zinc-500 text-zinc-300",
  ];
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${style}`}
    >
      {label}
    </span>
  );
};

const formatTimeAgo = (date) => {
  if (!date) return "—";
  const diff = Math.max(0, Math.floor((Date.now() - new Date(date)) / 1000));
  const units = [
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [name, secs] of units) {
    const n = Math.floor(diff / secs);
    if (n >= 1) return `${n} ${name}${n > 1 ? "s" : ""} ago`;
  }
  return "Just now";
};

const ApplicationTable = ({ jobs = [] }) => {
  return (
    <div className="m-5">
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Applications">
            <Table.Header>
              <Table.Column isRowHeader>Job Title</Table.Column>
              <Table.Column>Company</Table.Column>
              <Table.Column>Applied</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column className="text-right">Action</Table.Column>
            </Table.Header>

            <Table.Body>
              {jobs.map((job) => {
                const { Icon, box } = getJobIcon(job.jobTitle);
                const id = job._id.toString();

                return (
                  <Table.Row key={id} id={id}>
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex size-10 items-center justify-center rounded-lg ${box}`}
                        >
                          <Icon className="size-4" />
                        </span>
                        <div>
                          <p className="font-medium">{job.jobTitle}</p>
                          <p className="text-xs text-zinc-400">
                            Full-time • Remote
                          </p>
                        </div>
                      </div>
                    </Table.Cell>

                    <Table.Cell>{job.companyName}</Table.Cell>

                    <Table.Cell className="text-zinc-400">
                      {formatTimeAgo(job.createdAt)}
                    </Table.Cell>

                    <Table.Cell>
                      <StatusBadge status={job.status ?? "applied"} />
                    </Table.Cell>

                    <Table.Cell className="text-right">
                      <Link
                        href={`/applications/${id}`}
                        className="hover:underline"
                      >
                        Details
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default ApplicationTable;
