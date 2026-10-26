import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
export const metadata: Metadata = { title: 'Sobre nosotros', alternates: { canonical: '/sobre-nosotros' } };
export default function AboutPage() {
 return <main><Container className="prose-article max-w-3xl py-12">
   <h1 className="text-4xl font-extrabold">Sobre Claridad Digital</h1>
   <p>Un proyecto de divulgación en español sobre productividad, organización económica del hogar, bienestar cotidiano y tecnología.</p>
   <h2 className="mt-8 text-2xl font-bold">Qué encontrarás</h2>
   <p>Guías breves con pasos prácticos, ejemplos ilustrativos y errores que conviene evitar. Los cálculos no representan ofertas comerciales y el contenido no sustituye atención sanitaria ni asesoramiento profesional individual.</p>
   <h2 className="mt-8 text-2xl font-bold">Cómo se prepara el contenido</h2>
   <p>El contenido se prepara con asistencia de inteligencia artificial. Las fuentes de consulta se muestran cuando corresponde para facilitar la ampliación y la comprobación. No afirmamos haber probado productos ni disponer de un equipo de especialistas que no se ha identificado.</p>
   <h2 className="mt-8 text-2xl font-bold">Correcciones</h2>
   <p>Las interfaces, condiciones de servicios y recomendaciones pueden cambiar. Consulta siempre la documentación original antes de tomar una decisión. Puedes consultar los canales disponibles en la <Link href="/contacto" className="text-indigo-700 underline">página de contacto</Link>.</p>
 </Container></main>;
}
