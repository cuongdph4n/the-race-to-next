import { ConfirmDialog } from "@/components/confirm-dialog";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ticket } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";
import {
  LucideArrowUpRightFromSquare,
  LucideMoreVertical,
  LucidePencil,
  LucideTrash,
} from "lucide-react";
import Link from "next/link";
import { deleteTicket } from "../actions/delete-ticket";
import { TICKET_ICONS } from "../constants";
import { TicketMoreMenu } from "./ticket-more-menu";

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
    <ConfirmDialog
      action={deleteTicket.bind(null, ticket.id)}
      trigger={
        <button
          className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
        >
          <LucideTrash className="h-4 w-4" />
        </button>
      }
    />
  );

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <button
          className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
        >
          <LucideMoreVertical className="h-4 w-4" />
        </button>
      }
    />
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
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {deleteButton}
            {moreMenu}
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
