Praktikum Pertemuan 4: Python Dasar

Nama: Crisman Panorangi Turnip
NIM: 124140118
Kelas: RB

Cara menjalankan

Pastikan Python sudah terpasang di komputer. Buka folder crismanpanorangiturnip_124140118_pertemuan4 menggunakan VS Code, kemudian buka terminal melalui menu Terminal dan pilih New Terminal.

Untuk menjalankan soal pertama, ketik python tugas1_bmi.py di terminal lalu tekan Enter. Masukkan berat badan dalam kilogram dan tinggi badan dalam meter.

Untuk menjalankan soal kedua, ketik python tugas2_nilai_mahasiswa.py lalu tekan Enter. Data nilai mahasiswa akan langsung ditampilkan.

Untuk menjalankan soal ketiga, ketik python main.py lalu tekan Enter. Hasil perhitungan geometri dan konversi suhu akan langsung ditampilkan. Berkas math_operations.py digunakan oleh main.py sehingga tidak perlu dijalankan sendiri.

Program menggunakan Python standar, tanpa instalasi library tambahan.

Soal 1: Penghitung BMI

Berkas tugas1_bmi.py menerima berat badan dalam kilogram dan tinggi badan dalam meter. BMI dihitung dengan membagi berat badan dengan kuadrat tinggi badan. Percabangan menentukan kategori berat badan kurang, normal, berlebih, atau obesitas. Hasil BMI ditampilkan dengan dua angka desimal.

Contoh masukan berat 65 kilogram dan tinggi 1.70 meter menghasilkan BMI 22.49 dengan kategori berat badan normal.

Soal 2: Nilai mahasiswa

Berkas tugas2_nilai_mahasiswa.py menyimpan lima data mahasiswa dalam list yang berisi dictionary. Nilai akhir dihitung menggunakan bobot UTS 30 persen, UAS 40 persen, dan tugas 30 persen.

Grade A diberikan untuk nilai akhir mulai 80, B mulai 70 sampai kurang dari 80, C mulai 60 sampai kurang dari 70, D mulai 50 sampai kurang dari 60, dan E untuk nilai di bawah 50.

Program menampilkan tabel nama, NIM, nilai akhir, dan grade, kemudian menampilkan mahasiswa dengan nilai tertinggi dan terendah. Data yang digunakan adalah data simulasi.

Soal 3: Modul matematika

Berkas math_operations.py berisi konstanta PI, fungsi luas dan keliling persegi, persegi panjang, serta lingkaran. Modul ini juga menyediakan fungsi konversi suhu Celsius ke Fahrenheit dan Kelvin. Setiap fungsi mempunyai docstring yang menjelaskan masukan dan hasil kembaliannya.

Berkas main.py memanggil seluruh fungsi menggunakan contoh ukuran geometri dan beberapa suhu. Program menggunakan dua cara impor, yaitu impor modul lengkap dan impor fungsi tertentu. Hasil perhitungan ditampilkan di terminal.

Hasil eksekusi

Screenshot hasil eksekusi soal 1, 2, dan 3 disimpan pada berkas image.png di dalam folder screenshot.

Berkas .gitignore mengabaikan folder venv, folder __pycache__, dan berkas dengan ekstensi .pyc agar tidak ikut diunggah.

Referensi materi dan tugas: https://praktikum-paw20262027.vercel.app/pertemuan/4
