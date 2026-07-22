import { FieldError as ShadcnFieldError } from "@/components/ui/field";
import { ActionState } from "./utils/to-action-state";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

const FieldError = ({ actionState, name }: FieldErrorProps) => {
  const message = actionState.fieldErrors[name]?.[0];

  if (!message) return null;

  return <ShadcnFieldError className="text-xs">{message}</ShadcnFieldError>;
};

export { FieldError };
