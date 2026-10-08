# aplikasi kasir sederhana (mini pos)

## identitas

nama: crisman panorangi turnip  
nim: 124140118  
kelas praktikum: rb

## deskripsi aplikasi

aplikasi ini dibuat untuk tugas praktikum pemrograman web pertemuan 1. studi kasusnya kasir sederhana untuk kantin atau toko kampus. jadi kasir bisa memasukkan barang yang dibeli, melihat total belanja, dan menghitung uang kembalian.

## cara menjalankan

1. buka folder proyek menggunakan vs code.
2. buka file index.html di browser, atau gunakan ekstensi live server.
3. masukkan nama barang, harga, dan jumlahnya, lalu klik tambah barang.
4. setelah barang masuk, isi uang bayar untuk melihat kembaliannya.

## fitur aplikasi

- validasi nama barang minimal 3 karakter.
- validasi harga minimal rp500 dan jumlah minimal 1.
- pesan error di bawah input jika ada data yang salah.
- menampilkan barang dalam tabel keranjang.
- menghitung subtotal dan total belanja otomatis.
- diskon 10% jika total belanja minimal rp50.000.
- menghitung kembalian dan memberi pesan jika uang kurang.
- menghapus barang dari keranjang.
- menyimpan daftar barang di localstorage.
- transaksi baru untuk mengosongkan keranjang.

## penjelasan singkat kode

file index.html digunakan untuk membuat form, tabel, dan bagian pembayaran. style.css dipakai untuk mengatur tampilan supaya lebih rapi, sedangkan script.js dipakai untuk menjalankan fitur kasir.

saat tombol tambah barang ditekan, javascript akan mengecek dulu nama, harga, dan jumlahnya. kalau masih salah, muncul pesan merah dan barang tidak ditambahkan. kalau sudah benar, barang masuk ke array keranjang dan langsung muncul di tabel.

subtotal didapat dari harga dikali jumlah barang. setelah itu semua subtotal dijumlahkan menjadi total belanja. kalau totalnya minimal rp50.000, diskon 10% akan dihitung otomatis. uang bayar yang dimasukkan juga langsung dibandingkan dengan total akhir untuk menghitung kembalian.

isi keranjang disimpan ke localStorage dengan JSON.stringify(), lalu dibaca lagi saat halaman dibuka menggunakan JSON.parse(). jadi ketika halaman di-refresh, daftar barang masih ada. kalau tombol transaksi baru ditekan, datanya akan dihapus dari keranjang dan localstorage.

## struktur folder

- index.html : halaman aplikasi
- style.css : tampilan aplikasi
- script.js : fungsi dan perhitungan
- README.md : penjelasan tugas
- modul/ : hasil latihan javascript dari modul pertemuan 1
- screenshot/ : tempat menyimpan hasil screenshot aplikasi