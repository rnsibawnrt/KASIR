//variabel elemen dengan id html
const wadah = document.getElementById("daftar-produk");
const wadahKeranjang = document.getElementById("keranjang");
const totalHarga = document.getElementById("total");

const metodePembayaran = document.querySelectorAll('input[name="metode"]');
const metode = document.getElementById("metode-dipilih");

const inputBayar = document.getElementById("uang-bayar");
const infoKembalian = document.getElementById("info-kembalian");

const konfirmasiPesanan = document.getElementById("konfirmasi-pesanan");
const infoKonfirmasi = document.getElementById("info-konfirmasi");
const wadahRiwayat = document.getElementById("riwayat-pesanan");

//variabel pendukung
let keranjang = [];
let bukaMenu = false;
let metodeDipilih = "";
let totalSekarang = 0;
let inputPembayaran = 0;
let dataTransaksi = [];
let pemasukkan = 0;


//ubah ke rupiah
const rupiah = (angka) => `Rp ${angka.toLocaleString("id-ID")}`;


//simpan data
const transferData = () => {
    const data = {
        dataTransaksi,
        pemasukkan
    };

    localStorage.setItem("data", JSON.stringify(data));
};


//reset kasir
const resetKasir = () => {
    keranjang = [];
    wadahKeranjang.innerHTML = "";
    totalHarga.textContent = `${rupiah(0)}`;
    totalSekarang = 0;
    infoKembalian.textContent = `Kembalian: ${rupiah(0)}`;
    metode.textContent = "Belum Dipilih";
    metodeDipilih = "";
    metodePembayaran.forEach((item) => {
        item.checked = false;
    });
    inputBayar.value = "";
    inputPembayaran = 0;

    transferData();
};


//tampilkan riwayat transaksi
const tampilkanTransaksi = () => {
    wadahRiwayat.textContent = "";

    dataTransaksi.forEach((item) => {
        const p = document.createElement("p");
        p.style.whiteSpace = "pre-line";

        p.textContent =
            `Pesanan Nomor: ${item.id} || ${item.tanggal}
            Produk: ${item.produk}
            Harga: ${rupiah(item.harga)} || Bayar: ${rupiah(item.bayar)}
            Kembalian: ${rupiah(item.kembalian)} || Metode: ${item.metode}`;

        wadahRiwayat.appendChild(p);
    });
};


//riwayat transaksi
const riwayatTransaksi = () => {
    //salin isi keranjang kedalam dataProduk tanpa Object namun masih bentuk array
    let dataProduk = keranjang.map((k) => `${k.nama} x${k.jumlah}`)
    //menggabungkan isi dataProduk tanpa array
    .join(", ");

    const transaksi = {
        id: dataTransaksi.length + 1,
        tanggal: new Date().toLocaleString("id-ID"),
        produk: dataProduk,
        harga: totalSekarang,
        bayar: inputPembayaran,
        kembalian: inputPembayaran - totalSekarang,
        metode: metodeDipilih
    };

    dataTransaksi.push(transaksi);
    pemasukkan += totalSekarang;
    tampilkanTransaksi();
    resetKasir();
};


//verifikasi pesanan
const verifikasiPesanan = () => {
    if (0 >= keranjang.length) {
        infoKonfirmasi.textContent = "Isi Keranjang Masih Kosong";
        return false;
    } else if (metodeDipilih === "") {
        infoKonfirmasi.textContent = "Metode Pembayaran Belum Di Pilih";
        return false;
    } else if (inputPembayaran < totalSekarang) {
        infoKonfirmasi.textContent = `Uang Tidak Mencukupi, ${rupiah(totalSekarang - inputPembayaran)}`;
        return false;
    } else {
        infoKonfirmasi.textContent = "Transaksi Sebelumnya Sudah Berhasil, Pesanan Selesai.";
        return true;
    }
};


//metode pembayaran
metodePembayaran.forEach((radio) => {
    radio.addEventListener("change", () => {
        metodeDipilih = radio.value;
        metode.textContent = metodeDipilih;
    });
});


//hitung kembalian otomatis
const hitungKembalian = () => {
    inputPembayaran = +inputBayar.value;
    const selisih = +inputBayar.value - totalSekarang;

    if (inputBayar.value === "") {
        infoKembalian.textContent = `Kembalian: ${rupiah(0)}`;
    } else if (selisih < 0) {
        infoKembalian.textContent = `Uang kurang: ${rupiah(-selisih)}`;
    } else {
        infoKembalian.textContent = `Kembalian: ${rupiah(selisih)}`;
    };
};

