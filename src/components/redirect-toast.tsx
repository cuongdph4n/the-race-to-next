"use client";

import { consumeCookieByKey } from "@/actions/cookies";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "./ui/toast";

const RedirectToast = () => {
  const pathName = usePathname();

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
  }, [pathName]);

  return null;
};

export { RedirectToast };
