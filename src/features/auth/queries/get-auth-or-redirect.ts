import { auth } from "@/lib/auth";
import { signInPath } from "@/paths";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getAuthOrRedirect = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(signInPath());
  }

  return session;
};
