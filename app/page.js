import StaticMain from './_components/StaticMain';
import { readFragment, pageMetadata } from './_lib/content';

export const metadata = pageMetadata({
  title: 'Virel Studio | Jasa Pembuatan Website, Aplikasi & Game',
  description:
    'Virel Studio adalah jasa pembuatan website, aplikasi, dan game untuk UMKM dan bisnis. Harga tertulis jelas sejak awal, proses transparan per milestone, garansi bug-fix 30 hari. Konsultasi gratis via WhatsApp.',
  path: '/',
});

export default function Beranda() {
  return <StaticMain html={readFragment('pages/index.html')} />;
}
