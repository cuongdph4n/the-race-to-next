import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ticketPath } from "@/paths";
import { LucideArrowUpRightFromSquare } from "lucide-react";
import Link from "next/link";
import { TICKET_ICONS } from "../constants";
import { Ticket } from "../types";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    <Link
      href={ticketPath(ticket.id)}
      className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
    >
      <LucideArrowUpRightFromSquare className="h-4 w-4" />
    </Link>
  );

  return (
    <div
      className={cn("w-full flex gap-x-1", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className=" truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={cn("whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
      </Card>

      {!isDetail && <div className="flex flex-col gap-y-1">{detailButton}</div>}
    </div>
  );
};

export { TicketItem };
