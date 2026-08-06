"use server";

import { setCookieByKey } from "@/actions/cookies";
import { toActionState } from "@/components/form/utils/to-action-state";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });

  await setCookieByKey("toast", "Signed out safely");

  return toActionState("SUCCESS");
};
