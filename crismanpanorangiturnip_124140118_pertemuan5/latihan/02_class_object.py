"""Contoh class, constructor, atribut instance, dan method."""


class Mahasiswa:
    universitas = "Institut Teknologi Sumatera"

    def __init__(self, nama, nim):
        self.nama = nama
        self.nim = nim
        self.mata_kuliah = []

    def tambah_mata_kuliah(self, nama_mata_kuliah):
        self.mata_kuliah.append(nama_mata_kuliah)

    def tampilkan(self):
        print(f"{self.nama} ({self.nim}) - {self.universitas}")
        print("Mata kuliah:", ", ".join(self.mata_kuliah))


if __name__ == "__main__":
    mahasiswa = Mahasiswa("Crisman", "124140118")
    mahasiswa.tambah_mata_kuliah("Pengembangan Aplikasi Web")
    mahasiswa.tampilkan()
