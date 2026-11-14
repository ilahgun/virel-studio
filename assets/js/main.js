/* Virel Studio — script bersama
   Fungsi: menu mobile, tahun hak cipta otomatis, form kontak -> WhatsApp. */

(function () {
  "use strict";

  var WA_NUMBER = "6285169944574";

  /* --- Menu mobile (hamburger) --- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("mainNav");
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

  /* --- Tahun hak cipta otomatis --- */
  var yearEl = document.getElementById("yearNow");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* --- Form kontak -> WhatsApp ---
     Menyusun isi form (nama, kebutuhan, pesan) menjadi satu teks,
     lalu membuka wa.me nomor bisnis Virel Studio di tab baru. */
  var form = document.getElementById("contactForm");
  if (form) {
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
})();
