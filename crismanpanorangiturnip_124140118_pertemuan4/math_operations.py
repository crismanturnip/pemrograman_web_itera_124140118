"""Soal 3: modul geometri dan konversi suhu."""

PI = 3.14159


def luas_persegi(sisi):
    """Menerima sisi persegi dan mengembalikan luasnya."""
    return sisi * sisi


def keliling_persegi(sisi):
    """Menerima sisi persegi dan mengembalikan kelilingnya."""
    return 4 * sisi


def luas_persegi_panjang(panjang, lebar):
    """Menerima panjang dan lebar, lalu mengembalikan luas persegi panjang."""
    return panjang * lebar


def keliling_persegi_panjang(panjang, lebar):
    """Menerima panjang dan lebar, lalu mengembalikan kelilingnya."""
    return 2 * (panjang + lebar)


def luas_lingkaran(jari_jari):
    """Menerima jari-jari lingkaran dan mengembalikan luasnya."""
    return PI * jari_jari ** 2


def keliling_lingkaran(jari_jari):
    """Menerima jari-jari lingkaran dan mengembalikan kelilingnya."""
    return 2 * PI * jari_jari


def celsius_ke_fahrenheit(celsius):
    """Menerima suhu Celsius dan mengembalikan suhu Fahrenheit."""
    return celsius * 9 / 5 + 32


def celsius_ke_kelvin(celsius):
    """Menerima suhu Celsius dan mengembalikan suhu Kelvin."""
    return celsius + 273.15
