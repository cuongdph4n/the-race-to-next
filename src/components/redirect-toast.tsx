"use client";

import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";
import { useEffect } from "react";
import { toast } from "sonner";

const RedirectToast = () => {
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await getCookieByKey("toast");

      if (message) {
        toast.success(message);
        await deleteCookieByKey("toast");
      }
    };

    showCookieToast();
  }, []);

  return null;
};

export { RedirectToast };
