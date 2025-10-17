// Validación del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successAlert = document.getElementById('successAlert');
    const contadorCaracteres = document.getElementById('contadorCaracteres');
    const mensajeTextarea = document.getElementById('mensaje');
    
    if (!form) return;
    
    // Contador de caracteres para el mensaje
    if (mensajeTextarea && contadorCaracteres) {
        mensajeTextarea.addEventListener('input', function() {
            contadorCaracteres.textContent = this.value.length;
        });
    }
    
    form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            // Simular envío exitoso
            if (successAlert) {
                successAlert.classList.remove('d-none');
                successAlert.classList.add('show');
            }
            form.reset();
            if (contadorCaracteres) {
                contadorCaracteres.textContent = '0';
            }
            form.classList.remove('was-validated');
            
            // Scroll to alert
            if (successAlert) {
                successAlert.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        form.classList.add('was-validated');
    }, false);
    
    // Validación en tiempo real para mejor UX
    const campos = form.querySelectorAll('input, select, textarea');
    campos.forEach(campo => {
        campo.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    });
});