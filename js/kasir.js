const wadah = document.getElementById("daftar-produk");

produk.forEach((item) => {
    const p = document.createElement("p");
    p.textContent = `${item.nama} - - - - - Rp ${item.harga}`;
    wadah.appendChild(p);
});