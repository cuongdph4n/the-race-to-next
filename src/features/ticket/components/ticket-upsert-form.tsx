"use client";

import {
  DatePicker,
  ImperativeHandleFromDatePicker,
} from "@/components/date-picker";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { Input } from "@/components/form/input";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@/generated/prisma/client";
import { fromCent } from "@/utils/currency";
import { useActionState, useRef } from "react";
import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action, pending] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );

  const datePickerImperativeHandleRef =
    useRef<ImperativeHandleFromDatePicker>(null);

  const handleSuccess = () => {
    datePickerImperativeHandleRef.current?.reset();
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <FieldGroup className="gap-y-2">
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
              (actionState.payload?.get("title") as string) ?? ticket?.title
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
              (actionState.payload?.get("content") as string) ?? ticket?.content
            }
            aria-invalid={!!actionState.fieldErrors?.content?.length}
            disabled={pending}
          />
          <FieldError actionState={actionState} name="content" />
        </Field>

        <div className="grid grid-cols-2 gap-x-4">
          <Field
            data-invalid={!!actionState.fieldErrors?.deadline?.length}
            data-disabled={pending}
          >
            <FieldLabel htmlFor="deadline">Deadline</FieldLabel>
            <DatePicker
              key={actionState.timestamp}
              id="deadline"
              name="deadline"
              defaultValue={
                (actionState.payload?.get("deadline") as string) ??
                ticket?.deadline
              }
              ariaInvalid={!!actionState.fieldErrors?.deadline?.length}
              disabled={pending}
            />
            <FieldError actionState={actionState} name="deadline" />
          </Field>

          <Field
            data-invalid={!!actionState.fieldErrors?.bounty?.length}
            data-disabled={pending}
          >
            <FieldLabel htmlFor="bounty">Bounty ($)</FieldLabel>
            <Input
              id="bounty"
              name="bounty"
              type="number"
              step=".01"
              defaultValue={
                (actionState.payload?.get("bounty") as string) ??
                (ticket?.bounty ? fromCent(ticket?.bounty) : "")
              }
              aria-invalid={!!actionState.fieldErrors?.bounty?.length}
              disabled={pending}
            />
            <FieldError actionState={actionState} name="bounty" />
          </Field>
        </div>
      </FieldGroup>

      <SubmitButton label={ticket ? "Edit" : "Create"} />
    </Form>
  );
};

export { TicketUpsertForm };
