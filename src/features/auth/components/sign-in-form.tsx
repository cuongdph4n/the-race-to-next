"use client";

import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { Input } from "@/components/form/input";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Field, FieldGroup } from "@/components/ui/field";
import { useSession } from "@/lib/auth-client";
import { ticketsPath } from "@/paths";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { signIn } from "../actions/sign-in";

const SignInForm = () => {
  const [actionState, action, pending] = useActionState(
    signIn,
    EMPTY_ACTION_STATE,
  );

  const { refetch } = useSession();

  const handleSuccess = async () => {
    await refetch();
    redirect(ticketsPath());
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <FieldGroup className="gap-y-2">
        <Field
          data-invalid={!!actionState.fieldErrors?.email?.length}
          data-disabled={pending}
        >
          <Input
            type="text"
            name="email"
            placeholder="Email"
            defaultValue={actionState.payload?.get("email") as string}
            aria-invalid={!!actionState.fieldErrors?.email?.length}
            disabled={pending}
          />
          <FieldError actionState={actionState} name="email" />
        </Field>

        <Field
          data-invalid={!!actionState.fieldErrors?.password?.length}
          data-disabled={pending}
        >
          <Input
            type="password"
            name="password"
            placeholder="Password"
            defaultValue={actionState.payload?.get("password") as string}
            aria-invalid={!!actionState.fieldErrors?.password?.length}
            disabled={pending}
          />
          <FieldError actionState={actionState} name="password" />
        </Field>
      </FieldGroup>

      <SubmitButton label="Sign In" />
    </Form>
  );
};

export { SignInForm };
