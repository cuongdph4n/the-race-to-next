import { PrismaClient } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const users = [
  {
    name: "Cuong",
  },
];

const tickets = [
  {
    title: "Ticket 1",
    content: "First ticket from DB.",
    status: "DONE" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 2",
    content: "Second ticket from DB.",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    title: "Ticket 3",
    content: "Third ticket from DB.",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("DB Seed: Started ...");

  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  const creationPromises = users.map((user) =>
    auth.api.signUpEmail({
      body: {
        email: process.env.SEED_EMAIL!,
        password: process.env.SEED_PASSWORD!,
        name: user.name,
      },
    }),
  );

  const dbUser = await Promise.all(creationPromises);

  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({ ...ticket, userId: dbUser[0].user.id })),
  });

  const t1 = performance.now();
  console.log(`DB Seed: Finished (${t1 - t0}ms)`);
};

seed();
