// Data keranjang disimpan sebagai array objek.
const STORAGE_KEY = "miniPosKeranjang";
const formBarang = document.getElementById("form-barang");
const inputNama = document.getElementById("nama");
const inputHarga = document.getElementById("harga");
const inputQty = document.getElementById("qty");
const inputBayar = document.getElementById("uang-bayar");
const tabelKeranjang = document.getElementById("tabel-keranjang");
let keranjang = ambilKeranjang();

function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID", { maximumFractionDigits: 0 });
}

function ambilKeranjang() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(data)) return [];
    return data.filter(item =>
      typeof item.nama === "string" && item.nama.trim().length >= 3 &&
      Number.isSafeInteger(item.harga) && item.harga >= 500 &&
      Number.isSafeInteger(item.qty) && item.qty >= 1
    );
  } catch (error) {
    console.warn("Data keranjang tidak dapat dibaca:", error);
    return [];
  }
}

function simpanKeranjang() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keranjang));
}

function tampilkanError(id, pesan) {
  document.getElementById("error-" + id).textContent = pesan;
  document.getElementById(id).classList.toggle("invalid", pesan !== "");
  document.getElementById(id).setAttribute("aria-invalid", pesan ? "true" : "false");
}

function validasiBarang() {
  const nama = inputNama.value.trim();
  const hargaTeks = inputHarga.value.trim();
  const qtyTeks = inputQty.value.trim();
  const harga = Number(hargaTeks);
  const qty = Number(qtyTeks);

  const errorNama = nama.length < 3 ? "Nama barang minimal 3 karakter." : "";
  const errorHarga = hargaTeks === "" || !Number.isSafeInteger(harga) || harga < 500
    ? "Harga harus angka bulat minimal Rp500." : "";
  const errorQty = qtyTeks === "" || !Number.isSafeInteger(qty) || qty < 1
    ? "Jumlah harus angka bulat minimal 1." : "";

  tampilkanError("nama", errorNama);
  tampilkanError("harga", errorHarga);
  tampilkanError("qty", errorQty);

  if (errorNama || errorHarga || errorQty) return null;
  return { nama, harga, qty };
}

function hitungTotal() {
  return keranjang.reduce((jumlah, item) => jumlah + item.harga * item.qty, 0);
}

function hitungPembayaran(totalAkhir) {
  const teksBayar = inputBayar.value.trim();
  const uangBayar = Number(teksBayar);
  const elemenKembalian = document.getElementById("kembalian");
  const statusBayar = document.getElementById("status-bayar");
  statusBayar.classList.remove("warning");

  if (keranjang.length === 0) {
    elemenKembalian.textContent = "Rp0";
    statusBayar.textContent = "Tambahkan barang terlebih dahulu.";
  } else if (teksBayar === "") {
    elemenKembalian.textContent = "Rp0";
    statusBayar.textContent = "Masukkan uang bayar untuk menghitung kembalian.";
  } else if (!Number.isSafeInteger(uangBayar) || uangBayar < 0) {
    elemenKembalian.textContent = "Rp0";
    statusBayar.textContent = "Masukkan nominal uang bayar yang valid.";
    statusBayar.classList.add("warning");
  } else if (uangBayar < totalAkhir) {
    elemenKembalian.textContent = "Rp0";
    statusBayar.textContent = "Uang kurang " + formatRupiah(totalAkhir - uangBayar) + ".";
    statusBayar.classList.add("warning");
  } else {
    elemenKembalian.textContent = formatRupiah(uangBayar - totalAkhir);
    statusBayar.textContent = "Pembayaran mencukupi.";
  }
}

function tampilkanKeranjang() {
  tabelKeranjang.replaceChildren();
  keranjang.forEach((item, index) => {
    const baris = document.createElement("tr");
    const isi = [index + 1, item.nama, formatRupiah(item.harga), item.qty, formatRupiah(item.harga * item.qty)];
    isi.forEach(teks => {
      const kolom = document.createElement("td");
      kolom.textContent = teks;
      baris.appendChild(kolom);
    });
    const kolomAksi = document.createElement("td");
    const tombolHapus = document.createElement("button");
    tombolHapus.type = "button";
    tombolHapus.className = "delete-btn";
    tombolHapus.textContent = "Hapus";
    tombolHapus.setAttribute("aria-label", "Hapus " + item.nama);
    tombolHapus.addEventListener("click", () => hapusBarang(index));
    kolomAksi.appendChild(tombolHapus);
    baris.appendChild(kolomAksi);
    tabelKeranjang.appendChild(baris);
  });

  document.getElementById("keranjang-kosong").hidden = keranjang.length > 0;
  document.getElementById("jumlah-item").textContent = keranjang.length + " item";
  const total = hitungTotal();
  const diskon = total >= 50000 ? total * 0.10 : 0;
  const totalAkhir = total - diskon;
  document.getElementById("total-belanja").textContent = formatRupiah(total);
  document.getElementById("diskon").textContent = "− " + formatRupiah(diskon);
  document.getElementById("total-akhir").textContent = formatRupiah(totalAkhir);
  hitungPembayaran(totalAkhir);
}

function hapusBarang(index) {
  keranjang.splice(index, 1);
  simpanKeranjang();
  tampilkanKeranjang();
}

formBarang.addEventListener("submit", function(event) {
  event.preventDefault();
  const barang = validasiBarang();
  if (!barang) return;
  keranjang.push(barang);
  simpanKeranjang();
  tampilkanKeranjang();
  formBarang.reset();
  ["nama", "harga", "qty"].forEach(id => tampilkanError(id, ""));
  inputNama.focus();
});

[inputNama, inputHarga, inputQty].forEach(input => {
  input.addEventListener("input", () => tampilkanError(input.id, ""));
});
inputBayar.addEventListener("input", tampilkanKeranjang);

document.getElementById("reset-transaksi").addEventListener("click", function() {
  if (keranjang.length > 0 && !confirm("Mulai transaksi baru? Semua barang di keranjang akan dihapus.")) return;
  keranjang = [];
  localStorage.removeItem(STORAGE_KEY);
  formBarang.reset();
  inputBayar.value = "";
  ["nama", "harga", "qty"].forEach(id => tampilkanError(id, ""));
  tampilkanKeranjang();
});

tampilkanKeranjang();
