# Praktikum PAW Pertemuan 5

Nama: Crisman Panorangi Turnip
NIM: 124140118
Kelas: RB

## Deskripsi Program

Program ini merupakan sistem manajemen perpustakaan sederhana. Di dalamnya ada buku dan majalah yang dapat ditambahkan ke koleksi. Pengguna dapat melihat item yang tersedia, mencari item berdasarkan ID atau judul, meminjam item, dan mengembalikannya. Item yang sedang dipinjam tidak muncul dalam daftar tersedia

## Struktur Folder dan Daftar File

Folder latihan berisi tujuh file contoh OOP. File 01_everything_is_object.py menunjukkan bahwa nilai dan fungsi di Python adalah objek. File 01_procedural_vs_oop.py membandingkan pendekatan prosedural dan OOP. File 02_class_object.py berisi contoh class, object, constructor, atribut, dan method. File 03_inheritance.py menunjukkan pewarisan dan penggunaan super(). File 04_encapsulation.py membahas atribut public, protected, private, dan property. File 05_polymorphism.py menunjukkan method overriding. File 06_abstract_class.py berisi contoh abstract class

Folder tugas_perpustakaan berisi program utama. File library_item.py memuat class LibraryItem, Book, dan Magazine. File member.py memuat class Member. File library.py mengelola koleksi perpustakaan. File main.py menjalankan contoh penggunaan program. Folder screenshots berisi screenshot hasil program. File .gitignore mengabaikan cache Python dan virtual environment

## Cara Menjalankan Program

Buka terminal pada folder Pertemuan 5, lalu ketik python tugas_perpustakaan/main.py dan tekan Enter. Jika terminal sudah berada di dalam folder tugas_perpustakaan, cukup ketik python main.py. Program ini tidak membutuhkan library tambahan

File latihan juga dapat dijalankan satu per satu. Sebagai contoh, ketik python latihan/03_inheritance.py dari folder Pertemuan 5 untuk menjalankan latihan inheritance

## Penerapan Konsep OOP

Class dan object digunakan untuk membuat perpustakaan, anggota, buku, dan majalah. Book dan Magazine mewarisi LibraryItem serta menggunakan super() untuk menjalankan constructor induknya. Koleksi item dan status peminjaman disimpan sebagai atribut private. Status peminjaman dibaca melalui property dan diubah melalui method pinjam atau kembalikan

Polymorphism terlihat saat perpustakaan memanggil get_detail() pada setiap item. Buku dan majalah memberikan informasi yang berbeda melalui method dengan nama yang sama. Abstraction diterapkan pada LibraryItem dengan ABC dan abstract method get_detail(), sehingga setiap jenis item harus menyediakan detailnya sendiri

## Contoh Hasil Eksekusi

Saat program dijalankan, empat item berhasil ditambahkan ke perpustakaan. Daftar item tersedia menampilkan dua buku dan dua majalah. Pencarian ID B002 menemukan buku Belajar OOP, sedangkan pencarian judul TEKNOLOGI menemukan majalah Teknologi Kini. Setelah buku B001 dipinjam, statusnya menjadi True dan buku tersebut hilang dari daftar tersedia. Setelah dikembalikan, statusnya menjadi False dan buku muncul kembali

## Screenshot Output

Screenshot terminal hasil menjalankan program tersimpan di folder screenshots dengan nama output_program.png. Screenshot tersebut menunjukkan penambahan item, daftar item tersedia, hasil pencarian, peminjaman, dan pengembalian. Gambar ini menjadi bukti output program untuk pengumpulan tugas Pertemuan 5.
