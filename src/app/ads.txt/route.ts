import { siteConfig } from '@/lib/site-config';

export function GET() {
  const valid = /^ca-pub-\d{16}$/.test(siteConfig.adsenseClientId);
  const text = valid ? `google.com, ${siteConfig.adsenseClientId.slice(3)}, DIRECT, f08c47fec0942fa0\n` : '# AdSense pendiente de configurar.\n';
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
