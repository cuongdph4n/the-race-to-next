import { LucideLoaderCircle } from "lucide-react";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  label: string;
  pending: boolean;
};

const SubmitButton = ({ label, pending }: SubmitButtonProps) => {
  return (
    <Button disabled={pending} type="submit">
      {pending && <LucideLoaderCircle className="h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
};

export { SubmitButton };
