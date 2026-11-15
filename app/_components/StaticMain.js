// Merender fragmen HTML (isi <main> halaman lama) apa adanya,
// agar tampilan identik 1:1 dengan situs sebelum migrasi.
export default function StaticMain({ html }) {
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
