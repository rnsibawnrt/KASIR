const wadahTransaksi = document.getElementById("wadah-transaksi");
const pemasukkan = document.getElementById("pemasukkan");
let dataTransaksi = null;


const rupiah = (angka) => `Rp ${angka.toLocaleString("id-ID")}`;


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

window.addEventListener("storage", (event) => {
    //event.key bernilai null kalau seluruh data browser dihapus
    if (event.key === "data" || event.key === null) perbarui();
});

