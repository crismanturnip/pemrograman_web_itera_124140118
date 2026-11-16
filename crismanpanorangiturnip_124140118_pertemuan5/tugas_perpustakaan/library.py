"""Mengelola koleksi, pencarian, peminjaman, dan pengembalian item."""


class Library:
    """Menyimpan item dan menyediakan operasi katalog sederhana."""

    def __init__(self):
        self.__koleksi = []

    def tambah_item(self, item):
        """Menambah item jika ID belum digunakan."""
        if self.cari_berdasarkan_id(item.item_id) is not None:
            return False
        self.__koleksi.append(item)
        return True

    def tampilkan_item_tersedia(self):
        """Mencetak detail semua item yang belum dipinjam."""
        tersedia = [item for item in self.__koleksi if not item.is_dipinjam]
        if not tersedia:
            print("Tidak ada item yang tersedia.")
        for item in tersedia:
            print(item.get_detail())

    def cari_berdasarkan_id(self, item_id):
        """Mengembalikan item dengan ID yang cocok, atau None."""
        for item in self.__koleksi:
            if item.item_id == item_id:
                return item
        return None

    def cari_berdasarkan_judul(self, judul):
        """Mengembalikan semua item yang judulnya mengandung kata kunci."""
        return [item for item in self.__koleksi
                if judul.lower() in item.judul.lower()]

    def pinjam_item(self, item_id):
        """Meminjam item berdasarkan ID; False jika tidak ada/sudah dipinjam."""
        item = self.cari_berdasarkan_id(item_id)
        return item.pinjam() if item is not None else False

    def kembalikan_item(self, item_id):
        """Mengembalikan item berdasarkan ID; False jika tidak ada/tersedia."""
        item = self.cari_berdasarkan_id(item_id)
        return item.kembalikan() if item is not None else False
