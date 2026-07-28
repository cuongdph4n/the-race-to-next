import NextForm from "next/form";
import { toast } from "../ui/toast";
import { useActionFeedback } from "./hooks/use-action-feedback";
import { ActionState } from "./utils/to-action-state";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children: React.ReactNode;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};

const Form = ({
  action,
  actionState,
  children,
  onSuccess,
  onError,
}: FormProps) => {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.add({
          type: "success",
          description: actionState.message,
        });
      }

      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.add({
          type: "error",
          description: actionState.message,
        });
      }

      onError?.(actionState);
    },
  });

  return (
    <NextForm action={action} className="flex flex-col gap-y-2">
      {children}
    </NextForm>
  );
};

export { Form };
