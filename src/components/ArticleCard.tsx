import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";

export default function ArticleCard({
  article,
  priority = false,
}: {
  article: Article;
  priority?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/articulos/${article.slug}`} className="relative block aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(min-width: 1024px) 350px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          {article.category}
        </span>
        <h3 className="text-lg font-bold leading-snug text-slate-900">
          <Link href={`/articulos/${article.slug}`} className="hover:text-indigo-600">
            {article.title}
          </Link>
        </h3>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
          {article.description}
        </p>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span>{article.readingTime}</span>
        </div>
      </div>
    </article>
  );
}
