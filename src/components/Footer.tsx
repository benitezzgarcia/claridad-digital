import Link from "next/link";
import Container from "./Container";
import { siteConfig } from "@/lib/site-config";

const footerLinks = [
  {
    title: "Contenido",
    links: [
      { href: "/", label: "Inicio" },
      { href: "/articulos", label: "Artículos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { href: "/sobre-nosotros", label: "Sobre nosotros" },
      { href: "/contacto", label: "Contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacidad", label: "Política de privacidad" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-black text-white"
                aria-hidden="true"
              >
                CD
              </span>
              {siteConfig.shortName}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
              {siteConfig.description}
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-600 hover:text-indigo-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <p>Hecho con Next.js y Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
