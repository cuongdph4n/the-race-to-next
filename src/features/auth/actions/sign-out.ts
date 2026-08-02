"use server";

import { auth } from "@/lib/auth";
import { signInPath } from "@/paths";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signOut = async () => {
  await auth.api.signOut({
    // This endpoint requires session cookies.
    headers: await headers(),
  });

  redirect(signInPath());
};
