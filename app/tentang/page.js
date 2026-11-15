import StaticMain from '../_components/StaticMain';
import { readFragment, pageMetadata } from '../_lib/content';

export const metadata = pageMetadata({
  title: 'Tentang Kami — Tim di Balik Virel Studio | Jasa Pembuatan Website, Aplikasi & Game',
  description:
    'Kenalan dengan Virel Studio dan tim developer-nya: Project Manager, Architect, Designer, Frontend, Backend, Database, QA, Security, DevOps, Tech Lead, dan 3D Designer yang mengerjakan website, aplikasi, dan game untuk klien.',
  path: '/tentang',
});

export default function Tentang() {
  return <StaticMain html={readFragment('pages/tentang.html')} />;
}
