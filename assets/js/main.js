/* Virel Studio — script bersama
   Fungsi: fallback include header/footer (bila tidak dirender server),
   menu mobile, penanda menu aktif, tahun hak cipta, form kontak -> WhatsApp.
   Di produksi, header & footer dirender oleh worker.js dari partials/. */

(function () {
  "use strict";

  var WA_NUMBER = "6285169944574";

  function initHeaderFooter() {
    /* --- Menu mobile (hamburger) --- */
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("navLinks");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    /* --- Penanda menu aktif dari nama file --- */
    var file = (location.pathname.split("/").pop() || "").toLowerCase();
    var page = file.replace(/\.html$/, "") || "index";
    if (page.indexOf("artikel-") === 0 || location.pathname.indexOf("/artikel/") === 0) page = "blog";
    var links = document.querySelectorAll(".nav-links a[data-page]");
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("data-page") === page) {
        links[i].classList.add("active");
      }
    }

    /* --- Tahun hak cipta otomatis --- */
    var yearEl = document.getElementById("yearNow");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  function initForm() {
    /* --- Form kontak -> WhatsApp ---
       Menyusun isi form (nama, kebutuhan, pesan) menjadi satu teks,
       lalu membuka wa.me nomor bisnis Virel Studio di tab baru. */
    var form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nama = (document.getElementById("fNama").value || "").trim();
      var kebutuhan = document.getElementById("fKebutuhan").value || "";
      var pesan = (document.getElementById("fPesan").value || "").trim();

      var lines = [];
      lines.push("Halo Virel Studio, saya mau konsultasi.");
      if (nama) lines.push("Nama: " + nama);
      if (kebutuhan) lines.push("Kebutuhan: " + kebutuhan);
      if (pesan) lines.push("Pesan: " + pesan);

      var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  }

  /* --- Fallback include: bila penanda include masih ada (worker tidak jalan,
         misalnya pratinjau file lokal), ambil partials lewat fetch. --- */
  var slots = [
    { id: "include-header", url: "/partials/header.html" },
    { id: "include-footer", url: "/partials/footer.html" }
  ];
  var pending = [];
  slots.forEach(function (s) {
    var el = document.getElementById(s.id);
    if (el) {
      pending.push(
        fetch(s.url)
          .then(function (r) { return r.text(); })
          .then(function (html) { el.outerHTML = html; })
          .catch(function () {})
      );
    }
  });

  if (pending.length) {
    Promise.all(pending).then(function () {
      initHeaderFooter();
      initForm();
    });
  } else {
    initHeaderFooter();
    initForm();
  }
})();
