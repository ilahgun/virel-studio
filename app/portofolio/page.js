import StaticMain from '../_components/StaticMain';
import { readFragment, pageMetadata } from '../_lib/content';

export const metadata = pageMetadata({
  title: 'Portofolio — Karya & Demo Virel Studio | Jasa Pembuatan Website & Game',
  description:
    'Portofolio Virel Studio: prototipe game simulasi berkebun HTML5 dan website Virel Studio sebagai contoh nyata jasa pembuatan game dan website. Slot klien pertama masih tersedia dengan harga launching.',
  path: '/portofolio',
});

export default function Portofolio() {
  return <StaticMain html={readFragment('pages/portofolio.html')} />;
}
