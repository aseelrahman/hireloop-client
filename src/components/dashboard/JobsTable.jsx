"use client";

import { Chip, Spinner, Table } from "@heroui/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { FiEdit2, FiEye, FiMapPin, FiTrash2, FiWifi } from "react-icons/fi";

const ITEMS_PER_PAGE = 6;

const columns = [
  { id: "title", name: "Job Title" },
  { id: "type", name: "Type / Category" },
  { id: "location", name: "Location" },
  { id: "status", name: "Status" },
  { id: "actions", name: "Actions" },
];

const statusColorMap = {
  active: "success",
  draft: "warning",
  paused: "warning",
  closed: "danger",
};

// Shared look for the icon action buttons
const actionBase =
  "inline-flex size-8 items-center justify-center rounded-lg text-base transition-colors";

// ---------- helpers ----------
const capitalize = (str = "") =>
  str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("-");

// ---------- component ----------
export default function JobsTable({ jobs = [] }) {
  // React Aria collections need an `id` on every item
  const [allJobs, setAllJobs] = useState(() =>
    jobs.map((job) => ({ ...job, id: String(job._id) })),
  );
  const [deletingId, setDeletingId] = useState(null);

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const items = allJobs.slice(0, visibleCount);
  const hasMore = visibleCount < allJobs.length;

  // No useCallback needed — React Compiler memoizes this automatically
  const loadMore = () => {
    if (!hasMore || isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);

    // Data is already fetched on the server, so this just reveals the next page.
    // Swap the timeout for a real API call if you move to server-side pagination.
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      setIsLoading(false);
      requestAnimationFrame(() => {
        isLoadingRef.current = false;
      });
    }, 600);
  };

  const handleDelete = async (job) => {
    if (!window.confirm(`Delete "${job.title}"? This can't be undone.`)) return;

    setDeletingId(job.id);
    try {
      // 👇 Change this to your real delete endpoint
      const res = await fetch(`/api/jobs/${job.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete job");

      setAllJobs((prev) => prev.filter((j) => j.id !== job.id));
    } catch (error) {
      console.error(error);
      alert("Could not delete the job. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (allJobs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-default-300 p-10 text-center text-default-500">
        You haven&apos;t posted any jobs yet.
      </div>
    );
  }

  return (
    <Table>
      <Table.ScrollContainer className="max-h-120 overflow-y-auto">
        <Table.Content aria-label="Company jobs table" className="min-w-180">
          <Table.Header className="sticky top-0 z-10 bg-surface-secondary">
            {columns.map((col) => (
              <Table.Column
                key={col.id}
                id={col.id}
                isRowHeader={col.id === "title"}
              >
                {col.name}
              </Table.Column>
            ))}
          </Table.Header>

          <Table.Body>
            <Table.Collection items={items}>
              {(job) => {
                const isDeleting = deletingId === job.id;

                return (
                  <Table.Row>
                    {/* Job Title */}
                    <Table.Cell>
                      <span className="font-medium">{job.title}</span>
                    </Table.Cell>

                    {/* Type / Category */}
                    <Table.Cell>
                      <div className="flex flex-col">
                        <span className="text-sm">{capitalize(job.type)}</span>
                        <span className="text-xs text-default-500">
                          {capitalize(job.category)}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Location */}
                    <Table.Cell>
                      <span className="flex items-center gap-1.5 text-sm">
                        {job.isRemote ? (
                          <>
                            <FiWifi className="text-default-500" /> Remote
                          </>
                        ) : (
                          <>
                            <FiMapPin className="text-default-500" />{" "}
                            {job.location || "—"}
                          </>
                        )}
                      </span>
                    </Table.Cell>

                    {/* Status */}
                    <Table.Cell>
                      <Chip
                        color={statusColorMap[job.status] || "default"}
                        size="sm"
                        variant="soft"
                      >
                        {capitalize(job.status)}
                      </Chip>
                    </Table.Cell>

                    {/* Actions */}
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        {/* View — accent */}
                        <Link
                          href={`/jobs/${job.id}`}
                          aria-label={`View ${job.title}`}
                          title="View"
                          className={`${actionBase} bg-accent/10 text-accent hover:bg-accent/20`}
                        >
                          <FiEye />
                        </Link>

                        {/* Edit — success */}
                        <Link
                          href={`/recruiter/jobs/${job.id}/edit`}
                          aria-label={`Edit ${job.title}`}
                          title="Edit"
                          className={`${actionBase} bg-success/10 text-success hover:bg-success/20`}
                        >
                          <FiEdit2 />
                        </Link>

                        {/* Delete — danger */}
                        <button
                          type="button"
                          onClick={() => handleDelete(job)}
                          disabled={isDeleting}
                          aria-label={`Delete ${job.title}`}
                          title="Delete"
                          className={`${actionBase} cursor-pointer bg-danger/10 text-danger hover:bg-danger/20 disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                          {isDeleting ? <Spinner size="sm" /> : <FiTrash2 />}
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              }}
            </Table.Collection>

            {hasMore && (
              <Table.LoadMore
                isLoading={isLoading}
                scrollOffset={0}
                onLoadMore={loadMore}
              >
                <Table.LoadMoreContent>
                  <Spinner size="md" />
                </Table.LoadMoreContent>
              </Table.LoadMore>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
