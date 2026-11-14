# Website Virel Studio

Website statis multi-halaman untuk **Virel Studio** — jasa pembuatan website, aplikasi, dan game.
Setiap menu navigasi membuka **halaman berbeda** (bukan satu halaman panjang ber-anchor).
Murni HTML/CSS/JS tanpa framework dan tanpa build tool, agar mudah dirawat dan langsung jalan di hosting statis gratis.

- Domain rencana: **virelstudio.id**
- WhatsApp bisnis: **+62 851-6994-4574** (`https://wa.me/6285169944574`)
- Bahasa: Bahasa Indonesia

## Struktur Folder

```
site/
├── index.html                                    # Beranda
├── layanan.html                                  # Layanan + alur kerja
├── harga.html                                    # Semua paket & harga resmi
├── portofolio.html                               # Karya demo + slot klien pertama
├── blog.html                                     # Daftar artikel (terbaru di atas)
├── artikel-biaya-website-umkm.html               # Artikel 1
├── artikel-landing-page-vs-company-profile.html  # Artikel 2
├── artikel-template.html                         # Template untuk artikel baru
├── tentang.html                                  # Profil studio + tim
├── kontak.html                                   # Kontak + form -> WhatsApp
├── assets/
│   ├── css/style.css                             # Satu stylesheet bersama
│   └── js/main.js                                # Menu mobile, form kontak, tahun otomatis
├── README.md
└── .gitignore
```

## Cara Deploy ke Cloudflare Pages (Gratis)

Situs ini **tidak butuh build command sama sekali**.

1. Push folder ini ke repository GitHub (repo milik pemilik Virel Studio).
2. Masuk ke [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pilih repository ini.
3. Pada pengaturan build, isi:
   - **Framework preset:** `None`
   - **Build command:** *(kosongkan)*
   - **Build output directory:** `/` (root — karena seluruh file HTML berada di root folder ini)
4. Klik **Save and Deploy**. Situs tayang di subdomain `*.pages.dev`.
5. Setelah domain `virelstudio.id` dibeli (atas nama pemilik), tambahkan sebagai **Custom domain** di proyek Pages tersebut dan ikuti arahan DNS-nya.

Cara yang sama berlaku di Netlify/Vercel: tanpa build command, publish directory = root folder ini.

## Cara Menambah Artikel Baru

Blog dirancang untuk artikel harian. Langkahnya:

1. **Duplikat** file `artikel-template.html`, beri nama `artikel-[slug].html`
   (contoh: `artikel-tips-memilih-jasa-website.html`).
2. **Isi semua bagian bertanda `[GANTI: ...]`** di dalam file tersebut:
   `<title>`, meta description, satu `<h1>`, tanggal terbit, dan isi artikel
   (target ±700–1000 kata, struktur h2/h3, ditutup CTA WhatsApp yang sudah tersedia di template).
3. **Tambahkan kartunya di `blog.html`**: salin blok `<article class="card blog-card">…</article>`
   yang paling atas, ganti tanggal/kategori/judul/ringkasannya, dan arahkan tautannya ke file artikel baru.
   Kartu artikel terbaru selalu diletakkan **paling atas**.
4. Commit & push — Cloudflare Pages menerbitkan ulang situs secara otomatis.

## Cara Update Harga

1. Edit **`harga.html`** — ini satu-satunya sumber harga resmi di situs.
2. Bila harga yang berubah juga tampil ringkas di **`index.html`** (bagian "Paket Paling Populer")
   dan di dalam artikel, sesuaikan juga angka di sana agar konsisten.
3. Jangan lupa memperbarui teks tombol WhatsApp per paket (`?text=` pada tautan `wa.me`)
   bila nama paket atau harganya berubah.

## Catatan Penting

- Semua tombol konsultasi tertaut ke WhatsApp bisnis **+62 851-6994-4574** dengan teks pembuka otomatis.
- Form di `kontak.html` **tidak mengirim data ke server**; isi form disusun JavaScript menjadi teks
  lalu dibuka di WhatsApp resmi (jujur dijelaskan di bawah form).
- Kepemilikan domain & akun hosting **selalu atas nama pemilik usaha**, bukan atas nama pembuat website.

## Header & Footer Bersama (partials)

Header dan footer TIDAK ditulis di tiap halaman. Setiap halaman hanya memuat
penanda `<div id="include-header"></div>` dan `<div id="include-footer"></div>`;
`worker.js` (Cloudflare Worker) menggantinya saat halaman disajikan dengan isi:

- `partials/header.html` — bilah navigasi (logo, menu, tombol Konsultasi Gratis)
- `partials/footer.html` — footer 4 kolom + tombol WhatsApp melayang

Untuk mengubah menu, footer, atau tombol WA di SEMUA halaman sekaligus,
cukup edit file di `partials/` lalu push. Menu aktif per halaman ditandai
otomatis oleh `assets/js/main.js` (atribut `data-page`). Bila situs dibuka
di luar Cloudflare (mis. pratinjau file lokal), `main.js` memuat partials
lewat fetch sebagai cadangan.
