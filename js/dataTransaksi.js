// variabel dari id elemen
const wadahTransaksi = document.getElementById("wadah-transaksi");
const pemasukkan = document.getElementById("pemasukkan");

const wadahRekapan = document.getElementById("isi-rekapan");
const tombolRekapan = document.getElementById("tombol-rekapan");

// variabel pendukung
let dataTransaksi = null;
let rekapan = false;
let rekapanCash = [];
let rekapanQris = [];
let rekapanTransfer = [];


// angka di convert ke tampilan rupiah
const rupiah = (angka) => `Rp ${angka.toLocaleString("id-ID")}`;


// rekapan metode cash
const tampilkanCash = () => {
    rekapanCash.forEach(item => {
        Object.entries(item).forEach(([keys, values]) => {
            const p = document.createElement("p");
            p.textContent = `${keys}: ${values}`;
            wadahRekapan.appendChild(p);
        })
    })
    console.log(rekapanCash)
};


// memperbarui data dan halaman yang tampil
const perbarui = () => {
    wadahTransaksi.innerHTML = "";

    //kalau belum ada data tersimpan, pakai data kosong
    const data = JSON.parse(localStorage.getItem("data")) || { dataTransaksi: [], pemasukkan: 0 };

    dataTransaksi = data.dataTransaksi;

    dataTransaksi.forEach((item) => {
        const p = document.createElement("p");
        p.style.whiteSpace = "pre-line";

        p.textContent =
            `Pesanan Nomor: ${item.id} || ${item.tanggal}
            Produk: ${item.produk}
            Harga: ${rupiah(item.harga)} || Bayar: ${rupiah(item.bayar)}
            Kembalian: ${rupiah(item.kembalian)} || Metode: ${item.metode}`;

        wadahTransaksi.appendChild(p);
    });

    pemasukkan.textContent = `${rupiah(data.pemasukkan)}`;
};

perbarui();

// kalau data masih kosong atau ada transfer data transaksi masuk, perbarui halaman secara otomatis
window.addEventListener("storage", (event) => {
    if (event.key === "data" || event.key === null) perbarui();
});


// menampilkan rekapan pemasukkan sesuai metode
tombolRekapan.addEventListener("click", () => {
    if (!rekapan) {
        const cash = dataTransaksi.filter(data => data.metode === "Cash");
        rekapanCash.push(...cash);
        if (cash) tampilkanCash();
    }
})

// localStorage.removeItem("data");