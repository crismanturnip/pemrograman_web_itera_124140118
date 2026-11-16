"""Contoh bangun datar abstrak yang diwujudkan oleh Persegi."""

from abc import ABC, abstractmethod


class BangunDatar(ABC):
    @abstractmethod
    def luas(self):
        pass


class Persegi(BangunDatar):
    def __init__(self, sisi):
        self.sisi = sisi

    def luas(self):
        return self.sisi * self.sisi


if __name__ == "__main__":
    persegi = Persegi(5)
    print("Luas persegi:", persegi.luas())
    try:
        BangunDatar()
    except TypeError:
        print("BangunDatar tidak bisa dibuat langsung karena abstract.")
