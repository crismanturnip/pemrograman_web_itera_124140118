"""Soal 3: menggunakan semua fungsi modul dengan dua cara impor."""

import math_operations
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin

print(f"Konstanta PI: {math_operations.PI}")

print("\nPersegi (sisi 4 cm)")
print(f"Luas    : {math_operations.luas_persegi(4):.2f} cm^2")
print(f"Keliling: {math_operations.keliling_persegi(4):.2f} cm")

print("\nPersegi panjang (panjang 8 cm, lebar 5 cm)")
print(f"Luas    : {math_operations.luas_persegi_panjang(8, 5):.2f} cm^2")
print(f"Keliling: {math_operations.keliling_persegi_panjang(8, 5):.2f} cm")

print("\nLingkaran (jari-jari 7 cm)")
print(f"Luas    : {math_operations.luas_lingkaran(7):.2f} cm^2")
print(f"Keliling: {math_operations.keliling_lingkaran(7):.2f} cm")

print("\nKonversi suhu")
for suhu in (0, 25, 100):
    print(
        f"{suhu} C = {celsius_ke_fahrenheit(suhu):.2f} F "
        f"= {celsius_ke_kelvin(suhu):.2f} K"
    )
