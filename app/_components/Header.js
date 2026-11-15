// Header bersama — konversi 1:1 dari legacy partials/header.html.
// Menu aktif ditandai oleh SiteScripts (atribut data-page), sama seperti dulu.
export default function Header() {
  return (
    <header className="site-nav">
      <div className="container nav-inner">
        <a className="brand" href="/">
          <img className="mark-img" src="/assets/logo-mark.svg" alt="Logo Virel Studio" width="34" height="34" />
          <span className="brand-text">
            Virel Studio<small>Web &middot; App &middot; Game</small>
          </span>
        </a>
        <button className="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="navLinks">
          Menu
        </button>
        <nav className="nav-links" id="navLinks" aria-label="Navigasi utama">
          <a href="/" data-page="index">Beranda</a>
          <a href="/layanan" data-page="layanan">Layanan</a>
          <a href="/harga" data-page="harga">Harga</a>
          <a href="/portofolio" data-page="portofolio">Portofolio</a>
          <a href="/blog" data-page="blog">Blog</a>
          <a href="/tentang" data-page="tentang">Tentang</a>
          <a href="/kontak" data-page="kontak">Kontak</a>
          <a
            className="nav-cta"
            href="https://wa.me/6285169944574?text=Halo%20Virel%20Studio%2C%20saya%20mau%20konsultasi%20tentang%20pembuatan%20website%2Faplikasi%2Fgame.%20Boleh%20info%20lebih%20lanjut%3F"
            target="_blank"
            rel="noopener"
          >
            Konsultasi Gratis
          </a>
        </nav>
      </div>
    </header>
  );
}
