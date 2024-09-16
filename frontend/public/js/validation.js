document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evitar el envío del formulario hasta validar

        // Limpiar mensajes de error previos
        clearErrors();

        // Validar los campos
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        let isValid = true;

        if (!validateEmail(email)) {
            showError(emailInput, 'Por favor, introduce un email válido.');
            isValid = false;
        }

        if (password === '') {
            showError(passwordInput, 'La contraseña no puede estar vacía.');
            isValid = false;
        }

        // Si no hay errores, intentar autenticar
        if (isValid) {
            try {
                const response = await loginUser(email, password);
                if (response.status === 200) {
                    // Redirigir a la página de inicio (index.html)
                    window.location.href = '/index.html';
                } else {
                    const data = await response.json();
                    showError(form, data.message);
                }
            } catch (err) {
                showError(form, 'Error al intentar iniciar sesión');
            }
        }
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(input, message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        input.parentElement.appendChild(errorMessage);
        input.classList.add('input-error');
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());

        const errorInputs = document.querySelectorAll('.input-error');
        errorInputs.forEach(input => input.classList.remove('input-error'));
    }

    async function loginUser(email, password) {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // Enviar los datos como JSON
        });
    
        const data = await response.json();
    
        if (response.status === 200) {
            // Guardar el userId en localStorage para utilizarlo en futuras solicitudes
            localStorage.setItem('userId', data.userId);
        }
    
        return response;
    }
    
});
