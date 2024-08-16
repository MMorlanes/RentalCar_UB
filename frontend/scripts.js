document.addEventListener('DOMContentLoaded', () => {
    const cochesLink = document.querySelector('a[href="#coches"]');
    if (cochesLink) {
        cochesLink.addEventListener('click', (event) => {
            event.preventDefault();
            fetchCars();
        });
    }

    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const loginData = {
                username: email,
                password: password
            };
            
            try {
                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('username', email);
                    window.location.href = 'index.html';
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    } else {
        if (localStorage.getItem('isAuthenticated') !== 'true') {
            window.location.href = 'login.html';
        } else {
            const username = localStorage.getItem('username');
            document.getElementById('username').textContent = username;

            document.getElementById('logout-button').addEventListener('click', () => {
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('username');
                window.location.href = 'login.html';
            });

            document.querySelector('.search-button').addEventListener('click', async () => {
                const pickupDate = document.getElementById('pickup-date').value;
                const pickupTime = document.getElementById('pickup-time').value;
                const returnDate = document.getElementById('return-date').value;
                const returnTime = document.getElementById('return-time').value;

                const startDate = `${pickupDate} ${pickupTime}:00`;
                const endDate = `${returnDate} ${returnTime}:00`;

                try {
                    const response = await fetch(`http://localhost:3000/api/cars/available?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`);
                    
                    const cars = await response.json();
                    
                    if (response.ok) {
                        displayCars(cars);
                    } else {
                        document.getElementById('car-list').innerHTML = '<p>No hay coches disponibles entre las fechas seleccionadas.</p>';
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                }
            });
        }
    }

    flatpickr('#pickup-date', {
        enableTime: false,
        dateFormat: 'Y-m-d',
    });

    flatpickr('#pickup-time', {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        time_24hr: true
    });

    flatpickr('#return-date', {
        enableTime: false,
        dateFormat: 'Y-m-d',
    });

    flatpickr('#return-time', {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        time_24hr: true
    });
});

function fetchCars() {
    fetch('http://localhost:3000/api/cars')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json();
        })
        .then(data => {
            const carList = document.getElementById('car-list');
            carList.innerHTML = createCarTable(data);
        })
        .catch(error => {
            console.error('Error al cargar los coches:', error);
        });
}

function displayCars(cars) {
    const carList = document.getElementById('car-list');
    carList.innerHTML = '';

    if (cars.length === 0) {
        carList.innerHTML = '<p>No hay coches disponibles entre las fechas seleccionadas.</p>';
        return;
    }

    cars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card';
        const imageName = car.nombre.toLowerCase().includes('corsa') ? 'corsa.jpg' : 'juke.jpg';
        card.innerHTML = `
            <img src="../frontend/img/${imageName}" alt="${car.nombre}" class="car-image">
            <h3 class="car-info">${car.nombre}</h3>
            <button class="reserve-button" data-id="${car.idc}">Reservar</button>
        `;
        carList.appendChild(card);
    });

    document.querySelectorAll('.reserve-button').forEach(button => {
        button.addEventListener('click', () => {
            const carId = button.getAttribute('data-id');
            const username = localStorage.getItem('username');

            const pickupDate = document.getElementById('pickup-date').value;
            const pickupTime = document.getElementById('pickup-time').value;
            const returnDate = document.getElementById('return-date').value;
            const returnTime = document.getElementById('return-time').value;

            const startDate = `${pickupDate} ${pickupTime}:00`;
            const endDate = `${returnDate} ${returnTime}:00`;

            if (confirm(`Vas a reservar el coche ${car.nombre} desde ${startDate} hasta ${endDate}. ¿Deseas confirmar?`)) {
                try {
                    fetch(`http://localhost:3000/api/cars/reserve/${carId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ startDate, endDate, username })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message === 'Coche reservado exitosamente') {
                            alert(`Coche reservado: ${car.nombre}`);
                            location.reload();
                        } else {
                            alert('Error al reservar el coche');
                        }
                    });
                } catch (error) {
                    console.error('Error:', error);
                    alert('Ocurrió un error al procesar la reserva.');
                }
            }
        });
    });
}
