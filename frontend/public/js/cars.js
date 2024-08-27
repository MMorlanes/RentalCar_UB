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

        // Usar la ruta de imagen desde el JSON
        const imageName = car.imagen;

        card.innerHTML = `
            <img src="/img/${imageName}" alt="${car.nombre}" class="car-image">
            <h3 class="car-info">${car.nombre}</h3>
            <button class="reserve-button" data-id="${car.id}">Reservar</button>
        `;
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
