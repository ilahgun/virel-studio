import StaticMain from '../_components/StaticMain';
import { readFragment, pageMetadata } from '../_lib/content';

export const metadata = pageMetadata({
  title: 'Harga & Paket — Jasa Pembuatan Website, Aplikasi & Game | Virel Studio',
  description:
    'Daftar harga transparan Virel Studio: landing page Rp750.000, company profile Rp1.900.000, toko online Rp3.900.000, web app custom mulai Rp7.500.000, mini game HTML5 mulai Rp1.900.000, game Roblox mulai Rp2.900.000. DP 50%, garansi bug-fix 30 hari.',
  path: '/harga',
});

export default function Harga() {
  return <StaticMain html={readFragment('pages/harga.html')} />;
}
