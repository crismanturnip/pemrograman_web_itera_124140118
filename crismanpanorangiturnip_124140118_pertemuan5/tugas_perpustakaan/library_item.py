"""Jenis item yang dapat disimpan di perpustakaan."""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Dasar untuk semua item perpustakaan."""

    def __init__(self, item_id, judul):
        self.item_id = item_id
        self.judul = judul
        self.__is_dipinjam = False

    @property
    def is_dipinjam(self):
        """Status hanya dapat dibaca; perubahan lewat method pinjam/kembalikan."""
        return self.__is_dipinjam

    def pinjam(self):
        """Mengubah status jika item masih tersedia."""
        if self.__is_dipinjam:
            return False
        self.__is_dipinjam = True
        return True

    def kembalikan(self):
        """Mengubah status jika item memang sedang dipinjam."""
        if not self.__is_dipinjam:
            return False
        self.__is_dipinjam = False
        return True

    @abstractmethod
    def get_detail(self):
        """Menghasilkan informasi item sesuai jenisnya."""
        pass


class Book(LibraryItem):
    """Buku memiliki penulis dan tahun terbit."""

    def __init__(self, item_id, judul, penulis, tahun_terbit):
        super().__init__(item_id, judul)
        self.penulis = penulis
        self.tahun_terbit = tahun_terbit

    def get_detail(self):
        return (f"[Buku] {self.item_id} - {self.judul} | "
                f"Penulis: {self.penulis} | Tahun: {self.tahun_terbit}")


class Magazine(LibraryItem):
    """Majalah memiliki edisi dan bulan terbit."""

    def __init__(self, item_id, judul, edisi, bulan_terbit):
        super().__init__(item_id, judul)
        self.edisi = edisi
        self.bulan_terbit = bulan_terbit

    def get_detail(self):
        return (f"[Majalah] {self.item_id} - {self.judul} | "
                f"Edisi: {self.edisi} | Bulan: {self.bulan_terbit}")
