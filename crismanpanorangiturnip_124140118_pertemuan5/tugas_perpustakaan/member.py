"""Menyimpan ID dan nama anggota perpustakaan."""


class Member:
    """Mewakili seorang anggota perpustakaan."""

    def __init__(self, member_id, nama):
        self.member_id = member_id
        self.nama = nama
