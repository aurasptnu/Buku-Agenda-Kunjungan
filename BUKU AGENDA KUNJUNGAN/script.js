const tombolTambah = document.getElementById('tombol-tambah');
const popupForm = document.getElementById('popup-form');
const tombolTutup = document.getElementById('tutup-popup');
const formKunjungan = document.getElementById('form-kunjungan');
const isiTabel = document.getElementById('isi-tabel');
const canvas = document.getElementById('canvas-ttd');
const ctx = canvas.getContext('2d');
const hapusTTD = document.getElementById('hapus-ttd');

let menggambar = false;

// Fungsi ambil posisi kursor/touch di canvas
function getPosisi(e) {
    let rect = canvas.getBoundingClientRect();
    if (e.touches) {
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    } else {
        return {
            x: e.offsetX,
            y: e.offsetY
        };
    }
}

// Buka form
tombolTambah.addEventListener('click', () => {
    popupForm.style.display = 'flex';
});

// Tutup form
tombolTutup.addEventListener('click', () => {
    popupForm.style.display = 'none';
});

// Event mouse
canvas.addEventListener('mousedown', (e) => {
    menggambar = true;
    let pos = getPosisi(e);
    ctx.moveTo(pos.x, pos.y);
});
canvas.addEventListener('mouseup', () => { menggambar = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', (e) => gambar(e));

// Event sentuhan (HP)
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    menggambar = true;
    let pos = getPosisi(e);
    ctx.moveTo(pos.x, pos.y);
});
canvas.addEventListener('touchend', () => { menggambar = false; ctx.beginPath(); });
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    gambar(e);
});

// Fungsi menggambar
function gambar(e) {
    if (!menggambar) return;
    let pos = getPosisi(e);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

// Hapus tanda tangan
hapusTTD.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Simpan data ke tabel
formKunjungan.addEventListener('submit', (e) => {
    e.preventDefault();

    const noUrut = document.getElementById('no-urut').value;
    const tanggal = document.getElementById('tanggal').value;
    const noSpt = document.getElementById('no-spt').value;
    const nama = document.getElementById('nama').value;
    const dinas = document.getElementById('dinas').value;

    const urlTTD = canvas.toDataURL();

    const barisBaru = document.createElement('tr');
    barisBaru.innerHTML = `
        <td>${noUrut}</td>
        <td>${tanggal}</td>
        <td>${noSpt}</td>
        <td>${nama}</td>
        <td>${dinas}</td>
        <td><img src="${urlTTD}" alt="Tanda Tangan" height="50"></td>
    `;

    isiTabel.appendChild(barisBaru);

    popupForm.style.display = 'none';
    formKunjungan.reset();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});