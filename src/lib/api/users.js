import { headers } from "next/headers";
import { auth } from "../auth";

export const getUsersList = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "createdAt", // The field to sort by.
      sortDirection: "desc", // The direction to sort by.
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  return users;
};
