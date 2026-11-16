# Praktikum PAW Pertemuan 5

## Identitas

- Nama: Crisman Panorangi Turnip
- NIM: 124140118
- Kelas: RB

## Deskripsi program

Program ini mengelola koleksi buku dan majalah sederhana. Item dapat ditambahkan, dicari berdasarkan ID atau judul, dipinjam, dan dikembalikan. Katalog tersedia hanya menampilkan item yang belum dipinjam.

## Struktur folder dan daftar file

```text
crismanpanorangiturnip_124140118_pertemuan5/
├── latihan/
│   ├── 01_everything_is_object.py   # tipe dan method objek Python
│   ├── 01_procedural_vs_oop.py       # fungsi terpisah vs class
│   ├── 02_class_object.py           # class, object, constructor, method
│   ├── 03_inheritance.py            # pewarisan dan super()
│   ├── 04_encapsulation.py          # public, protected, private, property
│   ├── 05_polymorphism.py           # method overriding
│   └── 06_abstract_class.py         # ABC dan abstract method
├── tugas_perpustakaan/
│   ├── library_item.py              # LibraryItem, Book, Magazine
│   ├── member.py                    # Member
│   ├── library.py                   # pengelolaan koleksi
│   └── main.py                      # demonstrasi program
├── screenshots/
│   └── output_program.txt           # hasil eksekusi program
├── README.md
└── .gitignore
```

## Cara menjalankan

Dari folder pertemuan 5, jalankan:

```bash
python tugas_perpustakaan/main.py
```

Untuk mencoba latihan, misalnya:

```bash
python latihan/03_inheritance.py
```

Tidak ada library tambahan yang perlu dipasang.

## Penerapan OOP

- **Class dan object:** `Library`, `Member`, `Book`, dan `Magazine` dibuat sebagai class; `main.py` membuat objeknya.
- **Inheritance:** `Book` dan `Magazine` mewarisi `LibraryItem` dan memakai `super().__init__()`.
- **Encapsulation:** koleksi disimpan di `Library.__koleksi`; status pinjam disimpan di `LibraryItem.__is_dipinjam` dan dibaca lewat property `is_dipinjam`.
- **Polymorphism:** `Book` dan `Magazine` punya hasil `get_detail()` berbeda. `Library` memanggil method yang sama untuk keduanya saat menampilkan katalog.
- **Abstraction:** `LibraryItem` memakai `ABC` dan `@abstractmethod`, sehingga tiap jenis item harus membuat `get_detail()` sendiri.

## Contoh hasil eksekusi

```text
Item tersedia:
[Buku] B001 - Dasar Python | Penulis: Andi | Tahun: 2024
[Majalah] M001 - Teknologi Kini | Edisi: 12 | Bulan: November 2026

Crisman Panorangi Turnip meminjam B001:
Berhasil.
Status B001 dipinjam: True

Kembalikan B001:
Berhasil.
Status B001 dipinjam: False
```

Output lengkap ada di `screenshots/output_program.txt`.

## Screenshot output

Lingkungan ini menyimpan keluaran terminal sebagai teks di `screenshots/output_program.txt`. Screenshot terminal asli perlu diambil secara manual sebelum pengumpulan, lalu disimpan sebagai `screenshots/output_program.png`.
