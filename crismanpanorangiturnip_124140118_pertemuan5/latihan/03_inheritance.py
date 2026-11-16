"""Contoh pewarisan Kendaraan ke Mobil dengan super()."""


class Kendaraan:
    def __init__(self, merek):
        self.merek = merek

    def deskripsi(self):
        return f"Kendaraan merek {self.merek}"


class Mobil(Kendaraan):
    def __init__(self, merek, jumlah_pintu):
        super().__init__(merek)
        self.jumlah_pintu = jumlah_pintu

    def deskripsi(self):
        return f"{super().deskripsi()}, {self.jumlah_pintu} pintu"


if __name__ == "__main__":
    kendaraan = Kendaraan("Honda")
    mobil = Mobil("Toyota", 4)
    print(kendaraan.deskripsi())
    print(mobil.deskripsi())
