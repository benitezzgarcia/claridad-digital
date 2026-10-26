import type { Metadata } from 'next';
import Container from '@/components/Container';
import ArticleExplorer from '@/components/ArticleExplorer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Artículos', description: 'Explora nuestras guías de productividad, finanzas, bienestar y tecnología. Busca por tema o categoría.',
  alternates: { canonical: '/articulos' },
};
export default function ArticlesPage() {
  return <main><Container className="py-10">
    <Breadcrumbs items={[{ href: '/', label: 'Inicio' }, { href: '/articulos', label: 'Artículos' }]} />
    <h1 className="mt-4 text-4xl font-extrabold">Todos los artículos</h1>
    <p className="mt-3 max-w-2xl text-slate-600">Guías para resolver dudas cotidianas, con pasos concretos, ejemplos y errores que conviene evitar.</p>
    <ArticleExplorer articles={getAllArticles()} />
  </Container></main>;
}
