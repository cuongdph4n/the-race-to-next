import { cn } from "@/lib/utils";
import { LucideLoaderCircle } from "lucide-react";
import { cloneElement } from "react";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  label: string;
  pending: boolean;
  icon?: React.ReactElement<React.ComponentPropsWithoutRef<"svg">>;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg";
};

const SubmitButton = ({
  label,
  pending,
  icon,
  variant,
  size,
}: SubmitButtonProps) => {
  return (
    <Button disabled={pending} type="submit" variant={variant} size={size}>
      {pending && (
        <LucideLoaderCircle
          className={cn("h-4 w-4 animate-spin", {
            "mr-2": !!label,
          })}
        />
      )}
      {label}
      {pending ? null : icon ? (
        <span
          className={cn("ml-2", {
            "ml-2": !!label,
          })}
        >
          {cloneElement(icon, {
            className: "w-4 h-4",
          })}
        </span>
      ) : null}
    </Button>
  );
};

export { SubmitButton };
