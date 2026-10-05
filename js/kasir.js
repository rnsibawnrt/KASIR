const wadah = document.getElementById("daftar-produk");
const wadahKeranjang = document.getElementById("keranjang");
const elTotal = document.getElementById("total");


let keranjang = [];


function tampilkanKeranjang() {
    wadahKeranjang.innerHTML = "";
    let total = 0;


    keranjang.forEach((item) => {
        const p = document.createElement("p");
        p.textContent = `${item.nama} x${item.qty} - Rp ${item.harga * item.qty}`;
        wadahKeranjang.appendChild(p);
        total += item.harga * item.qty;
    });


    elTotal.textContent = total;
}


function tambahKeKeranjang(item) {
    const ada = keranjang.find((k) => k.id === item.id);
    if (ada) {
        ada.qty++;
    } else {
        keranjang.push({ ...item, qty: 1 });
    }
    tampilkanKeranjang();
}


produk.forEach((item) => {
    const p = document.createElement("p");
    p.textContent = `${item.nama} - - - - - Rp ${item.harga} `;


    const tombol = document.createElement("button");
    tombol.textContent = "Tambah";
    tombol.addEventListener("click", () => tambahKeKeranjang(item));


    p.appendChild(tombol);
    wadah.appendChild(p);
});