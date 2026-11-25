import './globals.css';
import Header from './_components/Header';
import Footer from './_components/Footer';
import SiteScripts from './_components/SiteScripts';

// Ikon situs memakai maskot Virel Studio versi melambai (transparan/vektor):
// favicon.svg + favicon.ico + PNG maskot di public/assets, theme-color #0A1F44.
export const metadata = {
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/assets/maskot-lambai-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/assets/maskot-lambai-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/assets/maskot-lambai-512.png',
  },
};

export const viewport = {
  themeColor: '#0A1F44',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Penanda JS aktif sebelum paint: animasi masuk & scroll-reveal di
            globals.css hanya berlaku di bawah html.js, jadi tanpa JS semua
            konten tetap terlihat. Pengaman rv-off: bila skrip utama gagal
            jalan dalam 3,5 detik, semua elemen reveal dipaksa tampil. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');window.__rv=setTimeout(function(){document.documentElement.classList.add('rv-off')},3500);",
          }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <SiteScripts />
      </body>
    </html>
  );
}
