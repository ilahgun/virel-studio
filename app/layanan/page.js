import StaticMain from '../_components/StaticMain';
import { readFragment, pageMetadata } from '../_lib/content';

export const metadata = pageMetadata({
  title: 'Layanan: Jasa Pembuatan Website, Aplikasi & Game | Virel Studio',
  description:
    'Layanan Virel Studio: jasa pembuatan website (landing page, company profile, toko online, web app custom), aplikasi PWA & Android, dan jasa pembuatan game HTML5, 2D, dan Roblox. Berikut alur kerja kami dari konsultasi sampai perawatan.',
  path: '/layanan',
});

export default function Layanan() {
  return <StaticMain html={readFragment('pages/layanan.html')} />;
}
