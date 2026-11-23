import { notFound } from 'next/navigation';
import StaticMain from '../../_components/StaticMain';
import { readFragment, escapeHtml, BASE_URL } from '../../_lib/content';
import { semuaArtikel, artikelBySlug } from '../../_lib/artikel';

export function generateStaticParams() {
  return semuaArtikel.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = artikelBySlug(slug);
  if (!a) return {};
  const title = `${a.judul} — Virel Studio`;
  const url = `${BASE_URL}/artikel/${a.slug}`;
  return {
    title,
    description: a.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      siteName: 'Virel Studio',
      title,
      description: a.metaDescription,
      url,
      ...(a.gambar ? { images: [`${BASE_URL}${a.gambar}`] } : {}),
    },
  };
}

export default async function ArtikelPage({ params }) {
  const { slug } = await params;
  const a = artikelBySlug(slug);
  if (!a) notFound();
  const isi = readFragment(`artikel/${a.slug}.html`);
  // Kepala artikel sama persis seperti halaman artikel lama:
  // tautan kembali, satu-satunya <h1>, dan baris tanggal.
  const html = `<section class="block">
    <div class="container article-body">
      <p><a href="/blog">← Kembali ke Blog</a></p>
      <h1 style="color:var(--navy);font-size:2rem;line-height:1.3;margin:14px 0 8px;">${escapeHtml(a.judul)}</h1>
      <div class="meta" style="color:var(--muted);font-size:.9rem;margin-bottom:24px;">Diterbitkan ${escapeHtml(a.tanggal)} • oleh Tim Virel Studio</div>
${a.gambar ? `      <img class="article-hero" src="${a.gambar}" alt="${escapeHtml(a.kataKunci)}">\n` : ''}
${isi}
    </div>
  </section>`;
  return <StaticMain html={html} />;
}
