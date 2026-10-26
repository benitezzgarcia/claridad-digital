import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
const manifest=JSON.parse(readFileSync('src/content/photo-manifest.json','utf8'));
const entries=Object.entries(manifest);
const headers={'User-Agent':'ClaridadDigital/1.0 (editorial photo selection)'};
const strip=s=>(s||'').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').trim();
// Indices refer to the reviewed contact sheets, in manifest order.
const fixes=[
 [6,'intitle:meeting intitle:Unsplash',13], [19,'intitle:reception intitle:office',2], [20,'intitle:planning intitle:Unsplash',11],
 [26,'intitle:calculator intitle:money',32], [27,'intitle:calendar intitle:Unsplash',18], [29,'intitle:piggy intitle:bank',28],
 [30,'intitle:smartphone intitle:payment',10], [34,'intitle:suitcase intitle:Unsplash',43], [37,'intitle:calculator intitle:paper',36],
 [42,'intitle:cardboard intitle:moving',50], [43,'intitle:couple intitle:working',13], [46,'intitle:cafe intitle:table',33],
 [47,'intitle:coins intitle:Unsplash',28], [48,'intitle:credit intitle:card',36], [49,'intitle:art intitle:supplies',21],
 [53,'intitle:standing intitle:desk',2], [57,'intitle:ergonomic intitle:chair',2], [59,'intitle:water intitle:glass',60],
 [62,'intitle:book intitle:reading intitle:Unsplash',17], [64,'intitle:cooking intitle:kitchen',54],
 [67,'intitle:walking intitle:boots',70], [71,'intitle:bedroom intitle:Unsplash',61], [72,'intitle:sofa intitle:Unsplash',52],
 [74,'intitle:family intitle:cooking',64], [76,'intitle:external intitle:hard intitle:drive',93],
 [79,'intitle:email intitle:laptop',86], [81,'intitle:external intitle:disk',76], [82,'intitle:camera intitle:photographs',95],
 [83,'intitle:smartphone intitle:screen intitle:Unsplash',80], [89,'intitle:wireless intitle:router',93],
 [92,'intitle:QR intitle:smartphone',80], [94,'intitle:email intitle:computer',15],
 [96,'intitle:server intitle:data intitle:center',93], [97,'intitle:scanner intitle:document',91],
 [98,'intitle:computer intitle:devices',93], [101,'intitle:home intitle:office intitle:laptop',13],
 [102,'intitle:savings intitle:piggy',28],
];
const used=new Set(Object.values(manifest).map(p=>p.source));
for(const [n,query,fallback] of fixes){
 const [slug,old]=entries[n-1];let chosen;
 try{
  const params=new URLSearchParams({action:'query',format:'json',generator:'search',gsrsearch:`${query} filetype:bitmap`,gsrnamespace:'6',gsrlimit:'20',prop:'imageinfo',iiprop:'url|extmetadata|size|mime',iiurlwidth:'960'});
  const r=await fetch(`https://commons.wikimedia.org/w/api.php?${params}`,{headers,signal:AbortSignal.timeout(20000)});
  const data=await r.json();
  const pages=Object.values(data.query?.pages||{}).sort((a,b)=>a.index-b.index);
  for(const p of pages){const i=p.imageinfo?.[0];const md=i?.extmetadata||{};
   if(!i||i.mime!=='image/jpeg'||i.width<750||i.width/i.height<1.1||i.width/i.height>2.3||used.has(i.descriptionurl)||!/CC0|CC BY(?:-SA)? [234]|Public domain/i.test(md.LicenseShortName?.value||'')||/nude|naked|nudist|sex|porn|epstein|president|politic|war\b|regiment|painting|drawing|engraving|illustration|diagram|screenshot|collage|meme|poster|photomontage/i.test(p.title+' '+(md.Categories?.value||'')))continue;
   const pic=await fetch(i.thumburl||i.url,{headers,signal:AbortSignal.timeout(20000)});if(!pic.ok)continue;
   await sharp(Buffer.from(await pic.arrayBuffer())).rotate().resize({width:1200,withoutEnlargement:true}).jpeg({quality:78,mozjpeg:true}).toFile(`public${old.image}`);
   chosen={selectionVersion:2,image:old.image,imageAlt:old.imageAlt,title:strip(md.ObjectName?.value||p.title.slice(5)),author:strip(md.Artist?.value||'Autor indicado en Wikimedia Commons'),license:strip(md.LicenseShortName?.value),licenseUrl:md.LicenseUrl?.value||i.descriptionurl,source:i.descriptionurl,original:i.url,query};used.add(i.descriptionurl);break;
  }
 }catch(e){console.log(`Search fallback ${n}: ${e.message}`);}
 if(!chosen){const source=manifest[entries[fallback-1][0]];await sharp(`public${source.image}`).jpeg({quality:85}).toFile(`public${old.image}`);chosen={...source,image:old.image,imageAlt:old.imageAlt};}
 manifest[slug]=chosen;writeFileSync('src/content/photo-manifest.json',JSON.stringify(manifest,null,2)+'\n');console.log(`${n} ${chosen.title}`);
}
