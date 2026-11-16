"""Menunjukkan tipe, class, dan method bawaan dari objek Python."""


def salam():
    return "Halo dari fungsi!"


if __name__ == "__main__":
    angka = 42
    pesan = "Praktikum PAW"
    nilai = [85, 90, 78]

    for nama, objek in [("angka", angka), ("pesan", pesan), ("nilai", nilai)]:
        print(f"{nama}: {type(objek)}, class: {objek.__class__}")

    print("Pesan huruf besar:", pesan.upper())
    print("Pesan dipisah:", pesan.split())
    print("Fungsi juga objek:", type(salam))
    print(salam())
