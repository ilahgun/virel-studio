'use client';

// Perilaku interaktif bersama — port 1:1 dari legacy assets/js/main.js:
// menu mobile, penanda menu aktif, tahun hak cipta, form kontak -> WhatsApp.
// (Fallback fetch partials tidak diperlukan lagi: header/footer kini
// dirender sebagai komponen React di layout.)
// Tambahan 25 Nov 2026: scroll-reveal semua halaman + parallax kursor hero.
// Daftar pemilih reveal HARUS sama dengan blok INTERAKSI di globals.css.
import { useEffect } from 'react';

const WA_NUMBER = '6285169944574';

const REVEAL_SELECTOR =
  '.edu-service, .card, .step, .faq-item, .side-block, .edu-why-panel, ' +
  '.edu-cta-card, .edu-cta, .article-hero, .pagination, .promo-band, ' +
  '.table-wrap, .edu-sec-head, h2.section-title, p.section-sub';

export default function SiteScripts() {
  useEffect(() => {
    /* --- Menu mobile (hamburger) --- */
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('navLinks');
    const onToggle = () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    const onNavClick = (e) => {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    };
    if (toggle && nav) {
      toggle.addEventListener('click', onToggle);
      nav.addEventListener('click', onNavClick);
    }

    /* --- Penanda menu aktif dari nama file --- */
    const file = (location.pathname.split('/').pop() || '').toLowerCase();
    let page = file.replace(/\.html$/, '') || 'index';
    if (page.indexOf('artikel-') === 0 || location.pathname.indexOf('/artikel/') === 0) page = 'blog';
    document.querySelectorAll('.nav-links a[data-page]').forEach((link) => {
      if (link.getAttribute('data-page') === page) link.classList.add('active');
    });

    /* --- Tahun hak cipta otomatis --- */
    const yearEl = document.getElementById('yearNow');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* --- Form kontak -> WhatsApp --- */
    const form = document.getElementById('contactForm');
    const onSubmit = (e) => {
      e.preventDefault();
      const nama = (document.getElementById('fNama').value || '').trim();
      const kebutuhan = document.getElementById('fKebutuhan').value || '';
      const pesan = (document.getElementById('fPesan').value || '').trim();
      const lines = ['Halo Virel Studio, saya mau konsultasi.'];
      if (nama) lines.push('Nama: ' + nama);
      if (kebutuhan) lines.push('Kebutuhan: ' + kebutuhan);
      if (pesan) lines.push('Pesan: ' + pesan);
      const url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
    };
    if (form) form.addEventListener('submit', onSubmit);

    return () => {
      if (toggle && nav) {
        toggle.removeEventListener('click', onToggle);
        nav.removeEventListener('click', onNavClick);
      }
      if (form) form.removeEventListener('submit', onSubmit);
    };
  }, []);

  /* --- Interaksi: scroll-reveal + parallax kursor hero --- */
  useEffect(() => {
    const root = document.documentElement;
    // Skrip utama terbukti jalan: matikan pengaman rv-off dari skrip inline.
    if (window.__rv) {
      clearTimeout(window.__rv);
      window.__rv = null;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Scroll-reveal: elemen tampil fade+naik saat masuk viewport.
       Keadaan tersembunyi diatur CSS di bawah html.js; bila gerak
       dikurangi atau IntersectionObserver tidak ada, paksa tampil. */
    let observer = null;
    if (reduced || !('IntersectionObserver' in window)) {
      root.classList.add('rv-off');
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            observer.unobserve(el);
            el.classList.add('revealed');
            // Setelah transisi selesai, lepas kelas reveal agar
            // transisi hover kartu kembali ringan seperti semula.
            const finish = () => {
              el.classList.remove('revealed');
              el.classList.add('rv-done');
            };
            el.addEventListener('transitionend', function onEnd(e) {
              if (e.propertyName === 'transform') {
                el.removeEventListener('transitionend', onEnd);
                finish();
              }
            });
            setTimeout(finish, 1800);
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => observer.observe(el));
    }

    /* Parallax kursor di hero beranda: maskot, blob, dan 3 kartu
       melayang bergerak mengikuti mouse dengan kedalaman berbeda.
       Hanya pointer halus (mouse/trackpad), mati di layar sentuh
       dan saat prefers-reduced-motion. Dilembutkan dengan lerp rAF. */
    let raf = null;
    let onMove = null;
    let onLeave = null;
    const hero = document.querySelector('.edu-hero');
    const visual = document.querySelector('.edu-hero-visual');
    if (
      hero &&
      visual &&
      !reduced &&
      window.matchMedia('(pointer: fine)').matches
    ) {
      const layers = [
        { el: visual.querySelector('.edu-mascot'), d: 10 },
        { el: visual.querySelector('.edu-blob'), d: -7 },
        { el: visual.querySelector('.fc-1'), d: 20 },
        { el: visual.querySelector('.fc-2'), d: 28 },
        { el: visual.querySelector('.fc-3'), d: 15 },
      ].filter((l) => l.el);
      let tx = 0;
      let ty = 0;
      let cx = 0;
      let cy = 0;
      const loop = () => {
        cx += (tx - cx) * 0.07;
        cy += (ty - cy) * 0.07;
        layers.forEach((l) => {
          l.el.style.transform =
            'translate3d(' + (cx * l.d).toFixed(2) + 'px, ' + (cy * l.d).toFixed(2) + 'px, 0)';
        });
        if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
          raf = requestAnimationFrame(loop);
        } else {
          raf = null;
        }
      };
      const kick = () => {
        if (!raf) raf = requestAnimationFrame(loop);
      };
      onMove = (e) => {
        const r = hero.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
        kick();
      };
      onLeave = () => {
        tx = 0;
        ty = 0;
        kick();
      };
      hero.addEventListener('mousemove', onMove);
      hero.addEventListener('mouseleave', onLeave);
    }

    return () => {
      if (observer) observer.disconnect();
      if (hero && onMove) hero.removeEventListener('mousemove', onMove);
      if (hero && onLeave) hero.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
