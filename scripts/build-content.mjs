import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const categories = [
  ['productividad', 'Productividad', 'productividad'],
  ['finanzas', 'Finanzas', 'finanzas'],
  ['bienestar', 'Salud y bienestar', 'salud'],
  ['tecnologia', 'Tecnología', 'tecnologia'],
];
const references = {
  Finanzas: [{ title: 'Banco de España: información para el cliente bancario', url: 'https://clientebancario.bde.es/pcb/es/' }],
  'Salud y bienestar': [
    { title: 'OMS: alimentación saludable', url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet' },
    { title: 'OMS: actividad física', url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity' },
    { title: 'MedlinePlus: sueño saludable', url: 'https://medlineplus.gov/healthysleep.html' },
  ],
  Tecnología: [{ title: 'INCIBE: seguridad para la ciudadanía', url: 'https://www.incibe.es/ciudadania' }],
};
const slugify = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const articles = categories.flatMap(([file, category, image]) => {
  const rows = readFileSync(`content/${file}.txt`, 'utf8').trim().split(/\r?\n/);
  if (rows.length !== 25) throw new Error(`${category}: expected 25, found ${rows.length}`);
  return rows.map((row, index) => {
    const fields = row.split('|');
    if (fields.length !== 6) throw new Error(`${file}:${index + 1}: expected six fields`);
    const [title, intro, steps, example, mistakes, review] = fields;
    const words = fields.slice(1).join(' ').split(/\s+/).length;
    if (words < 150) throw new Error(`${title}: only ${words} words`);
    return {
      slug: slugify(title), title, description: intro.length > 160 ? intro.slice(0, 157).replace(/\s+\S*$/, '') + '…' : intro, category,
      image: `/images/articulo-${image}.svg`, imageAlt: `Ilustración de ${category.toLowerCase()}`,
      readingTime: `${Math.max(1, Math.ceil(words / 200))} min de lectura`,
      publishedAt: '2026-10-26', updatedAt: '2026-10-26', author: 'Claridad Digital',
      content: [intro, '## Cómo ponerlo en práctica', steps, '## Ejemplo práctico', example, '## Errores que conviene evitar', mistakes, '## Qué revisar después', review],
      sources: references[category] ?? [],
    };
  });
});
if (articles.length !== 100 || new Set(articles.map(a => a.slug)).size !== 100) throw new Error('Invalid article count or duplicate slugs');
mkdirSync('src/content', { recursive: true });
writeFileSync('src/content/additional-articles.json', JSON.stringify(articles, null, 2) + '\n');
console.log('100 artículos comprobados: 25 por categoría; sin slugs repetidos; mínimo 150 palabras por artículo.');
