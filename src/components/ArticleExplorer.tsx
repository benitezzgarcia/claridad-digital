"use client";

import { useState } from 'react';
import Link from 'next/link';
import ArticleCard from './ArticleCard';
import type { Article } from '@/lib/articles';
import { categories } from '@/lib/categories';

const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function ArticleExplorer({ articles, category = '' }: { articles: Article[]; category?: string }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const filtered = articles.filter(a => (!category || a.category === category) && normalize(`${a.title} ${a.description}`).includes(normalize(query.trim())));
  const pages = Math.max(1, Math.ceil(filtered.length / 12));
  const currentPage = Math.min(page, pages);
  return <section className="mt-8" aria-label="Explorar artículos">
    <nav aria-label="Categorías" className="mb-6 flex flex-wrap gap-2">
      <Link href="/articulos" aria-current={!category ? 'page' : undefined} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-indigo-50">Todos ({articles.length})</Link>
      {categories.map(c => <Link key={c.slug} href={`/categorias/${c.slug}`} aria-current={category === c.name ? 'page' : undefined} className={`rounded-full border px-4 py-2 text-sm ${category === c.name ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white hover:bg-indigo-50'}`}>{c.name} ({articles.filter(a => a.category === c.name).length})</Link>)}
    </nav>
    <label htmlFor="article-search" className="block text-sm font-semibold">Buscar por tema</label>
    <input id="article-search" type="search" value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="Por ejemplo: presupuesto, copias de seguridad…" className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 sm:max-w-xl" />
    <p role="status" className="my-5 text-sm text-slate-600">{filtered.length} artículos{query ? ` para «${query}»` : ''}</p>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.slice((currentPage - 1) * 12, currentPage * 12).map((article, i) => <ArticleCard key={article.slug} article={article} priority={i === 0} />)}
    </div>
    {!filtered.length && <p className="rounded-lg bg-white p-6">No hay resultados. Prueba con otro término.</p>}
    {pages > 1 && <nav aria-label="Páginas de artículos" className="mt-8 flex flex-wrap items-center justify-center gap-4">
      <button type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} className="rounded-full border px-4 py-2 disabled:opacity-40">Anterior</button>
      <span>Página {currentPage} de {pages}</span>
      <button type="button" disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)} className="rounded-full border px-4 py-2 disabled:opacity-40">Siguiente</button>
    </nav>}
  </section>;
}
