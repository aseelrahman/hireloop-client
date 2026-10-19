"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Table, Button, AlertDialog, Toast, toast } from "@heroui/react";
import { updateUserRole } from "@/lib/actions/users";

// Format join date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

// User avatar
const UserAvatar = ({ name, image }) => {
  const initials = (name || "User")
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-800">
      {image ? (
        <Image
          src={image}
          alt={name || "User"}
          width={36}
          height={36}
          className="size-full object-cover"
        />
      ) : (
        <span className="text-xs font-medium text-zinc-300">{initials}</span>
      )}
    </div>
  );
};

// Role badge
const RoleBadge = ({ role }) => {
  const normalizedRole = (role || "seeker").toLowerCase();

  const styles = {
    admin: "bg-violet-500/10 text-violet-400",
    recruiter: "bg-blue-500/10 text-blue-400",
    seeker: "bg-zinc-800 text-zinc-300",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${
        styles[normalizedRole] || styles.seeker
      }`}
    >
      {normalizedRole}
    </span>
  );
};

// Status badge
const StatusBadge = ({ banned }) => {
  const isSuspended = Boolean(banned);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
        isSuspended
          ? "border-rose-500/20 bg-rose-500/5 text-rose-400"
          : "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          isSuspended ? "bg-rose-400" : "bg-emerald-400"
        }`}
      />
      {isSuspended ? "Suspended" : "Active"}
    </span>
  );
};

export default function UsersTable({ users = [] }) {
  const router = useRouter();

  const [selectedUser, setSelectedUser] = useState(null);
  const [isPending, startTransition] = useTransition();

  // Open confirmation dialog
  const openRoleDialog = (user) => {
    if (isPending) return;

    const currentRole = (user.role || "seeker").toLowerCase();

    setSelectedUser({
      id: user.id || user._id?.toString(),
      name: user.name || "this user",
      currentRole,
      newRole: currentRole === "seeker" ? "recruiter" : "seeker",
    });
  };

  // Confirm role change
  const handleRoleChange = () => {
    if (!selectedUser || isPending) return;

    const { id, name, newRole } = selectedUser;

    startTransition(async () => {
      try {
        await updateUserRole(id, newRole);

        toast.success("Role Updated Successfully", {
          description: `${name} is now a ${newRole}.`,
        });

        setSelectedUser(null);
        router.refresh();
      } catch (error) {
        toast.danger("Failed to Update Role", {
          description:
            error.message || "Something went wrong. Please try again.",
        });
      }
    });
  };

  // Account status placeholder
  const handleStatusChange = (id, banned) => {
    console.log("Change account status:", id, banned);
  };

  return (
    <>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Admin users table">
            <Table.Header>
              <Table.Column isRowHeader>User Name</Table.Column>
              <Table.Column>Email Address</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Join Date</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column className="text-right">Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {users.map((user) => {
                const id = user.id || user._id?.toString();
                const role = (user.role || "seeker").toLowerCase();
                const banned = Boolean(user.banned);

                return (
                  <Table.Row key={id} id={id}>
                    {/* User name and avatar */}
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <UserAvatar name={user.name} image={user.image} />

                        <span className="whitespace-nowrap font-medium text-white">
                          {user.name || "Unknown User"}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Email */}
                    <Table.Cell className="text-zinc-400">
                      {user.email || "N/A"}
                    </Table.Cell>

                    {/* Role */}
                    <Table.Cell>
                      <RoleBadge role={role} />
                    </Table.Cell>

                    {/* Join date */}
                    <Table.Cell className="whitespace-nowrap text-zinc-400">
                      {formatDate(user.createdAt)}
                    </Table.Cell>

                    {/* Account status */}
                    <Table.Cell>
                      <StatusBadge banned={banned} />
                    </Table.Cell>

                    {/* Actions */}
                    <Table.Cell className="text-right">
                      {role !== "admin" ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            isDisabled={isPending}
                            className="whitespace-nowrap text-xs text-zinc-300 hover:text-white"
                            onPress={() => openRoleDialog(user)}
                          >
                            {role === "seeker"
                              ? "Make Recruiter"
                              : "Make Seeker"}
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            className={`whitespace-nowrap text-xs ${
                              banned
                                ? "text-emerald-400 hover:text-emerald-300"
                                : "text-rose-400 hover:text-rose-300"
                            }`}
                            onPress={() => handleStatusChange(id, !banned)}
                          >
                            {banned ? "Activate" : "Suspend"}
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-500">Protected</span>
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        {/* Table footer */}
        <div className="border-t border-zinc-800 px-5 py-4">
          <p className="text-xs text-zinc-500">Showing {users.length} users</p>
        </div>
      </Table>

      {/* Role change confirmation */}
      <AlertDialog>
        <AlertDialog.Backdrop
          isOpen={Boolean(selectedUser)}
          onOpenChange={(open) => {
            if (!open && !isPending) {
              setSelectedUser(null);
            }
          }}
        >
          <AlertDialog.Container placement="center" size="sm">
            <AlertDialog.Dialog className="border border-zinc-800 bg-zinc-950 text-white">
              <AlertDialog.Header>
                <AlertDialog.Icon status="warning" />

                <AlertDialog.Heading>Confirm Role Change</AlertDialog.Heading>
              </AlertDialog.Header>

              <AlertDialog.Body>
                <p className="text-sm leading-6 text-zinc-400">
                  Are you sure you want to change{" "}
                  <span className="font-semibold text-white">
                    {selectedUser?.name}
                  </span>
                  {"'s"} role from{" "}
                  <span className="font-medium capitalize text-white">
                    {selectedUser?.currentRole}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold capitalize text-[#8B83FF]">
                    {selectedUser?.newRole}
                  </span>
                  ?
                </p>

                <p className="mt-3 text-xs leading-5 text-zinc-500">
                  Changing this user&apos;s role may affect their access to certain
                  features and permissions.
                </p>
              </AlertDialog.Body>

              <AlertDialog.Footer>
                <Button
                  variant="outline"
                  isDisabled={isPending}
                  onPress={() => setSelectedUser(null)}
                  className="border-zinc-700 text-zinc-300"
                >
                  Cancel
                </Button>

                <Button
                  isPending={isPending}
                  isDisabled={isPending}
                  onPress={handleRoleChange}
                  className="bg-[#5C53FE] text-white hover:bg-[#4B42E8]"
                >
                  {isPending ? "Updating..." : "Confirm Change"}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </>
  );
}
