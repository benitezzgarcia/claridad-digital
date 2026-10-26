import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';

const groups = [
  ['productividad', 'desk notebook', [
    'weekly planner notebook', 'desk calendar', 'notebook pen desk', 'timer desk', 'notepad writing', 'business meeting table', 'handwriting notebook', 'notebook checklist', 'sticky notes board', 'smartphone desk', 'daily planner', 'clock desk', 'home office evening', 'teamwork meeting', 'laptop email', 'office documents folders', 'studying books library', 'calendar notebook', 'reception office', 'project planning office', 'writing instructions notebook', 'shopping street walking', 'conversation office', 'notebook telephone', 'notebook morning coffee',
  ]],
  ['finanzas', 'money calculator', [
    'budget calculator notebook', 'calendar coins', 'euro money savings', 'savings piggy bank', 'smartphone payment', 'supermarket price shopping', 'calculator receipts', 'coffee coins', 'suitcase vacation', 'bank building', 'calculator credit card', 'paperwork calculator', 'gift wrapping', 'receipts paper', 'wallet money', 'laptop shopping', 'moving cardboard boxes', 'couple household bills', 'shopping bags', 'invoice calculator', 'cafe restaurant table', 'coins notebook', 'credit card payment', 'art supplies drawing', 'calculator bills',
  ]],
  ['bienestar', 'healthy lifestyle', [
    'walking park path', 'bedroom bed', 'office standing desk', 'vegetables kitchen cooking', 'chickpeas lentils food', 'vegetables grocery shopping', 'ergonomic office desk', 'backpack hiking', 'water glass', 'vegetables plate', 'bedroom reading lamp', 'book leisure', 'exercise outdoor park', 'cooking kitchen meal', 'friends walking', 'journal notebook', 'walking shoes', 'lunch food table', 'park relaxation', 'walking urban path', 'bedroom interior', 'resting sofa', 'doctor consultation', 'family cooking', 'plant notebook morning',
  ]],
  ['tecnologia', 'computer laptop', [
    'external hard drive', 'keyboard security', 'smartphone authentication', 'email laptop', 'smartphone hand', 'external disk computer', 'camera photographs', 'mobile phone screen', 'computer keyboard', 'laptop documents', 'laptop email keyboard', 'smartphone table', 'laptop browser', 'wireless router', 'computer laptop workspace', 'documents laptop', 'qr code smartphone', 'laptop computer desk', 'email computer', 'digital camera', 'data center server', 'scanner document', 'computer devices', 'laptop downloading', 'desk technology notebook',
  ]],
];
const slugify = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const path = 'src/content/photo-manifest.json';
const manifest = existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : {};
const used = new Set(Object.values(manifest).filter(p => p.selectionVersion === 2).map(p => p.source));
const headers = { 'User-Agent': 'ClaridadDigital/1.0 (editorial photos; contact jbg061108@gmail.com)' };
const strip = s => (s || '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
const pause = ms => new Promise(r => setTimeout(r, ms));
mkdirSync('public/images/articles', { recursive: true });
mkdirSync('src/content', { recursive: true });

async function candidates(query) {
  const params = new URLSearchParams({ action: 'query', format: 'json', generator: 'search', gsrsearch: `${query} filetype:bitmap`, gsrnamespace: '6', gsrlimit: '50', prop: 'imageinfo', iiprop: 'url|extmetadata|size|mime', iiurlwidth: '960' });
  const r = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers, signal: AbortSignal.timeout(25000) });
  if (!r.ok) throw new Error(`search ${r.status}`);
  const data = await r.json();
  return Object.values(data.query?.pages || {}).sort((a,b) => a.index-b.index).filter(p => {
    const i=p.imageinfo?.[0]; const license=i?.extmetadata?.LicenseShortName?.value || '';
    return i && i.mime === 'image/jpeg' && i.width >= 800 && i.width/i.height > 1.05 && i.width/i.height < 2.4 && /CC0|CC BY(?:-SA)? [234]|Public domain/i.test(license) && /unsplash|pixabay|pexels|pixel\.la|stocksnap|pxhere/i.test(JSON.stringify(i.extmetadata)) && !/nude|nudist|naked|sex|porn|weapon|war\b|regiment|putin|trump|obama|epstein|diagram|screenshot|screencast|logo|icon|flag|drawing|engraving|advertisement|banknote|chart|\bmap\b|certificate|painting|poster|illustration|tableau|portrait|selfie|photomontage/i.test(p.title) && !used.has(i.descriptionurl);
  });
}

