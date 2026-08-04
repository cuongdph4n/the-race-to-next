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
import { signUp } from "../actions/sign-up";

const SignUpForm = () => {
  const [actionState, action, pending] = useActionState(
    signUp,
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
          data-invalid={!!actionState.fieldErrors?.name?.length}
          data-disabled={pending}
        >
          <Input
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={actionState.payload?.get("name") as string}
            aria-invalid={!!actionState.fieldErrors?.name?.length}
            disabled={pending}
          />
          <FieldError actionState={actionState} name="name" />
        </Field>

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

        <Field
          data-invalid={!!actionState.fieldErrors?.confirmPassword?.length}
          data-disabled={pending}
        >
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            defaultValue={actionState.payload?.get("confirmPassword") as string}
            aria-invalid={!!actionState.fieldErrors?.confirmPassword?.length}
            disabled={pending}
          />
          <FieldError actionState={actionState} name="confirmPassword" />
        </Field>
      </FieldGroup>

      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export { SignUpForm };
