"use client";

import { consumeCookieByKey } from "@/actions/cookies";
import { useEffect } from "react";
import { toast } from "./ui/toast";

const RedirectToast = () => {
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await consumeCookieByKey("toast");

      if (message) {
        toast.add({
          type: "success",
          description: message,
        });
      }
    };

    showCookieToast();
  }, []);

  return null;
};

export { RedirectToast };
