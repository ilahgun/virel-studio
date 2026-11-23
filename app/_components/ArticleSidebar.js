// Sidebar halaman artikel: blok Artikel Terkait, Artikel Terbaru, dan
// kartu CTA konsultasi. Data berasal dari content/artikel/index.json lewat
// helper app/_lib/artikel (semuaArtikel sudah terurut terbaru lebih dulu).
export default function ArticleSidebar({ aktif, daftar }) {
  const lain = daftar.filter((x) => x.slug !== aktif.slug);

  // Terkait: utamakan kategori yang sama dengan artikel yang dibuka,
  // kekurangan diisi artikel lain mulai dari yang terbaru.
  const seKategori = lain.filter((x) => x.kategori === aktif.kategori);
  const terkait = [
    ...seKategori,
    ...lain.filter((x) => x.kategori !== aktif.kategori),
  ].slice(0, 3);

  // Terbaru: 4 artikel terbaru selain yang sedang dibuka. Artikel yang
  // sudah tampil di blok Terkait tidak diulang selama pilihan lain cukup.
  const slugTerkait = new Set(terkait.map((x) => x.slug));
  const terbaru = [
    ...lain.filter((x) => !slugTerkait.has(x.slug)),
    ...terkait,
  ].slice(0, 4);

  const item = (x) => (
    <li className="side-item" key={x.slug}>
      <a href={`/artikel/${x.slug}`}>
        {x.gambar ? (
          <img
            className="side-thumb"
            src={x.gambar}
            alt={x.kataKunci}
            loading="lazy"
          />
        ) : null}
        <span className="side-item-text">
          <span className="side-item-title">{x.judul}</span>
          <span className="side-item-date">{x.tanggal}</span>
        </span>
      </a>
    </li>
  );

  return (
    <aside
      className="article-sidebar"
      aria-label="Artikel terkait dan artikel terbaru"
    >
      <div className="side-block">
        <h2 className="side-title">Artikel Terkait</h2>
        <ul className="side-list">{terkait.map(item)}</ul>
      </div>
      <div className="side-block">
        <h2 className="side-title">Artikel Terbaru</h2>
        <ul className="side-list">{terbaru.map(item)}</ul>
      </div>
      <div className="card side-cta">
        <h3>Mau Punya Website Sendiri?</h3>
        <p>
          Ceritakan kebutuhan bisnis Anda ke tim Virel Studio. Konsultasi
          gratis, tanpa komitmen apa pun.
        </p>
        <a className="btn btn-accent" href="/kontak">
          Konsultasi Gratis
        </a>
      </div>
    </aside>
  );
}
