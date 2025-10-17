// Cargar header y footer
document.addEventListener('DOMContentLoaded', function() {
    // Cargar header
    fetch('components/header.html')
        .then(response => {
            if (!response.ok) throw new Error('Header no encontrado');
            return response.text();
        })
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => {
            console.error('Error cargando header:', error);
            document.getElementById('header').innerHTML = '<div class="container py-3"><p>Error cargando navegación</p></div>';
        });

    // Cargar footer
    fetch('components/footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Footer no encontrado');
            return response.text();
        })
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => {
            console.error('Error cargando footer:', error);
            document.getElementById('footer').innerHTML = '<div class="container py-3"><p>Error cargando footer</p></div>';
        });
});