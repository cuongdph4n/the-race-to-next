"use client";

import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { unstable_catchError as catchError, type ErrorInfo } from "next/error";

function ErrorFallback(
  _props: Record<string, unknown>,
  { error, unstable_retry }: ErrorInfo,
) {
  return (
    <Placeholder
      label={error.message ?? "Something went wrong!"}
      button={
        <Button onClick={() => unstable_retry()} variant="outline">
          Try again
        </Button>
      }
    />
  );
}

export default catchError(ErrorFallback);
