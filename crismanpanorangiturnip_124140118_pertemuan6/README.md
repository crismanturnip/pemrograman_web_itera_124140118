# Praktikum PAW Pertemuan 6 — Pyramid Framework

Nama: Crisman Panorangi Turnip

NIM: 124140118

Kelas Praktikum: RB

## Deskripsi

Aplikasi RESTful API berbasis Pyramid, PostgreSQL, SQLAlchemy ORM, dan Alembic untuk mengelola data Mahasiswa dan Matakuliah. Masing-masing modul menyediakan operasi menampilkan daftar, melihat detail, menambah, memperbarui, dan menghapus data.

## Persiapan dan Instalasi

Jalankan perintah berikut dari folder `crismanpanorangiturnip_124140118_pertemuan6` pada PowerShell:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -e ".[testing]"
```

Siapkan PostgreSQL lokal. Masuk ke `psql -U postgres`, lalu jalankan:

Password untuk login sebagai `postgres` adalah password administrator yang dibuat saat PostgreSQL dipasang; password itu tidak tercantum di modul. `pyramid_pass` pada contoh di bawah adalah password **pengguna proyek** `pyramid_user`, bukan password administrator `postgres`.

```sql
CREATE DATABASE pyramid_mahasiswa;
CREATE USER pyramid_user WITH ENCRYPTED PASSWORD 'pyramid_pass';
GRANT ALL PRIVILEGES ON DATABASE pyramid_mahasiswa TO pyramid_user;
\c pyramid_mahasiswa
GRANT ALL ON SCHEMA public TO pyramid_user;
```

`development.ini` memakai koneksi `postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_mahasiswa`. Jika port atau kredensial PostgreSQL lokal berbeda, sesuaikan nilai `sqlalchemy.url` sebelum menjalankan aplikasi.

## Migrasi, Seeding, dan Server

```powershell
.\venv\Scripts\alembic.exe -c development.ini upgrade head
python -m pyramid_mahasiswa.scripts.initialize_db development.ini
.\venv\Scripts\pserve.exe development.ini --reload
```

Migrasi Alembic membuat tabel `mahasiswa` dan `matakuliah`. Seeding memasukkan dua Mahasiswa dan tiga Matakuliah awal. Server berjalan pada `http://localhost:6543`.

## Endpoint API

| Method | Endpoint | Fungsi |
| --- | --- | --- |
| GET | `/api/mahasiswa` | Daftar seluruh Mahasiswa |
| GET | `/api/mahasiswa/{id}` | Detail Mahasiswa |
| POST | `/api/mahasiswa` | Tambah Mahasiswa |
| PUT | `/api/mahasiswa/{id}` | Perbarui Mahasiswa |
| DELETE | `/api/mahasiswa/{id}` | Hapus Mahasiswa |
| GET | `/api/matakuliah` | Daftar seluruh Matakuliah |
| GET | `/api/matakuliah/{id}` | Detail Matakuliah |
| POST | `/api/matakuliah` | Tambah Matakuliah |
| PUT | `/api/matakuliah/{id}` | Perbarui Matakuliah |
| DELETE | `/api/matakuliah/{id}` | Hapus Matakuliah |

Field wajib untuk POST Matakuliah adalah `kode_mk`, `nama_mk`, `sks`, dan `semester`. `kode_mk` harus unik; `sks` dan `semester` harus bilangan bulat positif. Input tidak lengkap atau tidak valid mendapat HTTP 400. Detail, pembaruan, atau penghapusan ID yang tidak ditemukan mendapat HTTP 404.

## Pengujian cURL

Jalankan server terlebih dahulu, lalu gunakan `curl.exe` di PowerShell. Contoh rangkaian untuk kedua modul:

```powershell
curl.exe -i http://localhost:6543/api/mahasiswa
curl.exe -i http://localhost:6543/api/mahasiswa/1
@{nim='67890';nama='Ahmad Fadli';jurusan='Teknik Elektro'} | ConvertTo-Json -Compress | curl.exe -i -X POST http://localhost:6543/api/mahasiswa -H 'Content-Type: application/json' --data-binary '@-'
@{jurusan='Informatika Medis'} | ConvertTo-Json -Compress | curl.exe -i -X PUT http://localhost:6543/api/mahasiswa/1 -H 'Content-Type: application/json' --data-binary '@-'
curl.exe -i -X DELETE http://localhost:6543/api/mahasiswa/3

curl.exe -i http://localhost:6543/api/matakuliah
curl.exe -i http://localhost:6543/api/matakuliah/1
@{kode_mk='IF3150';nama_mk='Jaringan Komputer';sks=3;semester=5} | ConvertTo-Json -Compress | curl.exe -i -X POST http://localhost:6543/api/matakuliah -H 'Content-Type: application/json' --data-binary '@-'
@{nama_mk='Jaringan Komputer Lanjut';sks=4} | ConvertTo-Json -Compress | curl.exe -i -X PUT http://localhost:6543/api/matakuliah/4 -H 'Content-Type: application/json' --data-binary '@-'
curl.exe -i -X DELETE http://localhost:6543/api/matakuliah/4
```

ID hasil POST dapat berbeda jika database sudah dipakai. Ganti angka pada perintah PUT/DELETE dengan ID yang dikembalikan POST. Untuk memeriksa HTTP 400 dan 404:

```powershell
@{kode_mk='IF9999';nama_mk='Tidak Lengkap'} | ConvertTo-Json -Compress | curl.exe -i -X POST http://localhost:6543/api/matakuliah -H 'Content-Type: application/json' --data-binary '@-'
@{kode_mk='IF9999';nama_mk='Tidak Valid';sks=-1;semester=5} | ConvertTo-Json -Compress | curl.exe -i -X POST http://localhost:6543/api/matakuliah -H 'Content-Type: application/json' --data-binary '@-'
curl.exe -i http://localhost:6543/api/matakuliah/9999
```

Seluruh endpoint Mahasiswa dan Matakuliah telah diuji dengan cURL pada PostgreSQL lokal: operasi CRUD menghasilkan HTTP 200, field yang tidak lengkap atau tidak valid menghasilkan HTTP 400, dan ID yang tidak ditemukan menghasilkan HTTP 404.

## Tangkapan Layar Pengujian

- [Pengujian API Mahasiswa](screenshots/mahasiswa.png)
- [Pengujian API Matakuliah](screenshots/matakuliah.png)

Kedua tangkapan layar memperlihatkan method, URL, respons JSON, dan status HTTP untuk seluruh endpoint.
