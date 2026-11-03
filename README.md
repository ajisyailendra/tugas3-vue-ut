# BAKU - Bahan Ajar Universitas Terbuka

Proyek Tugas Praktik 3 STSI4209 menggunakan Vue 2 via CDN dan data dummy JSON.

## Menjalankan

Jalankan melalui server lokal (misalnya Live Server di VS Code), lalu buka `index.html`. Server diperlukan karena data dan template komponen dimuat menggunakan `fetch`.

## Fitur

- Dashboard stok: filter UPBJJ lalu kategori yang bergantung pada pilihan UPBJJ, filter stok di bawah safety, pengurutan, reset, dan tooltip catatan.
- CRUD stok: tambah/edit melalui form, validasi, simpan dengan Enter, serta konfirmasi sebelum hapus.
- Tracking: cari berdasarkan nomor DO atau NIM, reset dengan Escape, dan tambah progres perjalanan.
- Pengiriman: nomor DO otomatis, pilihan paket beserta rincian, format Rupiah dan tanggal Indonesia, serta validasi input.
- Perubahan stok dan tracking disimpan di `localStorage` browser.
