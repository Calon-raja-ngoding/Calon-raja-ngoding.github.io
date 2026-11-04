import { defineThemeConfig } from './types'

/**
 * ============================================================
 *  FILE KONFIGURASI UTAMA WEBSITE
 * ------------------------------------------------------------
 *  Ini file pertama yang perlu kamu ubah.
 *  Semua teks bertanda "GANTI ..." adalah placeholder.
 *  Setelah mengubah file ini, dev server akan otomatis reload.
 * ============================================================
 */
export default defineThemeConfig({
  // Alamat website kamu nanti (tanpa garis miring di akhir).
  // Dipakai untuk sitemap, RSS, dan link absolut.
  // Saat masih lokal boleh dibiarkan, tapi WAJIB diganti sebelum online.
  site: 'https://calon-raja-ngoding.github.io',

  // Nama yang muncul di tab browser dan sebagai judul situs.
  title: 'BangBoksss',

  // Deskripsi singkat, dipakai mesin pencari (Google) dan preview link.
  description:
    'Portofolio dan catatan belajar Nabil Hanief Mafazi, seorang web developer pemula.',

  // Nama penulis. Otomatis dipakai sebagai author default tiap blog post.
  author: 'BangBoksss',

  // Menu di header. Urutannya = urutan tampil.
  // href harus sesuai folder di src/pages/ atau content/
  navbarItems: [
    { label: 'Projects', href: '/projects/' },
    { label: 'Blog', href: '/posts/' },
    { label: 'Skills & Tools', href: '/tools/' },
    { label: 'About', href: '/about/' }
  ],

  // Ikon sosial di footer.
  // Daftar ikon bisa dilihat di https://tabler.io/icons
  // (pakai format "tabler--nama-ikon").
  footerItems: [
    {
      icon: 'tabler--brand-github',
      href: 'https://github.com/Calon-raja-ngoding',
      label: 'GitHub'
    },
    {
      icon: 'tabler--brand-linkedin',
      href: 'https://www.linkedin.com/in/nabil-hanief-mafazi-4b2204292',
      label: 'LinkedIn'
    },
    {
      icon: 'tabler--mail',
      href: 'mailto:nbilhnief@gmail.com',
      label: 'Email'
    },
    {
      icon: 'tabler--brand-instagram',
      href: 'https://www.instagram.com/bang.boksss',
      label: 'Instagram'
    },
    {
      icon: 'tabler--rss',
      href: '/feed.xml',
      label: 'RSS feed',
      // tetap ada datanya, tapi tidak dirender
      hidden: true
    }
  ],

  // ---------- Pengaturan opsional ----------

  // Bahasa halaman (<html lang="...">). 'id' = Indonesia, 'en' = Inggris.
  // Semua isi halaman sudah bahasa Inggris, jadi pakai 'en'.
  locale: 'en',

  // Mode warna awal saat pertama dibuka: 'dark' atau 'light'.
  mode: 'dark',

  // Tampilkan tombol ganti dark/light mode di header?
  modeToggle: true,

  // Tema warna. Pilihan: 'scheme-mono', 'scheme-nord', 'scheme-aurora'.
  colorScheme: 'scheme-custom',

  // Gambar preview saat link dibagikan (opsional).
  openGraphImage: undefined,

  // Blog: jumlah post per halaman & tampilan ('list' atau 'grid').
  postsPerPage: 5,
  postsView: 'list',

  // Proyek: jumlah proyek per halaman & tampilan.
  projectsPerPage: 3,
  projectsView: 'list',

  // Garis progress bacaan di atas halaman (khusus blog post).
  scrollProgress: false,

  // Tombol "kembali ke atas".
  scrollToTop: true,

  // Ikon kecil yang muncul di samping tag. Kunci = nama tag (huruf kecil).
  // Hanya ikon Tabler yang didukung di sini, format: 'tabler--nama-ikon'.
  tagIcons: {
    astro: 'tabler--brand-astro',
    tailwindcss: 'tabler--brand-tailwind',
    javascript: 'tabler--brand-javascript',
    php: 'tabler--brand-php',
    laravel: 'tabler--brand-laravel',
    blade: 'tabler--file-code',
    mysql: 'tabler--brand-mysql',
    dart: 'tabler--brand-dart',
    flutter: 'tabler--device-mobile',
    supabase: 'tabler--database',
    postgresql: 'tabler--database',
    python: 'tabler--brand-python',
    'machine-learning': 'tabler--brain'
  },

  // Tema warna blok kode (light, dark).
  expressiveCodeThemes: ['vitesse-light', 'vitesse-black']
})
