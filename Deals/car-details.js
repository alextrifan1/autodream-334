// Retrieve carDeals from localStorage
const carDeals = JSON.parse(localStorage.getItem('carDeals')) || [];

const urlParams = new URLSearchParams(window.location.search);
const carId = parseInt(urlParams.get('id'));

// Find the car based on the ID
const car = carDeals.find(car => car.id === carId);

// Display the car details if found
if (car) {
    const container = document.getElementById('car-details-container');
    container.innerHTML = `
        <div class="car-info">
            <h2>${car.name}</h2>
            <p>${car.description}</p>
            <p><strong>Price:</strong> ${car.price}</p>
        </div>
        <div class="car-images">
            <img src="${car.images[0]}" alt="${car.name}">
            <img src="${car.images[1]}" alt="${car.name}">
            <img src="${car.images[2]}" alt="${car.name}">
        </div>
    `;
} else {
    document.body.innerHTML = '<h1>Car not found</h1>';
}
