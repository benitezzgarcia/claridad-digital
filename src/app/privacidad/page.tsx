import type { Metadata } from 'next';
import Container from '@/components/Container';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = { title: 'Privacidad', alternates: { canonical: '/privacidad' } };
export default function PrivacyPage() {
  return <main><Container className="prose-article max-w-3xl py-12">
    <h1 className="text-4xl font-extrabold">Privacidad</h1>
    <p className="text-sm text-slate-500">Actualización: 26 de octubre de 2026</p>
    <h2 className="mt-8 text-xl font-bold">Navegación y alojamiento</h2>
    <p>Claridad Digital publica guías informativas. El proveedor de alojamiento puede tratar datos técnicos, como la dirección IP y solicitudes al servidor, para prestar y proteger el servicio. Esta versión no incorpora herramientas de analítica.</p>
    <h2 className="mt-8 text-xl font-bold">Contacto</h2>
    <p>Si está habilitado un canal de contacto, los datos que envíes se utilizarán para gestionar la consulta. Evita incluir información sensible que no sea necesaria.</p>
    <h2 className="mt-8 text-xl font-bold">Publicidad</h2>
    <p>{siteConfig.adsenseEnabled ? 'La publicidad de Google AdSense está habilitada en la configuración del sitio. La información y las opciones de consentimiento deben consultarse en el gestor de consentimiento del sitio.' : 'La publicidad de Google AdSense no está activada en esta versión. Antes de activarla se deberán completar los datos del responsable y configurar la información y el consentimiento correspondientes.'}</p>
    <h2 className="mt-8 text-xl font-bold">Enlaces externos</h2>
    <p>Las fuentes enlazadas tienen sus propias condiciones de privacidad. Abrir un enlace te lleva al sitio de su proveedor.</p>
    <h2 className="mt-8 text-xl font-bold">Responsable y consultas</h2>
    <p>{siteConfig.contactEmail ? <>Contacto editorial: <a href={`mailto:${siteConfig.contactEmail}`} className="text-indigo-700 underline">{siteConfig.contactEmail}</a>.</> : 'Los datos identificativos del titular y su dirección de contacto están pendientes de incorporación. Esta información debe completarse antes de solicitar la monetización.'}</p>
  </Container></main>;
}
