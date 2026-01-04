document.querySelector('.btn-primary').addEventListener('click', function() {
    document.querySelector('.produck-section').scrollIntoView({ behavior: 'smooth' });
});

// Event delegation untuk tombol beli
const producks = document.querySelector('.producks');
producks.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-buy')) {
        event.stopPropagation(); // Mencegah event naik ke window
        
        const produck = event.target.closest('.produck');
        const name = produck.querySelector('h3').getAttribute('nama');
        const priceText = produck.querySelector('.harga').getAttribute('harga');
        
        // Parse harga per unit
        const unitPrice = parseInt(priceText.replace(/\./g, ''));
        
        // Isi form
        document.getElementById('productName').value = name;
        document.getElementById('productPrice').value = 'Rp ' + priceText;
        
        // Simpan harga per unit
        window.unitPrice = unitPrice;
        
        // Hitung total awal
        updateTotal();
        
        // Tampilkan form
        document.getElementById('buyForm').style.display = 'block';
    }
});

// Fungsi untuk update total harga
function updateTotal() {
    if (window.unitPrice) {
        const qty = parseInt(document.getElementById('quantity').value) || 1;
        const total = window.unitPrice * qty;
        document.getElementById('totalPrice').value = 'Rp ' + total.toLocaleString('id-ID');
    }
}

// Event listener untuk quantity
document.getElementById('quantity').addEventListener('input', updateTotal);

// Dapatkan elemen form
const buyForm = document.getElementById('buyForm');

// Event listener untuk menutup form ketika klik di luar
window.addEventListener('click', (event) => {
    if (!buyForm.contains(event.target)) {
        buyForm.style.display = 'none';
    }
});

function cekBuyerName() {
    const buyerName = document.getElementById('buyerName').value.trim();
    const buyerNameInfo = document.getElementById('buyerNameInfo');
    const simbolUnik = /[*$#\/\-\[\]\(\)]/;

    if (buyerName.length >= 2 && !simbolUnik.test(buyerName)) {
        buyerNameInfo.style.color = 'green';
        buyerNameInfo.textContent = 'Nama valid.';
        buyerNameInfo.className = "info valid";
        return true;
    }
    else {
        buyerNameInfo.style.color = 'red';
        buyerNameInfo.textContent = 'Nama tidak valid. Minimal 2 huruf dan tidak mengandung simbol unik (*, $, #, /, -, [, ], (, )).';
        buyerNameInfo.className = "info invalid";
        return false;
    }
}
function cekBuyerAddress() {
    const buyerAddress = document.getElementById('buyerAddress').value.trim();
    const buyerAddressInfo = document.getElementById('buyerAddressInfo');
    const strip = /-/g;

    if (buyerAddress.length >= 10 && (buyerAddress.match(strip) || []).length >= 5) {
        buyerAddressInfo.style.color = 'green';
        buyerAddressInfo.textContent = 'Alamat valid.';
        return true;
    }
    else {
        buyerAddressInfo.style.color = 'red';
        buyerAddressInfo.textContent = 'Alamat tidak valid. Contoh format: provinsi-kabupaten-kecamatan-RT-RW-jalan.';
        return false;
    }
}
function buy() {
    const validBuyerName = cekBuyerName();
    const validBuyerAddress = cekBuyerAddress();

    if (validBuyerName && validBuyerAddress) {
        const buyerName = document.getElementById('buyerName').value.trim();
        const productName = document.getElementById('productName').value;
        const quantity = document.getElementById('quantity').value;
        const totalPrice = document.getElementById('totalPrice').value;

        const message = `Halo, saya ${buyerName}, saya ingin membeli ${quantity} ${productName}. Total harga yang harus saya bayar adalah ${totalPrice}.`;

        const waNumber = "6282181909031";
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');
    }
    else {
        alert('Silakan perbaiki data pembeli sebelum melanjutkan pembelian.');
    }
}