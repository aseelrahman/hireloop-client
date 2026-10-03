"use client";

import { Toast } from "@heroui/react";

export function Providers({ children }) {
  return (
    <>
      <Toast.Provider />
      {children};
    </>
  );
}
