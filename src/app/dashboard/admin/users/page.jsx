import { getUsersList } from "@/lib/api/users";
import UsersTable from "./UsersTable";


const AdminUsersPage = async () => {
  const data = await getUsersList();
  const users = data.users || [];

  return (
    <div className="m-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Manage Users ({users.length})
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Manage user roles, account status, and permissions.
          </p>
        </div>
      </div>

      <UsersTable users={users} />
    </div>
  );
};

export default AdminUsersPage;
