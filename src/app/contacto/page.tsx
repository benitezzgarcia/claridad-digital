import type { Metadata } from 'next';
import Container from '@/components/Container';
import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = { title: 'Contacto', description: 'Consultas y correcciones sobre Claridad Digital.', alternates: { canonical: '/contacto' } };
export default function ContactPage() {
  const enabled = process.env.CONTACT_FORM_ENABLED === 'true' && Boolean(process.env.DATABASE_URL);
  return <main><Container className="py-12">
    <h1 className="text-4xl font-extrabold">Contacto</h1>
    <p className="mt-4 max-w-2xl text-slate-600">Puedes utilizar esta página para comunicar errores, sugerir temas o consultar sobre el contenido.</p>
    {siteConfig.contactEmail ? <p className="mt-6"><a className="text-indigo-700 underline" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></p> : <p className="mt-6 text-slate-600">El canal de contacto editorial estará disponible próximamente.</p>}
    {enabled && <div className="mt-8 max-w-2xl rounded-xl bg-white p-6"><ContactForm /></div>}
  </Container></main>;
}
