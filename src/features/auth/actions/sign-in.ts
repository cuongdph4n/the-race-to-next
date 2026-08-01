"use server";

import {
  ActionState,
  fromErrorToActionState,
} from "@/components/form/utils/to-action-state";
import { auth } from "@/lib/auth";
import { ticketsPath } from "@/paths";
import { redirect } from "next/navigation";
import z from "zod";

const signInSchema = z.object({
  email: z.string().min(1, { message: "Is required" }).max(191).email(),
  password: z.string().min(6).max(191),
});

export const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData),
    );

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
};
