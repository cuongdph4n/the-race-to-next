import { Placeholder } from "@/components/placeholder";
import { buttonVariants } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { ticketsPath } from "@/paths";
import Link from "next/link";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);

  if (!ticket) {
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

  return (
    <div>
      <h2 className="text-lg">{ticket.title}</h2>
      <p className="text-sm">{ticket.content}</p>
    </div>
  );
};

export default TicketPage;
