Personal Dashboard Kuliah

Deskripsi

Dashboard Kuliah adalah aplikasi sederhana untuk mencatat dan mengatur tugas kuliah. Data tugas disimpan di localStorage. Data tetap tersedia ketika halaman dibuka kembali menggunakan browser yang sama.

Aplikasi ini juga menampilkan informasi cuaca di sekitar ITERA. Informasi cuaca diambil dari Open Meteo.

Fitur

Aplikasi ini dapat digunakan untuk menambah, mengedit, dan menghapus tugas. Tugas dapat ditandai sebagai selesai atau belum selesai. Pengguna juga dapat menampilkan tugas berdasarkan statusnya.

Bagian ringkasan menampilkan jumlah seluruh tugas, tugas yang belum selesai, dan tugas yang sudah selesai. Tampilan aplikasi dapat menyesuaikan ukuran layar komputer dan telepon.

Struktur folder

File index.html digunakan untuk membuat tampilan utama. File style.css di dalam folder css digunakan untuk mengatur tampilan. File app.js dan main.js di dalam folder js digunakan untuk menjalankan fungsi aplikasi. Gambar tampilan aplikasi disimpan di dalam folder screenshot.

JavaScript yang digunakan

Aplikasi ini menggunakan let dan const untuk membuat variabel. Arrow function digunakan untuk membuat beberapa fungsi singkat. Template literal digunakan untuk membuat tampilan tugas.

Class TaskItem digunakan untuk menyimpan data satu tugas. Class DashboardApp digunakan untuk mengatur seluruh proses dalam aplikasi.

Destructuring digunakan untuk mengambil nilai dari object. Spread operator digunakan saat memperbarui data tugas. Method map, filter, dan find digunakan untuk mengolah data tugas.

Import dan export digunakan agar kode dapat dipisahkan menjadi beberapa file. Async dan await digunakan saat mengambil data cuaca.

Penyimpanan data

Data tugas disimpan menggunakan localStorage. Data dibaca dengan localStorage.getItem dan disimpan dengan localStorage.setItem.

API cuaca

Data cuaca diambil dari API Open Meteo menggunakan fetch. Lokasi yang digunakan adalah daerah sekitar ITERA dengan latitude minus 5.36 dan longitude 105.31.

Cara menjalankan

Buka folder project menggunakan Visual Studio Code. Pastikan extension Live Server sudah terpasang. Klik kanan pada file index.html, kemudian pilih Open with Live Server. Aplikasi akan terbuka di browser.

Cara menggunakan

Isi nama mata kuliah, nama tugas, deadline, dan prioritas. Tekan tombol Tambah tugas untuk menyimpan data.

Gunakan tombol Selesai untuk mengubah status tugas. Gunakan tombol Edit untuk memperbarui data. Gunakan tombol Hapus untuk menghapus tugas. Pilih filter yang tersedia untuk menampilkan tugas berdasarkan status.