async function getPhoto(slug, title, query, fallback) {
  if (manifest[slug]?.selectionVersion === 2 && existsSync(`public${manifest[slug].image}`)) return;
  for (const search of [`${query} Unsplash`, `${query.split(' ')[0]} Unsplash`, `${fallback} Unsplash`, `${fallback} incategory:CC-Zero`, `${query.split(' ')[0]} pixabay`, query, fallback, 'office paper Unsplash', 'office desk Unsplash']) {
    let list;
    try { list=await candidates(search); } catch(e) { console.log(`Retry search ${slug}: ${e.message}`); await pause(1500); continue; }
    for (const p of list) {
      const i=p.imageinfo[0];
      try {
        const r=await fetch(i.thumburl || i.url, { headers, signal: AbortSignal.timeout(20000) });
        if(!r.ok) continue;
        const bytes=Buffer.from(await r.arrayBuffer());
        const image=`/images/articles/${slug}.jpg`;
        await sharp(bytes).rotate().resize({width:1200,withoutEnlargement:true}).jpeg({quality:78,mozjpeg:true}).toFile(`public${image}`);
        manifest[slug]={selectionVersion:2,image,imageAlt:`Fotografía relacionada con ${title.charAt(0).toLowerCase()+title.slice(1)}`,title:strip(i.extmetadata.ObjectName?.value || p.title.slice(5)),author:strip(i.extmetadata.Artist?.value || 'Autor indicado en Wikimedia Commons'),license:strip(i.extmetadata.LicenseShortName?.value),licenseUrl:i.extmetadata.LicenseUrl?.value || i.descriptionurl,source:i.descriptionurl,original:i.url,query:search};
        used.add(i.descriptionurl);
        writeFileSync(path,JSON.stringify(manifest,null,2)+'\n');
        console.log(`${Object.keys(manifest).length}/104 ${slug}`);
        return;
      } catch(e) { console.log(`Candidate skipped ${slug}: ${e.message}`); }
    }
    await pause(250);
  }
  throw new Error(`No usable photograph: ${slug} (${query})`);
}

const tasks=groups.flatMap(([file,fallback,queries])=>readFileSync(`content/${file}.txt`,'utf8').trim().split(/\r?\n/).map((line,i)=>({slug:slugify(line.split('|')[0]),title:line.split('|')[0],query:queries[i],fallback})));
tasks.push(
  {slug:'productividad-trabajando-desde-casa',title:'trabajo desde casa',query:'home office laptop desk',fallback:'desk laptop'},
  {slug:'guia-para-ahorrar-dinero-cada-mes',title:'ahorro doméstico',query:'piggy bank coins',fallback:'euro coins savings'},
  {slug:'habitos-para-una-vida-mas-saludable',title:'hábitos de bienestar',query:'salad vegetables bowl',fallback:'vegetables food'},
  {slug:'tendencias-tecnologicas-que-debes-conocer',title:'tecnología cotidiana',query:'laptop smartphone tablet',fallback:'computer technology'},
);
let failures=[];
for(const task of tasks) { try {await getPhoto(task.slug,task.title,task.query,task.fallback);} catch(e){failures.push(task.slug); console.log(e.message);} await pause(150); }
console.log(JSON.stringify({downloaded:Object.keys(manifest).length,failures}));
if(failures.length)process.exitCode=1;
