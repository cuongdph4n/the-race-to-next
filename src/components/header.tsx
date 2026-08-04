"use client";

import { SignOutForm } from "@/features/auth/components/sign-out-form";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/paths";
import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { buttonVariants } from "./ui/button";

const Header = () => {
  const { data: session, isPending } = useSession();
  const isAuthenticated = !isPending && session?.user;

  if (isPending) {
    return null;
  }

  const navItems = isAuthenticated ? (
    <>
      <Link
        href={ticketsPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Tickets
      </Link>
      <SignOutForm />
    </>
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={cn(buttonVariants({ variant: "outline" }))}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={cn(buttonVariants({ variant: "default" }))}
      >
        Sign In
      </Link>
    </>
  );

  return (
    <nav
      className="
          animate-header-from-top
          supports-backdrop-blur:bg-background/60
          fixed left-0 right-0 top-0 z-20
          border-b bg-background/95 backdrop-blur
          w-full flex py-2.5 px-5 justify-between
        "
    >
      <div className="flex align-items gap-x-2">
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideKanban />
          <h1 className="text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex align-items gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

export { Header };
