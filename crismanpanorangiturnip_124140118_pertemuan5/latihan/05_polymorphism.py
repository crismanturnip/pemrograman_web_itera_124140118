"""Contoh suara Mobil dan Motor melalui method yang sama."""


class Kendaraan:
    def suara(self):
        return "Suara kendaraan"


class Mobil(Kendaraan):
    def suara(self):
        return "Tin tin!"


class Motor(Kendaraan):
    def suara(self):
        return "Brem brem!"


if __name__ == "__main__":
    for kendaraan in [Mobil(), Motor()]:
        print(kendaraan.suara())
