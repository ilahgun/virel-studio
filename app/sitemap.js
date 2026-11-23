import { BASE_URL } from "./_lib/content";
import { semuaArtikel } from "./_lib/artikel";
import { jumlahHalaman, urlHalaman } from "./_lib/blog";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...Array.from({ length: jumlahHalaman - 1 }, (_, i) => ({
      url: BASE_URL + urlHalaman(i + 2),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    })),
    {
      url: `${BASE_URL}/layanan`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/harga`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/portofolio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tentang`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/kontak`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...semuaArtikel.map((a) => ({
      url: `${BASE_URL}/artikel/${a.slug}`,
      lastModified: new Date(a.tanggalISO),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
