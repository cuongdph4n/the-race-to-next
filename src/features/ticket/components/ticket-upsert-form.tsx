"use client";

import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@/generated/prisma/client";
import { useActionState } from "react";
import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action, pending] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );

  console.log("actionState", actionState, ticket);
  return (
    <Form action={action} actionState={actionState}>
      <FieldGroup>
        <Field
          data-invalid={!!actionState.fieldErrors?.title?.length}
          data-disabled={pending}
        >
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            name="title"
            type="text"
            defaultValue={
              ticket?.id ? ticket?.title : actionState.payload?.title
            }
            aria-invalid={!!actionState.fieldErrors?.title?.length}
            disabled={pending}
          />
          <FieldError actionState={actionState} name="title" />
        </Field>
        <Field
          data-invalid={!!actionState.fieldErrors?.content?.length}
          data-disabled={pending}
        >
          <FieldLabel htmlFor="content">Content</FieldLabel>
          <Textarea
            id="content"
            name="content"
            defaultValue={
              ticket?.id ? ticket?.content : actionState.payload?.content
            }
            aria-invalid={!!actionState.fieldErrors?.content?.length}
            disabled={pending}
          />
          <FieldError actionState={actionState} name="content" />
        </Field>
      </FieldGroup>

      <SubmitButton label={ticket ? "Edit" : "Create"} pending={pending} />
    </Form>
  );
};

export { TicketUpsertForm };
