"""Demonstrasi Sistem Manajemen Perpustakaan Sederhana."""

from library import Library
from library_item import Book, Magazine
from member import Member


def main():
    perpustakaan = Library()
    anggota = Member("A001", "Crisman Panorangi Turnip")
    items = [
        Book("B001", "Dasar Python", "Andi", 2024),
        Book("B002", "Belajar OOP", "Siti", 2025),
        Magazine("M001", "Teknologi Kini", "12", "November 2026"),
        Magazine("M002", "Sains Populer", "8", "Oktober 2026"),
    ]

    print("=== Sistem Manajemen Perpustakaan ===")
    for item in items:
        if perpustakaan.tambah_item(item):
            print(f"Ditambahkan: {item.get_detail()}")

    print("\nItem tersedia:")
    perpustakaan.tampilkan_item_tersedia()

    print("\nCari ID B002:")
    hasil_id = perpustakaan.cari_berdasarkan_id("B002")
    print(hasil_id.get_detail() if hasil_id else "Item tidak ditemukan.")

    print("\nCari judul 'TEKNOLOGI':")
    for item in perpustakaan.cari_berdasarkan_judul("TEKNOLOGI"):
        print(item.get_detail())

    print(f"\n{anggota.nama} meminjam B001:")
    print("Berhasil." if perpustakaan.pinjam_item("B001") else "Gagal.")
    print("Status B001 dipinjam:", items[0].is_dipinjam)
    print("Item tersedia setelah dipinjam:")
    perpustakaan.tampilkan_item_tersedia()

    print("\nKembalikan B001:")
    print("Berhasil." if perpustakaan.kembalikan_item("B001") else "Gagal.")
    print("Status B001 dipinjam:", items[0].is_dipinjam)
    print("Item tersedia setelah dikembalikan:")
    perpustakaan.tampilkan_item_tersedia()


if __name__ == "__main__":
    main()
