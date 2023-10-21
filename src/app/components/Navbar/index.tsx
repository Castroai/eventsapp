"use client";
import { Navbar } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ pathName, label }: { pathName: string; label: string }) => {
  const path = usePathname();

  return (
    <Navbar.Link href={pathName} active={path === pathName}>
      {label}
    </Navbar.Link>
  );
};
export default function DefaultNavbar() {
  return (
    <Navbar fluid rounded className="container mx-auto">
      <Navbar.Brand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          My Dashboard
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <NavLink label="Home" pathName="/" />
        <NavLink label="Dashboard" pathName="/dashboard" />
      </Navbar.Collapse>
    </Navbar>
  );
}
