import * as z from "zod";

type FormValues = {
  title: string;
  content: string;
};

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  payload?: FormValues;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
  payload: {
    title: "",
    content: "",
  },
};

export const fromErrorToActionState = (
  error: unknown,
  values: FormValues,
): ActionState => {
  if (error instanceof z.ZodError) {
    // if validation error with Zod, return first error message
    return {
      status: "ERROR",
      message: "",
      payload: values,
      fieldErrors: z.flattenError(error).fieldErrors,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    // if another error instance, return error message
    // e.g. database error
    return {
      status: "ERROR",
      message: error.message,
      payload: values,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  } else {
    // if not an error instance but something else crashed
    // return generic error message
    return {
      status: "ERROR",
      message: "An unknown error occurred",
      payload: values,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  }
};

export const toActionState = (
  status: ActionState["status"],
  message: string,
): ActionState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  };
};
