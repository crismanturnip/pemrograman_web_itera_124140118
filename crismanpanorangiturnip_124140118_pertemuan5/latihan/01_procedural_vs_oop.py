"""Membandingkan data mahasiswa prosedural dengan class mahasiswa."""


def tampilkan_mahasiswa(data):
    print(f"[Prosedural] {data['nama']} - IPK: {data['ipk']}")


class Mahasiswa:
    """Menyimpan data dan perilaku mahasiswa dalam satu objek."""

    def __init__(self, nama, ipk):
        self.nama = nama
        self.ipk = ipk

    def tampilkan(self):
        print(f"[OOP] {self.nama} - IPK: {self.ipk}")


if __name__ == "__main__":
    data_mahasiswa = {"nama": "Budi", "ipk": 3.5}
    tampilkan_mahasiswa(data_mahasiswa)

    mahasiswa = Mahasiswa("Siti", 3.8)
    mahasiswa.tampilkan()
