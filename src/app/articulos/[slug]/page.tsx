import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import GoogleAd from "@/components/GoogleAd";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { siteConfig } from "@/lib/site-config";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Artículo no encontrado" };
  }

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articulos/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [{ url: article.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [`${siteConfig.url}${article.image}`],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: [{ "@type": "Organization", name: article.author }],
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="grid grid-cols-1 gap-10 py-10 lg:grid-cols-[1fr_300px]">
        <article className="min-w-0">
          <Breadcrumbs
            items={[
              { href: "/", label: "Inicio" },
              { href: "/articulos", label: "Artículos" },
              { href: `/articulos/${article.slug}`, label: article.title },
            ]}
          />

          <header className="mt-4">
            <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              {article.category}
            </span>
            <h1 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight text-slate-900">
              {article.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              <span>Por {article.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.publishedAt}>Publicado el {formatDate(article.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>
          </header>

          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-100">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover"
              priority
            />
          </div>

          {article.imageCredit && <p className="mt-2 text-xs leading-relaxed text-slate-500">Foto: {article.imageCredit.author}. <a className="underline" href={article.imageCredit.source} target="_blank" rel="noopener noreferrer">Ver original</a> · <a className="underline" href={article.imageCredit.licenseUrl} target="_blank" rel="noopener noreferrer">{article.imageCredit.license}</a>. Imagen ajustada de tamaño para esta web.</p>}

          {/* Anuncio tras la introducción */}
          <div className="my-8">
            <GoogleAd format="in-article" label="Anuncio entre párrafos" />
          </div>

          <div className="prose-article max-w-none text-[1.05rem] leading-[1.9] text-slate-700">
            {article.content.map((paragraph, index) => (
              <div key={index}>
                {paragraph.startsWith('## ') ? <h2 className="mt-8 text-2xl font-bold text-slate-900">{paragraph.slice(3)}</h2> : <p>{paragraph}</p>}
                {/* Anuncio automático cada dos párrafos (excluyendo el final) */}
                {index === 4 && (
                  <GoogleAd format="in-article" label="Anuncio entre párrafos" className="my-8" />
                )}
              </div>
            ))}
          </div>

          {article.sources && article.sources.length > 0 && <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6" aria-label="Fuentes de consulta">
            <h2 className="text-lg font-bold">Fuentes y ampliación</h2>
            <p className="mt-2 text-sm text-slate-600">Referencias generales para ampliar y comprobar la información. Los ejemplos y cálculos de esta guía son ilustrativos.</p>
            <ul className="mt-3 space-y-2">{article.sources.map(source => <li key={source.url}><a className="text-indigo-700 underline" href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a></li>)}</ul>
          </section>}
          {(article.category === 'Finanzas' || article.category === 'Salud y bienestar') && <p className="mt-6 text-sm text-slate-500">Información general de carácter educativo. No sustituye el asesoramiento financiero o la atención sanitaria que requiera tu situación personal.</p>}

          <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
            Última actualización: {formatDate(article.updatedAt)}
          </div>

          {related.length > 0 && (
            <section aria-labelledby="relacionados" className="mt-12">
              <h2 id="relacionados" className="mb-5 text-xl font-bold text-slate-900">
                Artículos relacionados
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <ArticleCard key={item.slug} article={item} />
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-20 lg:h-fit">
          <GoogleAd format="vertical" label="Banner lateral 300x600" />
        </aside>
      </Container>
    </main>
  );
}
