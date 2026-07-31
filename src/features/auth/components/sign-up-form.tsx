"use client";

import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { Input } from "@/components/form/input";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Field, FieldGroup } from "@/components/ui/field";
import { useActionState } from "react";
import { signUp } from "../actions/sign-up";

const SignUpForm = () => {
  const [actionState, action, pending] = useActionState(
    signUp,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <FieldGroup className="gap-y-2">
        <Field
          data-invalid={!!actionState.fieldErrors?.username?.length}
          data-disabled={pending}
        >
          <Input name="username" placeholder="Username" />
          <FieldError actionState={actionState} name="username" />
        </Field>

        <Field
          data-invalid={!!actionState.fieldErrors?.email?.length}
          data-disabled={pending}
        >
          <Input name="email" placeholder="Email" />
          <FieldError actionState={actionState} name="email" />
        </Field>

        <Field
          data-invalid={!!actionState.fieldErrors?.password?.length}
          data-disabled={pending}
        >
          <Input type="password" name="password" placeholder="Password" />
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
          />
          <FieldError actionState={actionState} name="confirmPassword" />
        </Field>
      </FieldGroup>

      <SubmitButton label="Sign Up" pending={pending} />
    </Form>
  );
};

export { SignUpForm };
