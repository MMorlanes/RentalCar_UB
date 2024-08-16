document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirigir al usuario a index.html
            window.location.href = '/index.html';
        } else {
            // Mostrar un mensaje de error o manejar el error
            alert('Usuario o contraseña incorrectos');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
