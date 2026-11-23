import StaticMain from '../_components/StaticMain';
import { pageMetadata } from '../_lib/content';
import { renderBlog } from '../_lib/blog';

export const metadata = pageMetadata({
  title: 'Blog — Tips Biaya & Cara Memilih Jasa Pembuatan Website | Virel Studio',
  description:
    'Blog Virel Studio: artikel jujur seputar jasa pembuatan website, aplikasi, dan game — rincian biaya website UMKM, perbandingan landing page vs company profile, dan tips memilih jasa yang aman. Diperbarui setiap hari.',
  path: '/blog',
});

// Halaman 1 blog: 6 kartu terbaru + navigasi pagination (lihat _lib/blog.js).
export default function Blog() {
  return <StaticMain html={renderBlog(1)} />;
}
