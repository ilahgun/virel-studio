import { notFound } from 'next/navigation';
import ArticleSidebar from '../../_components/ArticleSidebar';
import { readFragment, escapeHtml, BASE_URL } from '../../_lib/content';
import { semuaArtikel, artikelBySlug } from '../../_lib/artikel';

export function generateStaticParams() {
  return semuaArtikel.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = artikelBySlug(slug);
  if (!a) return {};
  const title = `${a.judul} | Virel Studio`;
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
  // Isi artikel kini duduk di kolom kiri layout dua kolom;
  // kolom kanan diisi sidebar artikel terkait dan terbaru.
  const body = `      <p><a href="/blog">← Kembali ke Blog</a></p>
      <h1 style="font-family:'Plus Jakarta Sans','Poppins',sans-serif;font-weight:800;letter-spacing:-0.02em;color:var(--ink-2);font-size:2.1rem;line-height:1.22;margin:14px 0 8px;">${escapeHtml(a.judul)}</h1>
      <div class="meta" style="color:var(--muted-2);font-size:.9rem;margin-bottom:24px;">Diterbitkan ${escapeHtml(a.tanggal)} • oleh Tim Virel Studio</div>
${a.gambar ? `      <img class="article-hero" src="${a.gambar}" alt="${escapeHtml(a.kataKunci)}">\n` : ''}
${isi}`;
  return (
    <main>
      <section className="block">
        <div className="container article-layout">
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <ArticleSidebar aktif={a} daftar={semuaArtikel} />
        </div>
      </section>
    </main>
  );
}
