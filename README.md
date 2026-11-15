# Website Virel Studio (Next.js)

Website **Virel Studio** — jasa pembuatan website, aplikasi, dan game.
Sejak 15 November 2026 situs ini adalah proyek **Next.js (App Router, JavaScript)**
dengan **static export**: hasil build berupa HTML statis di folder `out/`,
disajikan oleh Cloudflare Workers Static Assets. Tampilan identik dengan
versi HTML murni sebelumnya (file lama tersimpan di folder `legacy-html/`).

- Domain rencana: **virelstudio.id** (sementara: https://virel-studio.gugungitaris.workers.dev)
- WhatsApp bisnis: **+62 851-6994-4574** (`https://wa.me/6285169944574`)
- Bahasa: Bahasa Indonesia

## Menjalankan & Build

```bash
npm install
npm run dev     # pratinjau lokal
npm run build   # static export ke folder out/
```

## Struktur

```
site/
├── app/                     # Route App Router
│   ├── layout.js            # Header + Footer (komponen) + metadata ikon
│   ├── globals.css          # Stylesheet bersama (sama seperti dulu)
│   ├── page.js              # / (Beranda)
│   ├── layanan|harga|portofolio|blog|tentang|kontak/page.js
│   ├── artikel/[slug]/page.js   # Halaman artikel dinamis (statis)
│   ├── _components/         # Header, Footer, StaticMain, SiteScripts
│   └── _lib/                # Pembaca konten + data artikel
├── content/
│   ├── pages/               # Fragmen HTML isi <main> halaman utama
│   └── artikel/
│       ├── index.json       # Metadata semua artikel (judul, slug, tanggal,
│       │                    #  kategori, kataKunci, metaDescription, ringkasan)
│       └── <slug>.html      # Fragmen HTML isi artikel per slug
├── public/                  # favicon.ico, assets/ (logo), _redirects
├── legacy-html/             # Arsip situs HTML murni sebelum migrasi
└── wrangler.jsonc           # Deploy: aset statis dari folder out/
```

Isi halaman utama tersimpan sebagai fragmen HTML di `content/pages/` dan
dirender apa adanya — mengedit teks halaman cukup edit fragmen tersebut.
Header/footer kini komponen React (`app/_components/`), dirawat dari satu tempat.

## Cara Menambah Artikel Baru

1. Tulis isi artikel sebagai fragmen HTML: salin `content/artikel/_template.html`
   menjadi `content/artikel/<slug>.html`, isi semua penanda `[GANTI: ...]`.
   Fragmen hanya berisi badan artikel (paragraf, h2, daftar, CTA) — kepala
   artikel (tautan kembali, `<h1>`, baris tanggal) dirender otomatis.
2. Tambahkan satu entri di `content/artikel/index.json`:
   `slug`, `judul`, `tanggal` (mis. "16 November 2026"), `tanggalISO`
   ("2026-11-16"), `kategori`, `kataKunci`, `metaDescription` (140–160 karakter),
   dan `ringkasan` (1–2 kalimat untuk kartu blog).
3. Kartu di halaman `/blog` dan halaman artikelnya dibuat otomatis saat build —
   tidak perlu lagi mengedit blog.html secara manual.
4. Commit & push ke `main` — Cloudflare membangun ulang dan menerbitkan situs.

Standar SEO tetap: satu kata kunci utama per artikel, tepat satu `<h1>`,
meta description 140–160 karakter, canonical & Open Graph otomatis dari
metadata (basis URL workers.dev; ganti `BASE_URL` di `app/_lib/content.js`
setelah domain virelstudio.id aktif).

## Cara Update Harga

1. Edit fragmen **`content/pages/harga.html`** — sumber harga resmi.
2. Sesuaikan juga cuplikan harga di **`content/pages/index.html`** dan artikel terkait.
3. Perbarui teks tombol WhatsApp per paket (`?text=` pada tautan `wa.me`) bila perlu.

## Deploy (Cloudflare)

- Push ke `main` = deploy otomatis (Workers Static Assets dari folder `out/`).
- Pengaturan build di dashboard Cloudflare: **Build command `npm run build`**,
  deploy `npx wrangler deploy` (wrangler.jsonc menunjuk `assets.directory: ./out`).
- Redirect URL artikel lama (`/artikel-biaya-website-umkm` →
  `/artikel/biaya-website-umkm`, dst.) dipertahankan lewat `public/_redirects`
  yang ikut terbit ke `out/_redirects`.

## Catatan Penting

- Semua tombol konsultasi tertaut ke WhatsApp bisnis **+62 851-6994-4574**.
- Form di halaman Kontak **tidak mengirim data ke server**; isi form disusun
  JavaScript (`app/_components/SiteScripts.js`) menjadi teks lalu dibuka di WhatsApp.
- Kepemilikan domain & akun hosting **selalu atas nama pemilik usaha**.
