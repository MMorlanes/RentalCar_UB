// Función para mostrar los coches en la página
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
        card.setAttribute('data-id', car.id); // Asocia el ID del coche para la reserva

        // Usar la ruta de imagen desde el JSON
        const imageName = car.imagen;

        card.innerHTML = `
            <img src="/img/${imageName}" alt="${car.nombre}" class="car-image">
            <h3 class="car-info">${car.nombre}</h3>
        `;
        
        // Añadir evento para seleccionar coche
        card.addEventListener('click', function () {
            // Remover la clase 'selected' de todos los coches
            document.querySelectorAll('.car-card').forEach(card => {
                card.classList.remove('selected');
            });

            // Añadir la clase 'selected' al coche clicado
            this.classList.add('selected');
        });

        carList.appendChild(card);
    });
}

// Función para obtener los coches desde el archivo JSON y mostrarlos
function fetchAndDisplayCars() {
    fetch('/data/cars.json') // Cargar datos desde el archivo JSON
        .then(response => response.json())
        .then(data => displayCars(data))
        .catch(error => console.error('Error al obtener los coches:', error));
}

// Escuchar el botón de búsqueda para mostrar los coches disponibles
document.querySelector('.search-button').addEventListener('click', fetchAndDisplayCars);

// Cargar coches al inicio
window.onload = fetchAndDisplayCars;

// Función del calendario
document.addEventListener('DOMContentLoaded', function () {
    // Inicializa el calendario para los campos de fecha
    flatpickr('#pickup-date', {
        enableTime: false, // Solo selecciona fecha
        dateFormat: 'Y-m-d', // Formato de fecha
        minDate: 'today', // No permite seleccionar fechas pasadas
    });

    flatpickr('#return-date', {
        enableTime: false,
        dateFormat: 'Y-m-d',
        minDate: 'today',
    });

    // Inicializa el selector de hora para los campos de hora
    flatpickr('#pickup-time', {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        time_24hr: true, // Utiliza formato de 24 horas
    });

    flatpickr('#return-time', {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        time_24hr: true,
    });
});

// Botón de reserva de coche
document.querySelector('.reserve-button').addEventListener('click', async () => {
    const carCardSelected = document.querySelector('.car-card.selected'); // Coche seleccionado
    if (!carCardSelected) {
        alert('Por favor, selecciona un coche');
        return;
    }

    const carId = carCardSelected.getAttribute('data-id');
    const pickupDate = document.getElementById('pickup-date').value;
    const pickupTime = document.getElementById('pickup-time').value;
    const returnDate = document.getElementById('return-date').value;
    const returnTime = document.getElementById('return-time').value;
    const comments = document.getElementById('comments').value;

    // Combina las fechas y horas para el backend
    const startDate = `${pickupDate} ${pickupTime}`;
    const endDate = `${returnDate} ${returnTime}`;

    // Mostrar en consola los datos antes de enviarlos
    console.log('Datos de reserva:');
    console.log('Car ID:', carId);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Comments:', comments);

    // Envía los datos al backend
    const response = await fetch(`/api/cars/reserve/${carId}`, {


        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, endDate, comments })
    });

    const result = await response.json();

    if (result.message) {
        alert(result.message);
        // Deshabilitar el botón de "Reservar"
        document.querySelector('.reserve-button').disabled = true;
        document.querySelector('.reserve-button').innerText = 'Reservado';
    } else {
        alert('Error al reservar el coche');
    }
});
