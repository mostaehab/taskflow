import { memo } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 border-b border-divider bg-surface">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          <Image src="/logo.png" alt="TaskFlow logo" width={36} height={36} />
          <span className="text-lg font-semibold tracking-tight">TaskFlow</span>
        </Link>
        <ul className="hidden sm:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="rounded-sm text-sm font-medium text-foreground-secondary transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-5">
          <Link
            href="#"
            className="rounded-sm text-sm font-medium text-foreground-secondary transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            Log in
          </Link>
          <Link
            href="#"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-foreground-inverse shadow-sm transition-colors duration-150 hover:bg-primary-hover active:bg-primary-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
