"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Container from "./Container";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/articulos", label: "Artículos" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Navegación principal">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-black text-white"
              aria-hidden="true"
            >
              CD
            </span>
            {siteConfig.shortName}
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                      isActive ? "text-indigo-600" : "text-slate-700"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Abrir menú de navegación"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white md:hidden">
          <Container>
            <ul className="flex flex-col gap-1 py-3">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}