inputBayar.addEventListener("input", hitungKembalian);


//simpan produk ke keranjang dan menampilkan produk di keranjang
const tampilkanKeranjang = () => {
    wadahKeranjang.innerHTML = "";
    let total = 0;

    keranjang.forEach((item) => {
        const p = document.createElement("p");
        p.textContent = `${item.nama} x${item.jumlah}; Harga: ${rupiah(item.harga * item.jumlah)}`;
        total += item.jumlah * item.harga;

        const tombol = document.createElement("button");
        tombol.textContent = "Hapus dari Keranjang";
        tombol.addEventListener("click", () => {
            //ubah isi keranjang baru tanpa produk yang di hapus
            keranjang = keranjang.filter(k => k !== item);
            //reset tampilan
            tampilkanKeranjang();
        });

        [p, tombol].forEach((elemen) => {
            wadahKeranjang.appendChild(elemen);
        });
    });

    totalHarga.textContent = `${rupiah(total)}`;

    totalSekarang = total;
    hitungKembalian();
};


const tambahkanKeKeranjang = (produkDipilih, qty) => {
    if (+qty <= 0) return;

    //cek apakah produk sudah di tambahkan kedalam keranjang
    const adaProduk = keranjang.find((k) => k.id === produkDipilih.id);

    if (adaProduk) {
        //jika sudah ada tambah jumlah produk
        adaProduk.jumlah += +qty;
    } else {
        //jika belum ada tambahkan kedalam keranjang beserta bikin jumlah produk
        keranjang.push({ ...produkDipilih, jumlah: +qty });
    };

    tampilkanKeranjang();
};


const menuKeranjang = (barisProduk, produkDipilih) => {
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");

    const tutupMenu = () => {
        div1.remove();
        div2.remove();
        bukaMenu = false;
    };

    const input = document.createElement("input");
    input.type = "number";
    input.min = 0;
    input.max = 99;
    input.value = 0;

    input.addEventListener("input", () => {
        if (+input.value < 0) input.value = 0;
        if (+input.value > 99) input.value = 99;
    });

    const tombolKurang = document.createElement("button");
    tombolKurang.textContent = "-";
    tombolKurang.addEventListener("click", () => {
        if (+input.value > 0) input.value--;
    });

    const tombolTambah = document.createElement("button");
    tombolTambah.textContent = "+";
    tombolTambah.addEventListener("click", () => {
        if (+input.value < 99) input.value++;
    });

    const tombolTambahkan = document.createElement("button");
    tombolTambahkan.textContent = "Tambahkan";
    tombolTambahkan.addEventListener("click", () => {
        tutupMenu();
        tambahkanKeKeranjang(produkDipilih, input.value);
    });

    const tombolBatal = document.createElement("button");
    tombolBatal.textContent = "Batal";
    tombolBatal.addEventListener("click", tutupMenu);

    [input, tombolKurang, tombolTambah].forEach((item) => {
        div1.appendChild(item);
    });

    [tombolTambahkan, tombolBatal].forEach((item) => {
        div2.appendChild(item);
    });

    [div1, div2].forEach((item) => {
        barisProduk.appendChild(item);
    });
};


//menampilkan daftar produk
produk.forEach((item) => {
    const barisProduk = document.createElement("div");
    barisProduk.textContent = `${item.id} ) ${item.nama} - ${rupiah(item.harga)} `;

    const tombol = document.createElement("button");
    tombol.textContent = "Keranjang";
    tombol.addEventListener("click", () => {
        if (!bukaMenu) {
            bukaMenu = true;
            menuKeranjang(barisProduk, item);
        };
    });

    [barisProduk, tombol].forEach((item2) => {
        wadah.appendChild(item2);
    });
});


konfirmasiPesanan.addEventListener("click", () => {
    let statusVerif = verifikasiPesanan();

    if (statusVerif) riwayatTransaksi();
});



//muat data tersimpan saat halaman dibuka
const dataTersimpan = JSON.parse(localStorage.getItem("data"));

if (dataTersimpan) {
    dataTransaksi = dataTersimpan.dataTransaksi || [];
    pemasukkan = dataTersimpan.pemasukkan || 0;

    if (dataTransaksi.length > 0) tampilkanTransaksi();
}