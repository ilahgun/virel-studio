import StaticMain from '../_components/StaticMain';
import { readFragment, pageMetadata } from '../_lib/content';

export const metadata = pageMetadata({
  title: 'Kontak: Konsultasi Gratis Jasa Pembuatan Website, Aplikasi & Game | Virel Studio',
  description:
    'Hubungi Virel Studio untuk konsultasi gratis jasa pembuatan website, aplikasi, dan game. WhatsApp bisnis +62 851-6994-4574. Isi form singkat dan pesanmu diteruskan langsung ke WhatsApp resmi kami.',
  path: '/kontak',
});

export default function Kontak() {
  return <StaticMain html={readFragment('pages/kontak.html')} />;
}
