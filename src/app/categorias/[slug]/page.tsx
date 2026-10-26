import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import ArticleExplorer from '@/components/ArticleExplorer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { categories } from '@/lib/categories';
import { getAllArticles } from '@/lib/articles';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return categories.map(c => ({ slug: c.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find(c => c.slug === slug);
  return category ? { title: category.name, description: category.description, alternates: { canonical: `/categorias/${slug}` } } : { title: 'Categoría no encontrada' };
}
export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find(c => c.slug === slug);
  if (!category) notFound();
  return <main><Container className="py-10">
    <Breadcrumbs items={[{ href: '/', label: 'Inicio' }, { href: '/articulos', label: 'Artículos' }, { href: `/categorias/${slug}`, label: category.name }]} />
    <h1 className="mt-4 text-4xl font-extrabold">{category.name}</h1>
    <p className="mt-3 max-w-2xl text-slate-600">{category.description}</p>
    <ArticleExplorer articles={getAllArticles()} category={category.name} />
  </Container></main>;
}
