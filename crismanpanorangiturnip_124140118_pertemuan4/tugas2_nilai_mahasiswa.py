"""Soal 2: mengolah data simulasi nilai lima mahasiswa."""

data_mahasiswa = [
    {
        "nama": "Crisman Panorangi Turnip", "nim": "124140118",
        "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 95,
    },
    {
        "nama": "Andi Saputra", "nim": "124140119",
        "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 80,
    },
    {
        "nama": "Budi Santoso", "nim": "124140120",
        "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70,
    },
    {
        "nama": "Citra Lestari", "nim": "124140121",
        "nilai_uts": 50, "nilai_uas": 55, "nilai_tugas": 60,
    },
    {
        "nama": "Dewi Anggraini", "nim": "124140122",
        "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50,
    },
]

for mahasiswa in data_mahasiswa:
    nilai_akhir = (
        0.30 * mahasiswa["nilai_uts"]
        + 0.40 * mahasiswa["nilai_uas"]
        + 0.30 * mahasiswa["nilai_tugas"]
    )
    if nilai_akhir >= 80:
        grade = "A"
    elif nilai_akhir >= 70:
        grade = "B"
    elif nilai_akhir >= 60:
        grade = "C"
    elif nilai_akhir >= 50:
        grade = "D"
    else:
        grade = "E"
    mahasiswa["nilai_akhir"] = nilai_akhir
    mahasiswa["grade"] = grade

print(f"{'Nama':<25} {'NIM':<12} {'Nilai Akhir':>12} {'Grade':>6}")
print("-" * 58)
for mahasiswa in data_mahasiswa:
    print(
        f"{mahasiswa['nama']:<25} {mahasiswa['nim']:<12} "
        f"{mahasiswa['nilai_akhir']:>12.2f} {mahasiswa['grade']:>6}"
    )

tertinggi = max(data_mahasiswa, key=lambda m: m["nilai_akhir"])
terendah = min(data_mahasiswa, key=lambda m: m["nilai_akhir"])

print("\nMahasiswa dengan nilai akhir tertinggi:")
print(
    f"{tertinggi['nama']} | {tertinggi['nim']} | "
    f"{tertinggi['nilai_akhir']:.2f} | Grade {tertinggi['grade']}"
)
print("\nMahasiswa dengan nilai akhir terendah:")
print(
    f"{terendah['nama']} | {terendah['nim']} | "
    f"{terendah['nilai_akhir']:.2f} | Grade {terendah['grade']}"
)
