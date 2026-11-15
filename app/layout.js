import './globals.css';
import Header from './_components/Header';
import Footer from './_components/Footer';
import SiteScripts from './_components/SiteScripts';

// Ikon & theme-color sama seperti <head> halaman lama:
// favicon.ico, logo-mark.svg, favicon-512.png (apple touch), #0A1F44.
export const metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/assets/logo-mark.svg', type: 'image/svg+xml' },
    ],
    apple: '/assets/favicon-512.png',
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
