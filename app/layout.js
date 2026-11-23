import './globals.css';
import Header from './_components/Header';
import Footer from './_components/Footer';
import SiteScripts from './_components/SiteScripts';

// Ikon situs memakai maskot Virel Studio (karakter bertopi):
// favicon.ico + PNG maskot di public/assets, theme-color #0A1F44.
export const metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/assets/maskot-ikon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/assets/maskot-ikon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/assets/maskot-ikon-512.png',
  },
};

export const viewport = {
  themeColor: '#0A1F44',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Header />
        {children}
        <Footer />
        <SiteScripts />
      </body>
    </html>
  );
}
