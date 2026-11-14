// Virel Studio — Worker perender include header & footer.
// Setiap halaman HTML hanya berisi penanda <div id="include-header"></div>
// dan <div id="include-footer"></div>; worker menggantinya dengan isi
// partials/header.html & partials/footer.html, supaya header & footer
// cukup dirawat dari SATU file parsial untuk semua halaman.
export default {
  async fetch(request, env) {
    const res = await env.ASSETS.fetch(request);
    const type = res.headers.get("content-type") || "";
    if (!type.includes("text/html")) return res;
    try {
      const origin = new URL(request.url).origin;
      const [h, f] = await Promise.all([
        env.ASSETS.fetch(new Request(origin + "/partials/header.html")),
        env.ASSETS.fetch(new Request(origin + "/partials/footer.html")),
      ]);
      if (!h.ok || !f.ok) return res;
      const header = await h.text();
      const footer = await f.text();
      return new HTMLRewriter()
        .on("#include-header", {
          element(el) {
            el.replace(header, { html: true });
          },
        })
        .on("#include-footer", {
          element(el) {
            el.replace(footer, { html: true });
          },
        })
        .transform(res);
    } catch (e) {
      return res;
    }
  },
};
