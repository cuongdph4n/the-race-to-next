import { Placeholder } from "@/components/placeholder";
import { buttonVariants } from "@/components/ui/button";
import { ticketsPath } from "@/paths";
import Link from "next/link";

export default function NotFound() {
  return (
    <Placeholder
      label="Ticket not found"
      button={
        <Link
          href={ticketsPath()}
          className={buttonVariants({ variant: "outline" })}
        >
          Go to Tickets
        </Link>
      }
    />
  );
}
