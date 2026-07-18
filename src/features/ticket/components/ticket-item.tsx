import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { ticketEditPath, ticketPath } from "@/paths";
import {
  LucideArrowUpRightFromSquare,
  LucidePencil,
  LucideTrash,
} from "lucide-react";
import Link from "next/link";
import { deleteTicket } from "../actions/delete-ticket";
import { TICKET_ICONS } from "../constants";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    <Link
      prefetch
      href={ticketPath(ticket.id)}
      className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
    >
      <LucideArrowUpRightFromSquare className="h-4 w-4" />
    </Link>
  );

  const editButton = (
    <Link
      prefetch
      href={ticketEditPath(ticket.id)}
      className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
    >
      <LucidePencil className="h-4 w-4" />
    </Link>
  );

  const deleteButton = (
    <form action={deleteTicket.bind(null, ticket.id)}>
      <Button variant="outline" size="icon" type="submit">
        <LucideTrash className="h-4 w-4" />
      </Button>
    </form>
  );

  return (
    <div
      className={cn("w-full flex gap-x-1", {
        "max-w-145": isDetail,
        "max-w-105": !isDetail,
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

      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {deleteButton}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
};

export { TicketItem };
