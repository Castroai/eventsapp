"use client";
import { Button, Navbar } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
const NavLink = ({ pathName, label }: { pathName: string; label: string }) => {
  const path = usePathname();

  return (
    <Navbar.Link href={pathName} active={path === pathName}>
      {label}
    </Navbar.Link>
  );
};
export default function DefaultNavbar() {
  const { data: session, status } = useSession();

  return (
    <Navbar fluid rounded className="container mx-auto ">
      <Navbar.Brand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          My Dashboard
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="items-center flex h-full">
        <NavLink label="Home" pathName="/" />
        <NavLink label="Dashboard" pathName="/dashboard" />
        {status === "authenticated" ? (
          <Button onClick={() => signOut()}>Sign out</Button>
        ) : (
          <Button onClick={() => signIn()}>Sign in</Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
