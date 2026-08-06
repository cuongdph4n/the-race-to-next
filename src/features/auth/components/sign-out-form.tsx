"use client";

import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { signOut } from "@/features/auth/actions/sign-out";
import { useSession } from "@/lib/auth-client";
import { signInPath } from "@/paths";
import { LucideLogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

const SignOutForm = () => {
  const [actionState, action] = useActionState(signOut, EMPTY_ACTION_STATE);

  const { refetch } = useSession();
  const router = useRouter();

  const handleSuccess = async () => {
    await refetch();
    router.replace(signInPath());
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <SubmitButton label="Sign Out" icon={<LucideLogOut />} />
    </Form>
  );
};

export { SignOutForm };
