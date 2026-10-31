# Panduan Membuat Web Portofolio

Panduan ini ditulis untuk kamu yang baru pertama kali membuat website.
Setiap langkah dijelaskan **apa** yang dilakukan dan **kenapa**.

---

## 0. Gambaran Besar: Apa yang Sedang Kita Pakai?

| Istilah         | Artinya                                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Astro**       | _Framework_ pembuat website. Dia mengubah file `.md`, `.mdx`, dan `.astro` menjadi file HTML biasa yang cepat dibuka browser. |
| **Nordlys**     | _Theme_ (tema) Astro. Isinya sudah ada layout, menu, blog, galeri, dan halaman proyek. Kita tinggal isi kontennya.            |
| **pnpm**        | Pengelola paket (_package manager_). Tugasnya mengunduh kode buatan orang lain (disebut _dependency_) yang dipakai tema ini.  |
| **Markdown**    | Format teks sederhana untuk menulis konten. `**tebal**`, `[link](url)`, `# Judul`.                                            |
| **Frontmatter** | Blok di paling atas file Markdown, di antara dua garis `---`. Isinya data tentang halaman itu (judul, tanggal, tag).          |
| **Dev server**  | Server lokal di komputer kamu. Setiap kali file disimpan, browser otomatis menampilkan perubahan.                             |
| **Build**       | Proses mengubah seluruh project menjadi file HTML/CSS/JS siap upload ke internet. Hasilnya ada di folder `dist/`.             |

Alur kerjanya singkat:

```
tulis konten (.md)  ->  Astro mengubahnya jadi HTML  ->  browser menampilkan
```

---

## 1. Menyiapkan Komputer

Butuh dua hal:

1. **Node.js** (versi 20 ke atas) — mesin yang menjalankan Astro.
2. **pnpm** — pengelola paket.

Cek apakah sudah terpasang. Buka PowerShell, lalu jalankan:

```powershell
node -v
pnpm -v
```

Kalau `pnpm` belum ada, pasang lewat npm (npm sudah otomatis ikut Node.js):

```powershell
npm install -g pnpm
```

> **Kenapa pnpm, bukan npm?** Tema ini punya file `pnpm-lock.yaml` yang mengunci
> versi persis semua paket. Memakai pnpm membuat hasilnya sama persis dengan
> yang diuji oleh pembuat tema.

---

## 2. Memasang Dependency

Di folder project (`D:\webPortofolio`):

```powershell
pnpm install --frozen-lockfile
```

Perintah ini membaca `package.json` (daftar paket yang dibutuhkan) dan mengunduh
semuanya ke folder `node_modules/`.

> `--frozen-lockfile` artinya "jangan ubah versi apa pun, pakai yang sudah
> tercatat di lockfile". Ini membuat pemasangan bisa diulang dengan hasil sama.

Folder `node_modules/` **tidak boleh** diedit manual dan tidak perlu di-commit ke
Git (sudah masuk `.gitignore`).

---

## 3. Menjalankan Website Secara Lokal

```powershell
pnpm dev
```

Buka **http://localhost:4321** di browser.

Yang perlu kamu tahu:

- Biarkan terminal ini tetap terbuka selama ngoding.
- Simpan file apa pun, browser langsung ter-update (namanya _hot reload_).
- Hentikan server dengan `Ctrl + C` di terminal.

Perintah lain yang berguna:

| Perintah       | Fungsi                                       |
| -------------- | -------------------------------------------- |
| `pnpm dev`     | Jalankan server untuk ngoding                |
| `pnpm build`   | Buat versi final ke folder `dist/`           |
| `pnpm preview` | Lihat hasil `pnpm build` seperti di internet |
| `pnpm check`   | Cek error TypeScript/Astro tanpa build       |
| `pnpm format`  | Rapikan format kode otomatis                 |

---

## 4. Mengenal Struktur Folder

```
D:\webPortofolio
├─ src/
│  ├─ theme.config.ts     <-- KONFIGURASI UTAMA (mulai dari sini)
│  ├─ pages/              <-- halaman: /, /about, /projects, /posts ...
│  ├─ layouts/            <-- kerangka halaman (header, footer, dll)
│  ├─ components/         <-- potongan tampilan yang bisa dipakai ulang
│  ├─ style/              <-- CSS, tema warna, font
│  └─ assets/             <-- logo & font
├─ content/
│  ├─ posts/              <-- isi blog (satu file = satu artikel)
│  ├─ projects/           <-- isi portofolio proyek
│  ├─ posts.md            <-- pengantar halaman /posts/
│  └─ projects.md         <-- pengantar halaman /projects/
├─ public/                <-- file statis: favicon, gambar
├─ astro.config.ts        <-- konfigurasi Astro
└─ package.json           <-- daftar dependency & script
```

