// JavaScript untuk mengelola popup form
const openFormBtn = document.getElementById('openForm');
const closeFormBtn = document.getElementById('closeForm');
const popupForm = document.querySelector('.popup-form');

// buka modal dengan menambahkan kelas 'open'
openFormBtn.addEventListener('click', () => {
    popupForm.classList.add('open');
});

// tutup modal dengan menghapus kelas 'open'
closeFormBtn.addEventListener('click', () => {
    popupForm.classList.remove('open');
});

// Menutup form saat mengklik di luar kotak form (backdrop)
window.addEventListener('click', (event) => {
    if (event.target === popupForm) {
        popupForm.classList.remove('open');
    }
});

const method = document.getElementsByName('method');
const diAmbil = document.getElementById('DiAmbil');
const diKirim = document.getElementById('DiKirim');
const locationField = document.getElementById('location');
const locationLabel = document.querySelector('label[for="location"]');

// Fungsi untuk menampilkan atau menyembunyikan field lokasi berdasarkan metode pengambilan`
function toggleLocationField() {
    if (diKirim.checked) {
        locationField.style.display = 'block';
        locationField.required = true;
        locationLabel.style.display = 'block';
    } else {
        locationField.style.display = 'none';
        locationField.required = false;
        locationLabel.style.display = 'none';
    }
}
// Tambahkan event listener ke radio button
diAmbil.addEventListener('change', toggleLocationField);
diKirim.addEventListener('change', toggleLocationField);

document.getElementById('orderFrom').addEventListener('submit', function(e) {e.preventDefault();
    const nama = document.getElementById("name").value;
    const pesanan = document.getElementById("order").value;
    const jumlah = document.getElementById("quantity").value;
    const metode = document.querySelector('input[name="method"]:checked').value;
    let lokasi = "Diambil di tempat";

    const pesan = `Halo, saya ${nama}, saya ingin memesan ${jumlah} ${pesanan}. Metode pengambilan: ${metode}.`;

    const nomorWA = "6282181909031";
    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
    window.open(url, '_blank');
});
