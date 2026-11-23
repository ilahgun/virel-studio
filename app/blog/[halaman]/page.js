import { notFound } from 'next/navigation';
import StaticMain from '../../_components/StaticMain';
import { pageMetadata } from '../../_lib/content';
import { renderBlog, jumlahHalaman } from '../../_lib/blog';

// Hanya halaman 2..N yang dirender statis; nomor lain 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: jumlahHalaman - 1 }, (_, i) => ({
    halaman: String(i + 2),
  }));
}

export async function generateMetadata({ params }) {
  const { halaman } = await params;
  return pageMetadata({
    title: `Blog: Halaman ${halaman} | Virel Studio`,
    description: `Blog Virel Studio halaman ${halaman}: artikel jujur seputar jasa pembuatan website, aplikasi, dan game untuk UMKM. Diperbarui setiap hari.`,
    path: `/blog/${halaman}`,
  });
}

export default async function BlogHalaman({ params }) {
  const { halaman } = await params;
  const n = Number(halaman);
  if (!Number.isInteger(n) || n < 2 || n > jumlahHalaman) notFound();
  return <StaticMain html={renderBlog(n)} />;
}
