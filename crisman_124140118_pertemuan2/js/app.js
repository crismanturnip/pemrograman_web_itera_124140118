export class TaskItem {
    constructor({
        id = Date.now(),
        mataKuliah,
        namaTugas,
        deadline,
        prioritas = "sedang",
        selesai = false
    }) {
        this.id = Number(id);
        this.mataKuliah = mataKuliah;
        this.namaTugas = namaTugas;
        this.deadline = deadline;
        this.prioritas = prioritas;
        this.selesai = selesai;
    }
}

export class DashboardApp {
    constructor() {
        this.storageKey = "dashboardKuliahTasks";
        this.tasks = this.loadTasks();
        this.filter = "semua";

        this.taskList = document.getElementById("taskList");
        this.emptyState = document.getElementById("emptyState");
        this.form = document.getElementById("taskForm");
        this.editId = document.getElementById("editId");

        this.render();
        this.loadWeather();
    }

    loadTasks() {
        const saved = localStorage.getItem(this.storageKey);

        if (!saved) {
            return [];
        }

        try {
            const data = JSON.parse(saved);
            return data.map(item => new TaskItem(item));
        } catch (error) {
            console.error("gagal membaca localStorage", error);
            return [];
        }
    }

    saveTasks() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }

    addTask(data) {
        const newTask = new TaskItem(data);
        this.tasks = [...this.tasks, newTask];
        this.saveTasks();
        this.render();
    }

    updateTask(id, data) {
        this.tasks = this.tasks.map(task =>
            task.id === id
                ? new TaskItem({ ...task, ...data, id })
                : task
        );

        this.saveTasks();
        this.render();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.render();
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(task =>
            task.id === id
                ? new TaskItem({ ...task, selesai: !task.selesai })
                : task
        );

        this.saveTasks();
        this.render();
    }

    getFilteredTasks() {
        if (this.filter === "selesai") {
            return this.tasks.filter(task => task.selesai);
        }

        if (this.filter === "belum") {
            return this.tasks.filter(task => !task.selesai);
        }

        return this.tasks;
    }

    render() {
        const tasks = this.getFilteredTasks();

        this.taskList.innerHTML = tasks.map(task => this.createTaskCard(task)).join("");
        this.emptyState.classList.toggle("hidden", tasks.length > 0);

        const total = this.tasks.length;
        const selesai = this.tasks.filter(task => task.selesai).length;
        const belum = total - selesai;

        document.getElementById("totalTugas").textContent = total;
        document.getElementById("belumSelesai").textContent = belum;
        document.getElementById("sudahSelesai").textContent = selesai;
    }

    createTaskCard({ id, mataKuliah, namaTugas, deadline, prioritas, selesai }) {
        const teksTombol = selesai ? "Batalkan" : "Selesai";
        const statusClass = selesai ? "selesai" : "";
        return `
            <article class="task-item prioritas-${prioritas} ${statusClass}">
                <div class="task-top">
                    <div>
                        <h3>${namaTugas}</h3>
                        <p class="task-course">${mataKuliah}</p>
                    </div>
                    <span class="badge">${prioritas}</span>
                </div>

                <p class="task-meta">Deadline: ${this.formatDate(deadline)}</p>

                <div class="task-actions">
                    <button class="btn-done" data-action="toggle" data-id="${id}">${teksTombol}</button>
                    <button class="btn-edit" data-action="edit" data-id="${id}">Edit</button>
                    <button class="btn-delete" data-action="delete" data-id="${id}">Hapus</button>
                </div>
            </article>
        `;
    }

    formatDate(dateString) {
        const date = new Date(`${dateString}T00:00:00`);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    startEdit(id) {
        const task = this.tasks.find(item => item.id === id);

        if (!task) {
            return;
        }

        const { mataKuliah, namaTugas, deadline, prioritas } = task;

        this.editId.value = id;
        document.getElementById("mataKuliah").value = mataKuliah;
        document.getElementById("namaTugas").value = namaTugas;
        document.getElementById("deadline").value = deadline;
        document.getElementById("prioritas").value = prioritas;

        document.getElementById("formTitle").textContent = "Edit Tugas";
        document.getElementById("submitBtn").textContent = "Simpan perubahan";
        document.getElementById("cancelBtn").classList.remove("hidden");
    }

    resetForm() {
        this.form.reset();
        this.editId.value = "";
        document.getElementById("formTitle").textContent = "Tambah Tugas";
        document.getElementById("submitBtn").textContent = "Tambah tugas";
        document.getElementById("cancelBtn").classList.add("hidden");
    }

    async loadWeather() {
        const weatherText = document.getElementById("weatherText");
        const weatherInfo = document.getElementById("weatherInfo");

        try {
            const url = "https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true";
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("response API tidak berhasil");
            }

            const data = await response.json();
            const { temperature, windspeed } = data.current_weather;

            weatherText.textContent = `${temperature}°C`;
            weatherInfo.textContent = `angin ${windspeed} km/jam`;
        } catch (error) {
            weatherText.textContent = "cuaca tidak tersedia";
            weatherInfo.textContent = "coba refresh saat terhubung internet";
            console.error("gagal mengambil data cuaca", error);
        }
    }
}
