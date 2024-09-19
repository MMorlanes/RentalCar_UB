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

        // Validar el formato del email
        if (!validateEmail(email)) {
            showError(emailInput, 'Por favor, introduce un email válido.');
            isValid = false;
        }

        // Verificar que el campo de contraseña no esté vacío
        if (password === '') {
            showError(passwordInput, 'La contraseña no puede estar vacía.');
            isValid = false;
        }

        // Si no hay errores, intentar autenticar
        if (isValid) {
            try {
                const response = await loginUser(email, password);
                
                // Verificar si el login fue exitoso
                if (response.status === 200) {
                    // Redirigir a la página de inicio (index.html)
                    window.location.href = '/index.html';
                } else {
                    const data = await response.json();
                    showError(form, data.message || 'Error al iniciar sesión');
                }
            } catch (err) {
                // Mostrar error si hay algún problema con el servidor
                showError(form, 'Error al intentar iniciar sesión. Inténtalo más tarde.');
                console.error(err); // Para debugging
            }
        }
    });

    // Función para validar el formato del email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para mostrar un error bajo el input correspondiente
    function showError(input, message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        input.parentElement.appendChild(errorMessage);
        input.classList.add('input-error');
    }

    // Función para limpiar los errores anteriores
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());

        const errorInputs = document.querySelectorAll('.input-error');
        errorInputs.forEach(input => input.classList.remove('input-error'));
    }

    // Función para realizar el login
    async function loginUser(email, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            // Verificar si la respuesta es JSON válida
            const data = await response.json();
    
            if (response.status === 200) {
                if (data.PkUserWeb && data.username) {
                    // Guardar PkUserWeb y username en localStorage
                    localStorage.setItem('PkUserWeb', data.PkUserWeb);
                    localStorage.setItem('username', data.username);
    
                    // Imprimir en consola para verificar
                    console.log('PkUserWeb guardado en localStorage:', localStorage.getItem('PkUserWeb'));
                    console.log('username guardado en localStorage:', localStorage.getItem('username'));
                } else {
                    console.error('PkUserWeb o username faltan en la respuesta del servidor');
                    showError(form, 'Error al procesar la respuesta del servidor. Inténtalo más tarde.');
                }
            } else {
                console.error('Error en el servidor, estado de respuesta:', response.status);
                showError(form, 'Error al iniciar sesión. Inténtalo más tarde.');
            }
    
            return response; // Devolver la respuesta para manejar errores en la lógica principal
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error; // Volver a lanzar el error para manejarlo arriba
        }
    }
});