**Aturan penting:** nama folder di `src/pages/` = alamat URL.

```
src/pages/about.mdx        ->  /about/
src/pages/posts/[...id]/   ->  /posts/judul-artikel/
```

---

## 5. Langkah 1: Isi Identitas Website

Buka `src/theme.config.ts`. Ini "kartu identitas" website kamu.

Yang **wajib** diubah:

| Properti      | Artinya                                                  |
| ------------- | -------------------------------------------------------- |
| `site`        | Alamat website nanti, misal `https://namakamu.github.io` |
| `title`       | Nama website, muncul di tab browser                      |
| `description` | Deskripsi singkat untuk Google                           |
| `author`      | Nama kamu                                                |

Yang **sebaiknya** diubah:

| Properti      | Artinya                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------- |
| `navbarItems` | Menu di atas. `href` harus cocok dengan folder di `src/pages/`                                |
| `footerItems` | Ikon sosial. Format ikon: `tabler--nama-ikon` dari [tabler.io/icons](https://tabler.io/icons) |
| `locale`      | `id` untuk bahasa Indonesia                                                                   |
| `colorScheme` | `scheme-mono`, `scheme-nord`, atau `scheme-aurora`                                            |

> **Kenapa `site` penting?** Astro memakainya untuk membuat link absolut di
> sitemap, RSS, dan tag preview saat link dibagikan ke media sosial. Kalau salah,
> preview link akan rusak.

---

## 6. Langkah 2: Ubah Halaman Depan

File: `src/pages/index.md`

```markdown
---
layout: '@/layouts/LandingLayout.astro'
title: Nama Kamu
background: true
logo: true
---

Teks di sini tampil di bawah nama kamu.
```

- `background: true` — efek cahaya di belakang nama.
- `logo: true` — tampilkan logo. Ganti gambarnya di `src/assets/logo.svg`.

---

## 7. Langkah 3: Tulis Halaman "Tentang"

File: `src/pages/about.mdx`

Ekstensi `.mdx` = Markdown + boleh menyisipkan komponen. Untuk pemula, anggap
saja seperti Markdown biasa.

Cheatsheet Markdown:

```markdown
# Judul besar

## Sub judul

**tebal**, _miring_, `kode`

- daftar
- daftar

[teks link](https://contoh.com)

| Kolom | Kolom |
| ----- | ----- |
| isi   | isi   |
```

> **Jebakan pemula:** komentar HTML `<!-- ... -->` **tidak bisa** dipakai di file
> `.mdx`. Di MDX, tulis komentar sebagai `{/* ... */}`.

### Ganti foto profil di halaman Tentang

Foto dan nama berada di `src/components/about/ProfileHeader.astro`.

Tata letaknya: **foto rasio 3:4 di kiri**, di sebelah kanannya nama dan
deskripsi singkat. Di layar HP, foto pindah ke atas dan teks turun ke bawah.

Nama dan deskripsi cukup diubah di `about.mdx`:

```mdx
<ProfileHeader name="Nama Baru">
  Deskripsi singkat tentang kamu, ditulis di sini.
</ProfileHeader>
```

Untuk foto, siapkan foto baru lalu **timpa** file ini dengan nama yang sama:

```
content/assets/about/profile.png
```

Aturan singkat:

| Aturan | Kenapa |
| ------ | ------ |
| Bentuknya harus **3:4** (contoh 540 × 720) | Sama dengan rasio yang ditampilkan. Kalau beda, fotonya akan melar atau terpotong |
| Isi crop-nya kepala + badan atas | Foto seluruh badan membuat wajah jadi terlalu kecil |
| Cukup sekitar 540 × 720 | Yang tampil hanya ±192px lebar. Jangan pakai foto 5 MB, halaman jadi lambat |

Kalau hasil crop-nya kurang pas (wajah kegeser), angka yang perlu diubah ada di
`src/components/about/ProfileHeader.astro`:

- `w-44` / `md:w-48` → lebar foto di tablet dan desktop (176px / 192px)
- `max-w-[240px]` → lebar maksimum foto di HP

---

## 8. Langkah 4: Tambah Proyek ke Portofolio

Satu proyek = satu file Markdown di `content/projects/`. Nama file itu yang jadi
alamat halamannya.

Buat file baru, misal `sistem-absensi.md`, lalu halamannya otomatis jadi
`/projects/sistem-absensi/`.

```markdown
---
title: Sistem Absensi
description: Aplikasi absensi berbasis web untuk praktikum kampus.
status: Active
startDate: 2026-01-15
endDate: 2026-02-20
url: https://absensi.contoh.com
sourceUrl: https://github.com/Calon-raja-ngoding/sistem-absensi
tags:
  - laravel
  - mysql
previewImage: '../assets/projects/absensi.png'
---

## Overview

Ceritakan proyeknya: masalah apa yang diselesaikan, untuk siapa, dan apa peranmu.

## Tech Stack

- Laravel 11
- MySQL
- Tailwind CSS

## What I Learned

Hal yang baru kamu pahami setelah mengerjakan proyek ini.
```

Penjelasan frontmatter:

| Properti       | Wajib? | Arti                                                          |
| -------------- | ------ | ------------------------------------------------------------- |
| `title`        | ya     | Nama proyek                                                   |
| `description`  | ya     | Ringkasan satu-dua kalimat. Tampil di daftar dan di atas detail |
| `status`       | tidak  | Label kecil di samping judul, misal `Active` atau `Finished`  |
| `url`          | tidak  | Link demo/hasil. Muncul sebagai tombol **Live Preview**        |
| `sourceUrl`    | tidak  | Link repo. Muncul sebagai tombol **Source Code**               |
| `startDate`    | tidak  | Tanggal mulai (format `YYYY-MM-DD`)                           |
| `endDate`      | tidak  | Tanggal selesai. Kosongkan kalau masih berjalan               |
| `tags`         | tidak  | Kategori. Otomatis muncul di halaman `/tags/`                 |
| `previewImage` | tidak  | Gambar besar di atas daftar proyek                            |
| `showToC`      | tidak  | Tampilkan daftar isi. Default `true`, ubah ke `false` untuk mematikan |

> **Kalau tombolnya belum mau dipakai**, jangan dihapus — cukup beri `#` di depan barisnya:
>
> ```yaml
> # url: https://calon-raja-ngoding.github.io
> # sourceUrl: https://github.com/Calon-raja-ngoding/webPortofolio
> ```
>
> Tombol yang link-nya kosong otomatis tidak muncul, jadi tidak ada tombol rusak atau ruang kosong yang tertinggal. Hapus tanda `#`-nya lagi kalau situsnya sudah online.

### Dua halaman yang terlibat

| Halaman               | Isinya                                                          |
| --------------------- | --------------------------------------------------------------- |
| `/projects/`          | Daftar semua proyek: gambar, judul, tanggal, tag, tombol link    |
| `/projects/<nama>/`   | Halaman detail: badge status, deskripsi, tombol, daftar isi, isi Markdown |

Di daftar, isi Markdown **tidak** ditampilkan — hanya `description`. Jadi
`description` harus bisa berdiri sendiri, jangan cuma "lihat detailnya".

Isi Markdown baru muncul di halaman detail. Setiap `##` judul otomatis masuk ke
daftar isi, jadi pakai `##` untuk bagian besar dan `###` untuk sub-bagian.

**Cara menambah gambar:** taruh file gambar di `content/assets/projects/`, lalu
rujuk dengan path relatif dari file Markdown-nya (`../assets/projects/namafile.png`).

Gambar boleh lebar. Di daftar proyek gambar ditampilkan selebar kolom konten
(maksimal 768px) dengan rasio asli, jadi tidak akan terpotong. Rasio sekitar
**1,7:1 sampai 2:1** paling enak dilihat. Tangkapan layar 1600×900 sudah pas.

> **Kenapa nama file diawali `_`?** File yang diawali garis bawah diabaikan oleh
> Astro. Berguna untuk menyimpan contoh yang tidak ingin ditampilkan.

---

## 9. Langkah 5: Tulis Blog Pertama

Buat file di `content/posts/`, misal `belajar-astro.md`. Nama file itu yang jadi
alamat artikelnya: `belajar-astro.md` → `/posts/belajar-astro/`.

```markdown
---
title: Apa yang Saya Pelajari Hari Ini
description: Ringkasan singkat isi artikel, tampil di daftar blog.
publishedDate: 2026-10-25
tags:
  - astro
  - javascript
---

Isi artikel...
```

| Properti        | Wajib? | Arti                                           |
| --------------- | ------ | ---------------------------------------------- |
| `title`         | ya     | Judul artikel                                  |
| `description`   | ya     | Ringkasan untuk daftar blog & Google           |
| `publishedDate` | ya     | Tanggal terbit                                 |
| `updatedDate`   | tidak  | Tanggal revisi terakhir                        |
| `draft`         | tidak  | `true` = belum ditampilkan                     |
| `tags`          | tidak  | Kategori artikel                               |
| `showToC`       | tidak  | Tampilkan daftar isi otomatis (default `true`) |
| `previewImage`  | tidak  | Gambar thumbnail (taruh di `content/assets/posts/`) |

> **Tips:** mulai dari `draft: true` kalau belum selesai. Artikel tidak akan
> muncul sampai kamu mengubahnya jadi `false`.

> **Catatan:** `content/assets/posts/` sekarang kosong karena gambar bawaan tema
> sudah dihapus. Kalau kamu belum punya gambar thumbnail, **jangan tulis baris
> `previewImage`** — artikel tetap tampil normal tanpa gambar.

---

## 10. Langkah 6: Ganti Gambar & Favicon

| Yang diganti                  | Lokasi file                |
| ----------------------------- | -------------------------- |
| Logo (halaman depan & header) | `src/assets/logo.svg`      |
| Favicon (ikon tab browser)    | `public/favicon.svg`       |
| Gambar proyek                 | `content/assets/projects/` |
| Gambar blog                   | `content/assets/posts/`    |
| Gambar galeri foto            | `content/assets/albums/`   |

**Format yang disarankan:** `.webp` atau `.jpg` untuk foto, `.svg` untuk logo.
Ukuran lebar 1200–1600 px sudah cukup.

> **Kenapa tidak perlu resize manual?** Astro punya komponen `<Image />` yang
> otomatis mengompres dan mengubah ukuran gambar saat build. Kamu cukup taruh
> file aslinya.

---

## 11. Langkah 7: Sesuaikan Tampilan (Opsional)

Kalau ingin mengubah warna:

- `src/style/color-schemes.css` — definisi tiap skema warna.
- `src/style/theme.css` — variabel tema.
- `src/style/main.css` — aturan global.

Untuk mengubah kerangka halaman (header, footer, lebar konten):

- `src/layouts/BaseLayout.astro` — kerangka semua halaman.
- `src/components/layout/Header.astro` — menu atas.
- `src/components/layout/Footer.astro` — bagian bawah.

> **Saran untuk pemula:** jangan mulai dari sini. Ubah konten dulu, baru
> sentuh CSS setelah kamu paham strukturnya. Kalau rusak, kamu bisa
> mengembalikannya dengan `git checkout <nama-file>`.

---

## 12. Langkah 8: Simpan Perubahan dengan Git

Git mencatat riwayat perubahan, jadi kamu bisa kembali ke versi sebelumnya.

```powershell
git status              # lihat file apa yang berubah
git add .               # tandai semua perubahan untuk disimpan
git commit -m "isi website dengan data diri dan proyek pertama"
```

> **Penting:** repo ini masih terhubung ke repo Nordlys milik pembuat tema.
> Ganti ke repo kamu sendiri:
>
> ```powershell
> git remote set-url origin https://github.com/usernamekamu/webPortofolio.git
> ```
>
> Buat dulu repo kosong di GitHub, baru jalankan perintah di atas, lalu:
>
> ```powershell
> git push -u origin main
> ```

---

## 13. Langkah 9: Publikasikan ke Internet

Kabar baiknya: tema ini **sudah menyiapkan deploy otomatis** ke GitHub Pages.
Lihat file `.github/workflows/cd.yaml`. Artinya setiap kali kamu `git push` ke
branch `main`, GitHub akan otomatis build dan menerbitkan website kamu.

Langkahnya:

1. Buat repo baru di GitHub, lalu arahkan project ini ke repo tersebut:

   ```powershell
   git remote set-url origin https://github.com/usernamekamu/webPortofolio.git
   git push -u origin main
   ```

2. Buka repo di GitHub → **Settings** → **Pages** → bagian **Source**, pilih
   **GitHub Actions**.

3. Buka tab **Actions** di repo. Kamu akan melihat proses "Build and deploy"
   berjalan. Tunggu sampai centang hijau.

4. Website kamu online di `https://usernamekamu.github.io/webPortofolio/`.

5. **Terakhir dan penting:** perbarui `site` di `src/theme.config.ts` sesuai
   alamat itu, lalu commit & push lagi:

   ```powershell
   git add .
   git commit -m "set alamat website"
   git push
   ```

> **Kenapa `site` harus sama persis dengan alamat asli?** Astro memakainya untuk
> membuat link absolut pada sitemap, RSS, dan preview saat link dibagikan.
> Kalau beda, preview link dan peta situs akan menunjuk ke alamat yang salah.

> **Kalau repo-nya bukan `usernamekamu.github.io`**, website akan berada di
> sub-folder (`/webPortofolio/`). Beri tahu saya kalau kamu memilih cara ini —
> ada satu pengaturan tambahan (`base`) di `astro.config.ts` yang perlu diisi.

Alternatif lain: **Netlify** atau **Vercel**. Hubungkan akun GitHub, pilih repo,
lalu isi:

- Build command: `pnpm build`
- Publish directory: `dist`

Keduanya gratis untuk proyek pribadi dan otomatis build ulang setiap push.

> **Kenapa harus `pnpm build` dulu?** Browser hanya mengerti HTML, CSS, dan
> JavaScript. Astro perlu mengubah file `.md` dan `.astro` menjadi file-file itu.
> Folder `dist/` adalah hasil akhirnya. Kamu tidak perlu meng-upload `dist/`
> secara manual — GitHub Actions melakukannya untukmu.

---

## 14. Alur Kerja Sehari-hari

Setelah semuanya jalan, rutinitasmu cuma ini:

```powershell
pnpm dev          # 1. nyalakan server
#   ... edit file, lihat hasil di browser ...
#   Ctrl + C      2. matikan server
pnpm build        # 3. cek masih bisa di-build
git add .
git commit -m "tambah artikel baru"
git push          # 4. online
```

---

## 15. Kalau Ada Error

| Gejala                              | Penyebab umum                                              | Solusi                       |
| ----------------------------------- | ---------------------------------------------------------- | ---------------------------- |
| `pnpm: command not found`           | pnpm belum terpasang                                       | `npm install -g pnpm`        |
| Halaman 404                         | Nama folder di `src/pages/` tidak cocok dengan `href` menu | Cocokkan keduanya            |
| Build gagal: "expected frontmatter" | Ada salah ketik di `---` atau properti wajib hilang        | Cek blok frontmatter         |
| Gambar tidak muncul                 | Path `previewImage` salah                                  | Path relatif dari file `.md` |
| Perubahan tidak terlihat            | Dev server mati                                            | Jalankan `pnpm dev` lagi     |
| Error di file `.mdx`                | Pakai komentar `<!-- -->`                                  | Ganti jadi `{/* */}`         |
| Warna/CSS beda antar halaman        | Cache CSS dev server basi (bukan bug kode)                  | Restart dev server (lihat bawah) |
| `theme.config.ts` tidak berpengaruh | `<html class>` tidak ikut di-reload HMR                     | `Ctrl + Shift + R`           |

### Kalau CSS/warna terlihat "campur aduk"

Gejalanya: halaman A sudah pakai warna baru, halaman B masih warna lama.

Ini **bukan** bug di kode, tapi cache compiler Tailwind di dev server. Satu
rute sudah dikompilasi sebelum file CSS kamu diedit, jadi HTML-nya masih
menyimpan CSS versi lama. Restart dev server:

```powershell
pnpm exec astro dev stop
pnpm dev
```

Kalau masih basi, hapus cache Vite lalu ulangi:

```powershell
Remove-Item -Recurse -Force node_modules\.vite, .astro
pnpm dev
```

Ini **tidak akan terjadi di website online**. Saat `pnpm build`, semua CSS
digabung jadi satu file dengan nama unik (hash), sehingga semua halaman
dijamin memakai CSS yang sama persis.

Selalu baca pesan error dari **bawah ke atas**. Baris pertama biasanya yang
paling menjelaskan.

---

## 16. Istilah yang Sering Muncul

- **Frontmatter** — data di atas file Markdown, di antara `---`.
- **Layout** — kerangka halaman; konten dimasukkan ke dalamnya.
- **Component** — potongan tampilan yang bisa dipakai berkali-kali.
- **Props** — data yang dikirim ke component.
- **Routing** — aturan URL berdasarkan struktur folder.
- **Build** — proses mengubah source menjadi file siap online.
- **Deploy** — mengunggah hasil build ke server agar bisa diakses publik.
- **Repo** — folder project yang dilacak Git.
