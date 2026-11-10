# Undangan Digital Rizal & Silvi

Website undangan pernikahan responsif dengan React, TypeScript, Vite, CSS, dan Netlify Forms. Proyek sudah dilengkapi cover gebyok bergaya Jawa, countdown WIB, detail acara, galeri tiga foto, hadiah, buku ucapan, RSVP, dan pemutar musik eksternal.

## Isi Undangan

- WALID FAHRIZAL (RIZAL) dan SILVI LUPIATUN NISAK (SILVI)
- Rabu, 06 Januari 2027
- Akad nikah pukul 09.00 WIB
- Resepsi pukul 10.00 WIB – Selesai
- Lokasi dibuka melalui tautan Google Maps yang diberikan

Tidak ada alamat atau nama keluarga yang ditambahkan di luar informasi undangan.

## Mengganti Foto

Foto pasangan tidak disertakan. Website menampilkan placeholder ornamen Jawa yang dibuat dari SVG dan CSS, bukan foto pasangan lain atau foto stok. Saat foto belum ada, tampilan tetap utuh dan tidak menampilkan gambar rusak.

Di GitHub, unggah foto JPG milik Anda ke folder `public/images/` dan timpa file dengan nama yang sesuai:

| Kegunaan | Nama file |
| --- | --- |
| Foto utama pada halaman mempelai dan penutup | `foto-utama.jpg` |
| Foto galeri pertama | `foto-galeri-1.jpg` |
| Foto galeri kedua | `foto-galeri-2.jpg` |
| Foto galeri ketiga | `foto-galeri-3.jpg` |
| Latar gebyok | `gebyok-jawa.jpg` |

Gunakan format JPEG/JPG dan pertahankan ejaan serta nama file. Jika foto dari ponsel berupa HEIC atau PNG, simpan/konversi dahulu sebagai JPG. Tidak perlu mengubah kode. Pastikan semua gambar yang diunggah memang foto yang ingin ditampilkan.

Galeri selalu berisi tepat tiga slot. Klik salah satu foto untuk memperbesar; pada tampilan besar, tombol panah atau tombol panah keyboard berpindah foto dan tombol Escape menutupnya.

## Mengganti Musik

1. Siapkan file MP3 yang Anda miliki atau berlisensi untuk digunakan.
2. Unggah atau timpa `public/music/musik-undangan.mp3`.
3. Pertahankan nama file tersebut. Tidak perlu mengubah kode.

Musik tidak berjalan otomatis. Pengunjung menekan tombol pemutar untuk mulai atau menjeda musik. Jika file belum tersedia, situs tetap berjalan dan pemutar menampilkan petunjuk.

## Mengunggah ke GitHub

Anda tidak perlu memasang Node.js untuk mengunggah dan menerbitkan situs. GitHub menyimpan source code; Netlify mengambil source code itu lalu menjalankan proses build di servernya sendiri.

1. Unduh ZIP proyek dan ekstrak di komputer.
2. Masuk ke [GitHub](https://github.com) atau buat akun.
3. Pilih **New repository**, beri nama misalnya `undangan-rizal-silvi`, lalu buat repository.
4. Buka repository tersebut. Pilih **Add file > Upload files**.
5. Unggah isi folder proyek yang sudah diekstrak, termasuk folder `public`, `src`, serta file konfigurasi. Unggah file di dalam folder proyek, bukan file ZIP saja.
6. Tekan **Commit changes**. Foto dan musik dapat ikut diunggah sekarang atau ditambahkan kemudian dengan cara yang sama.

Alternatifnya, GitHub Desktop dapat dipakai untuk memilih folder proyek, melakukan commit, lalu menekan **Push origin**.

## Menghubungkan GitHub dengan Netlify

1. Masuk atau buat akun di [Netlify](https://www.netlify.com).
2. Pilih **Add new site / Add new project**, lalu **Import an existing project**.
3. Hubungkan akun GitHub, pilih repository `undangan-rizal-silvi`, dan izinkan akses bila diminta.
4. Pastikan pengaturan build berikut digunakan:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Pilih **Deploy site**. `netlify.toml` di proyek juga sudah memuat pengaturan tersebut.
6. Tunggu hingga status deploy berhasil, lalu buka alamat situs Netlify yang diberikan.

Netlify akan memasang dependencies dari `package-lock.json` dan membangun proyek di server. Anda tidak perlu memasang Node.js atau menjalankan perintah build di komputer.

## RSVP dan Buku Ucapan

Formulir `rsvp` dan `guestbook` mengirimkan data ke Netlify Forms. Deklarasi HTML statis di `index.html` membuat Netlify dapat menemukan kedua formulir saat proses build; pengiriman AJAX akan memberi pesan sukses hanya setelah server merespons berhasil.

- Buka situs di Netlify, lalu pilih **Forms** untuk melihat kiriman bernama `rsvp` dan `guestbook`.
- Jika Netlify meminta aktivasi **form detection**, aktifkan dari pengaturan Forms lalu lakukan deploy ulang agar deklarasi formulir dikenali.
- Pengiriman dari `localhost` hanya menampilkan pemberitahuan bahwa situs perlu di-deploy; data tidak diklaim terkirim saat uji lokal.
- Daftar ucapan di halaman menampilkan ucapan yang berhasil dikirim dari browser/perangkat tersebut. Penyimpanan lokal itu hanya membantu tampilan perangkat ini, bukan pengganti Netlify Forms. Semua pengiriman yang diterima Netlify dapat diperiksa di dashboard Netlify.
- Setelah deploy pertama, pastikan kedua formulir terlihat di bagian **Forms**. Jika belum terdeteksi, lakukan deploy ulang setelah perubahan disimpan di GitHub.

## Memperbarui Situs

Setelah foto atau musik diganti, unggah file baru dengan nama yang sama ke folder yang tepat di repository GitHub dan commit perubahan. Netlify akan mengambil perubahan dari GitHub dan menjalankan build baru secara otomatis. Setelah deploy selesai, muat ulang situs untuk melihat aset terbaru.

## Menjalankan di Komputer (Opsional)

Langkah ini hanya diperlukan jika Anda ingin melihat preview lokal dan sudah memasang Node.js versi yang mendukung Vite 7:

```bash
npm install
npm run dev
```

Untuk memeriksa hasil produksi:

```bash
npm run build
npm run preview
```

Folder hasil build berada di `dist/`. File ZIP distribusi tidak menyertakan `node_modules` karena folder itu dapat dibuat oleh Netlify saat build.