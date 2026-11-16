"""Contoh atribut public, protected, private, dan property."""


class RekeningBank:
    def __init__(self, nomor, pemilik, saldo):
        self.nomor = nomor              # public
        self._pemilik = pemilik         # protected (konvensi)
        self.__saldo = saldo           # private

    @property
    def saldo(self):
        return self.__saldo

    def setor(self, jumlah):
        if jumlah > 0:
            self.__saldo += jumlah
            return True
        return False


if __name__ == "__main__":
    rekening = RekeningBank("001", "Crisman", 100000)
    print("Pemilik:", rekening._pemilik)
    print("Saldo awal:", rekening.saldo)
    rekening.setor(50000)
    print("Saldo setelah setor:", rekening.saldo)
