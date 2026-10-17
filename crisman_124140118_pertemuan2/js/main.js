import { DashboardApp } from "./app.js";

const app = new DashboardApp();

const form = document.getElementById("taskForm");
const cancelBtn = document.getElementById("cancelBtn");
const filterStatus = document.getElementById("filterStatus");
const taskList = document.getElementById("taskList");

const tampilkanTanggal = () => {
    const sekarang = new Date();
    document.getElementById("tanggalSekarang").textContent =
        sekarang.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
};

const ambilDataForm = () => ({
    mataKuliah: document.getElementById("mataKuliah").value.trim(),
    namaTugas: document.getElementById("namaTugas").value.trim(),
    deadline: document.getElementById("deadline").value,
    prioritas: document.getElementById("prioritas").value
});

const validasiForm = ({ mataKuliah, namaTugas, deadline }) =>
    mataKuliah !== "" && namaTugas !== "" && deadline !== "";

form.addEventListener("submit", event => {
    event.preventDefault();

    const data = ambilDataForm();

    if (!validasiForm(data)) {
        alert("data tugas belum lengkap");
        return;
    }

    const id = Number(document.getElementById("editId").value);

    if (id) {
        app.updateTask(id, data);
    } else {
        app.addTask(data);
    }

    app.resetForm();
});

cancelBtn.addEventListener("click", () => {
    app.resetForm();
});

filterStatus.addEventListener("change", event => {
    app.filter = event.target.value;
    app.render();
});

taskList.addEventListener("click", event => {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "toggle") {
        app.toggleTask(id);
    }

    if (action === "edit") {
        app.startEdit(id);
    }

    if (action === "delete") {
        const yakin = confirm("hapus tugas ini?");
        if (yakin) {
            app.deleteTask(id);
        }
    }
});

tampilkanTanggal();
