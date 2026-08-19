import { memo } from "react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
];

const Footer = () => {
  return (
    <footer className="border-t border-divider bg-surface">
      <div className="container mx-auto flex flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          <Image src="/logo.png" alt="TaskFlow logo" width={28} height={28} />
          <span className="font-semibold tracking-tight">TaskFlow</span>
        </Link>
        <ul className="flex items-center gap-6">
          {footerLinks.map((link) => (
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
        <p className="text-sm text-foreground-muted">
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default memo(Footer);
