document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.layanan-btn').addEventListener('click', function() {
        document.querySelector('.layanan').scrollIntoView({ behavior: 'smooth' });
    });
});