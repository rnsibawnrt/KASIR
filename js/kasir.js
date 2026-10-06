const wadah = document.getElementById("daftar-produk");
const wadahKeranjang = document.getElementById("keranjang");
const totalHarga = document.getElementById("total");

let keranjang = [];
let bukaMenu = false;

const tampilkanKeranjang = () => {
    wadahKeranjang.innerHTML = "";
    let total = 0;

    keranjang.forEach((item) => {
        const p = document.createElement("p");
        p.textContent = `${item.nama} x${item.jumlah}. Harga: Rp ${item.jumlah * item.harga}`;
        wadahKeranjang.appendChild(p);
        total += item.jumlah * item.harga;
    });

    totalHarga.textContent = `${total}`;
};

const tambahkanKeKeranjang = (produkDipilih, qty) => {
    if (+qty <= 0) return;

    const adaProduk = keranjang.find((k) => k.id === produkDipilih.id);

    if (adaProduk) {
        adaProduk.jumlah += +qty;
    } else {
        keranjang.push({ ...produkDipilih, jumlah: +qty });
    }

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
        tambahkanKeKeranjang(produkDipilih, input.value);
        tutupMenu();
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

produk.forEach((item) => {
    const barisProduk = document.createElement("div");
    barisProduk.textContent = `${item.id} ) ${item.nama} - Rp ${item.harga} `;

    const tombol = document.createElement("button");
    tombol.textContent = "Keranjang";
    tombol.addEventListener("click", () => {
        if (!bukaMenu) {
            bukaMenu = true;
            menuKeranjang(barisProduk, item);
        }
    });

    [barisProduk, tombol].forEach((item2) => {
        wadah.appendChild(item2);
    });
});