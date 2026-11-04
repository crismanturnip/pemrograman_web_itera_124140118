"""Soal 1: program penghitung BMI sederhana."""

berat = float(input("Berat badan (kg): "))
tinggi = float(input("Tinggi badan (m): "))
bmi = berat / (tinggi * tinggi)

if bmi < 18.5:
    kategori = "Berat badan kurang"
elif bmi < 25:
    kategori = "Berat badan normal"
elif bmi < 30:
    kategori = "Berat badan berlebih"
else:
    kategori = "Obesitas"

print(f"\nBMI     : {bmi:.2f}")
print(f"Kategori: {kategori}")
