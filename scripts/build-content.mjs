import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';

const photos = JSON.parse(readFileSync('src/content/photo-manifest.json', 'utf8'));
if (Object.keys(photos).length !== 104 || Object.values(photos).some(p => p.selectionVersion !== 2 || !existsSync(`public${p.image}`))) throw new Error('Expected 104 reviewed photographs');

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
  const additions = readFileSync(`content/${file}-ampliacion.txt`, 'utf8').trim().split(/\r?\n/);
  if (rows.length !== 25) throw new Error(`${category}: expected 25, found ${rows.length}`);
  if (additions.length !== 25) throw new Error(`${category}: expected 25 expansions`);
  return rows.map((row, index) => {
    const fields = row.split('|');
    if (fields.length !== 6) throw new Error(`${file}:${index + 1}: expected six fields`);
    const [title, intro, steps, example, mistakes, review] = fields;
    const expanded = additions[index].split('|').flatMap(section => {
      const [heading, body, ...unexpected] = section.split('~');
      if (!heading || !body || unexpected.length) throw new Error(`${title}: invalid expansion`);
      return [`## ${heading}`, body];
    });
    const content = [intro, '## Cómo ponerlo en práctica', steps, '## Ejemplo práctico', example, ...expanded, '## Errores que conviene evitar', mistakes, '## Qué revisar después', review];
    const words = content.filter(p => !p.startsWith('## ')).join(' ').split(/\s+/).length;
    if (words < 290) throw new Error(`${title}: only ${words} words`);
    const photo = photos[slugify(title)];
    if (!photo) throw new Error(`${title}: photo missing`);
    return {
      slug: slugify(title), title, description: intro.length > 160 ? intro.slice(0, 157).replace(/\s+\S*$/, '') + '…' : intro, category,
      image: photo.image, imageAlt: photo.imageAlt, imageCredit: { title: photo.title, author: photo.author, license: photo.license, licenseUrl: photo.licenseUrl, source: photo.source },
      readingTime: `${Math.max(1, Math.ceil(words / 200))} min de lectura`,
      publishedAt: '2026-10-26', updatedAt: '2026-10-26', author: 'Claridad Digital',
      content,
      sources: references[category] ?? [],
    };
  });
});
if (articles.length !== 100 || new Set(articles.map(a => a.slug)).size !== 100) throw new Error('Invalid article count or duplicate slugs');
mkdirSync('src/content', { recursive: true });
writeFileSync('src/content/additional-articles.json', JSON.stringify(articles, null, 2) + '\n');
const counts=articles.map(a=>a.content.filter(p=>!p.startsWith('## ')).join(' ').split(/\s+/).length);
console.log(`100 artículos ampliados: ${Math.min(...counts)}–${Math.max(...counts)} palabras; 104 fotografías revisadas; 25 artículos nuevos por categoría.`);
