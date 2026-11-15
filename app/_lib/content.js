// Pembaca fragmen HTML statis dari folder content/ (dipakai saat build,
// karena situs ini static export — semua halaman di-prerender).
import { readFileSync } from 'fs';
import path from 'path';

export const BASE_URL = 'https://virel-studio.gugungitaris.workers.dev';

export function readFragment(relPath) {
  return readFileSync(path.join(process.cwd(), 'content', relPath), 'utf-8');
}

export function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Metadata standar halaman biasa (title + description + canonical + OG),
// pola yang sama seperti yang dipakai halaman artikel sejak commit cbc4298.
export function pageMetadata({ title, description, path: p }) {
  const url = BASE_URL + p;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: 'Virel Studio',
      title,
      description,
      url,
    },
  };
}
