// Render daftar blog dengan pagination statis: 6 kartu per halaman.
// Halaman 1 di /blog, halaman lanjutan di /blog/2, /blog/3, dst.
import { readFragment, escapeHtml } from './content';
import { semuaArtikel } from './artikel';

export const PER_HALAMAN = 6;
export const jumlahHalaman = Math.ceil(semuaArtikel.length / PER_HALAMAN);

export function urlHalaman(n) {
  return n === 1 ? '/blog' : `/blog/${n}`;
}

// Kartu artikel dari content/artikel/index.json (terbaru di atas),
// markup sama persis seperti kartu blog lama.
function kartu(a) {
  return `<article class="card blog-card">
          <div class="meta">${escapeHtml(a.tanggal)} • Tim Virel Studio • ${escapeHtml(a.kategori)}</div>
          <h3><a href="/artikel/${a.slug}">${escapeHtml(a.judul)}</a></h3>
          <p>${escapeHtml(a.ringkasan)}</p>
          <a class="btn btn-outline-dark" href="/artikel/${a.slug}">Baca Artikel</a>
        </article>`;
}

function navigasi(aktif) {
  if (jumlahHalaman <= 1) return '';
  const nomor = Array.from({ length: jumlahHalaman }, (_, i) => i + 1)
    .map((n) =>
      n === aktif
        ? `<span class="page-num active" aria-current="page">${n}</span>`
        : `<a class="page-num" href="${urlHalaman(n)}">${n}</a>`
    )
    .join('\n        ');
  const sebelum =
    aktif > 1
      ? `<a class="btn btn-outline-dark" href="${urlHalaman(aktif - 1)}">← Sebelumnya</a>`
      : `<span class="btn btn-outline-dark is-disabled" aria-disabled="true">← Sebelumnya</span>`;
  const berikut =
    aktif < jumlahHalaman
      ? `<a class="btn btn-outline-dark" href="${urlHalaman(aktif + 1)}">Berikutnya →</a>`
      : `<span class="btn btn-outline-dark is-disabled" aria-disabled="true">Berikutnya →</span>`;
  return `<nav class="pagination" aria-label="Halaman blog">
        ${sebelum}
        ${nomor}
        ${berikut}
      </nav>

      `;
}

export function renderBlog(halaman) {
  const top = readFragment('pages/blog-top.html');
  const bottom = readFragment('pages/blog-bottom.html');
  const potong = semuaArtikel.slice(
    (halaman - 1) * PER_HALAMAN,
    halaman * PER_HALAMAN
  );
  // Navigasi disisipkan tepat sebelum kartu WhatsApp di blog-bottom.html.
  const bottomBernavigasi = bottom.replace(
    '<div class="card" style="margin-top:22px;">',
    (m) => navigasi(halaman) + m
  );
  return top + potong.map(kartu).join('\n        ') + '\n' + bottomBernavigasi;
}
