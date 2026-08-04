"use server";

import { toActionState } from "@/components/form/utils/to-action-state";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const signOut = async () => {
  await auth.api.signOut({
    // This endpoint requires session cookies.
    headers: await headers(),
  });

  return toActionState("SUCCESS", "Signed out successfully");
};
