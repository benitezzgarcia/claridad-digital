import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import GoogleAd from "@/components/GoogleAd";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";
import { siteConfig } from "@/lib/site-config";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Productividad, finanzas, salud y tecnología`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const allArticles = getAllArticles();
  const articles = categories.flatMap(c => allArticles.filter(a => a.category === c.name).slice(0, 3));
  const [featured, ...rest] = articles;
  const firstHalf = rest.slice(0, Math.ceil(rest.length / 2));
  const secondHalf = rest.slice(Math.ceil(rest.length / 2));

  return (
    <main>
      {/* Banner superior (leaderboard) */}
      <Container className="pt-4">
        <GoogleAd format="horizontal" label="Banner superior 728x90" />
      </Container>

      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-indigo-50 to-slate-50">
        <Container className="py-14 text-center sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Bienvenido a {siteConfig.shortName}
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-[clamp(1.9rem,5vw,3.25rem)] font-extrabold leading-tight text-slate-900">
            Guías claras y prácticas para mejorar tu día a día
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/articulos"
              className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Explorar artículos
            </Link>
            <Link
              href="/sobre-nosotros"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Sobre nosotros
            </Link>
          </div>
        </Container>
      </section>

      <Container className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-[1fr_300px]">
        {/* Columna principal */}
        <div className="min-w-0">
          {featured && (
            <section aria-labelledby="destacado" className="mb-12">
              <h2 id="destacado" className="mb-4 text-xl font-bold text-slate-900">
                Artículo destacado
              </h2>
              <div className="max-w-md">
                <ArticleCard article={featured} priority />
              </div>
            </section>
          )}

          <section aria-labelledby="ultimos-articulos">
            <h2 id="ultimos-articulos" className="mb-5 text-xl font-bold text-slate-900">
              Últimos artículos
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {firstHalf.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>

          {/* Banner intermedio (in-feed) */}
          <div className="my-10">
            <GoogleAd format="in-article" label="Banner intermedio" />
          </div>

          <section aria-labelledby="mas-articulos">
            <h2 id="mas-articulos" className="sr-only">
              Más artículos
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {secondHalf.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>

          <div className="mt-10 text-center">
            <Link
              href="/articulos"
              className="inline-block rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Ver todos los artículos
            </Link>
          </div>
        </div>

        {/* Barra lateral */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-20 lg:h-fit">
          <GoogleAd format="vertical" label="Banner lateral 300x600" />

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              Categorías
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {categories.map(c => <li key={c.slug}><Link href={`/categorias/${c.slug}`} className="hover:text-indigo-600">{c.name} →</Link></li>)}
            </ul>
          </div>
        </aside>
      </Container>
    </main>
  );
}
