import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Error 404</p>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          No hemos encontrado esta página
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-slate-600">
          Puede que el contenido se haya movido o ya no esté disponible. Vuelve al inicio para seguir
          explorando nuestros artículos.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          Volver al inicio
        </Link>
      </Container>
    </main>
  );
}
