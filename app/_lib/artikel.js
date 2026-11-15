// Data artikel: metadata di content/artikel/index.json,
// isi artikel sebagai fragmen HTML di content/artikel/<slug>.html.
import indexData from '../../content/artikel/index.json';

export const semuaArtikel = [...indexData].sort((a, b) =>
  a.tanggalISO < b.tanggalISO ? 1 : a.tanggalISO > b.tanggalISO ? -1 : 0
);

export function artikelBySlug(slug) {
  return semuaArtikel.find((a) => a.slug === slug);
}
