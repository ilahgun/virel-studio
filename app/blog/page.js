import StaticMain from '../_components/StaticMain';
import { readFragment, pageMetadata, escapeHtml } from '../_lib/content';
import { semuaArtikel } from '../_lib/artikel';

export const metadata = pageMetadata({
  title: 'Blog — Tips Biaya & Cara Memilih Jasa Pembuatan Website | Virel Studio',
  description:
    'Blog Virel Studio: artikel jujur seputar jasa pembuatan website, aplikasi, dan game — rincian biaya website UMKM, perbandingan landing page vs company profile, dan tips memilih jasa yang aman. Diperbarui setiap hari.',
  path: '/blog',
});

// Kartu artikel dirender dari content/artikel/index.json (terbaru di atas),
// dengan markup yang sama persis seperti kartu di blog.html lama.
function kartu(a) {
  return `<article class="card blog-card">
          <div class="meta">${escapeHtml(a.tanggal)} • Tim Virel Studio • ${escapeHtml(a.kategori)}</div>
          <h3><a href="/artikel/${a.slug}">${escapeHtml(a.judul)}</a></h3>
          <p>${escapeHtml(a.ringkasan)}</p>
          <a class="btn btn-outline-dark" href="/artikel/${a.slug}">Baca Artikel</a>
        </article>`;
}

export default function Blog() {
  const top = readFragment('pages/blog-top.html');
  const bottom = readFragment('pages/blog-bottom.html');
  const html = top + semuaArtikel.map(kartu).join('\n        ') + '\n' + bottom;
  return <StaticMain html={html} />;
}
