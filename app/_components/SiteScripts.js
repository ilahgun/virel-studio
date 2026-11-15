'use client';

// Perilaku interaktif bersama — port 1:1 dari legacy assets/js/main.js:
// menu mobile, penanda menu aktif, tahun hak cipta, form kontak -> WhatsApp.
// (Fallback fetch partials tidak diperlukan lagi: header/footer kini
// dirender sebagai komponen React di layout.)
import { useEffect } from 'react';

const WA_NUMBER = '6285169944574';

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

  return null;
}
