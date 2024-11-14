// Initial car deals data (this should come from localStorage, if available)
let carDeals = JSON.parse(localStorage.getItem('carDeals')) || [
    {
        id: 1,
        name: "BMW M3",
        description: "A high-performance sports sedan with a powerful engine.",
        price: "$60,000",
        images: [`Pictures/car1_1.jpg`, `Pictures/car1_2.jpg`, `Pictures/car1_3.jpg`]
    },
    {
        id: 2,
        name: "Audi A4",
        description: "A luxury compact car with elegant design and great performance.",
        price: "$45,000",
        images: [`Pictures/car2_1.jpg`, `Pictures/car2_2.jpg`, `Pictures/car2_3.jpg`]
    },
    {
        id: 3,
        name: "Mercedes C-Class",
        description: "A stylish and comfortable sedan with top-tier luxury features.",
        price: "$55,000",
        images: [`Pictures/car3_1.jpg`, `Pictures/car3_2.jpg`, `Pictures/car3_3.jpg`]
    }
];

// Store the carDeals array in localStorage after any update
function saveCarDeals() {
    localStorage.setItem('carDeals', JSON.stringify(carDeals));
}

// Display all current car deals
function displayCarDeals() {
    const container = document.getElementById('car-container');
    container.innerHTML = ''; // Clear existing car deals

    if (carDeals.length === 0) {
        container.innerHTML = '<p>No car deals available</p>';
        return;
    }

    carDeals.forEach(car => {
        const dealDiv = document.createElement('div');
        dealDiv.classList.add('deal');
        dealDiv.onclick = () => window.location.href = `car-details.html?id=${car.id}`;
        
        dealDiv.innerHTML = `
            <img src="${car.images[0]}" alt="${car.name}">
            <h2>${car.name}</h2>
            <p>Click to see details</p>
            <button class="delete-btn" data-id="${car.id}">Delete</button>  <!-- Delete button -->
        `;
        
        container.appendChild(dealDiv);
    });

    // Attach event listeners to all delete buttons
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            const carId = parseInt(e.target.dataset.id);  // Get car ID from the button
            deleteCar(carId);  // Call delete function
        });
    });
}

// Function to delete a car deal
function deleteCar(carId) {
    // Remove the car from the array
    carDeals = carDeals.filter(car => car.id !== carId);
    
    // Update localStorage with the new carDeals array
    saveCarDeals();
    
    // Refresh the car deals display
    displayCarDeals();
}

// Show the upload form when the "Add New Car Deal" button is clicked
document.getElementById('add-car-btn').addEventListener('click', () => {
    document.getElementById('upload-form').style.display = 'block';
});

// Handle the form submission
document.getElementById('submit-car').addEventListener('click', (e) => {
    e.preventDefault();

    const carName = document.getElementById('car-name').value;
    const carDescription = document.getElementById('car-description').value;
    const carPrice = document.getElementById('car-price').value;
    const carImages = document.getElementById('car-images').files;

    if (!carName || !carDescription || !carPrice || carImages.length === 0) {
        alert("All fields are required!");
        return;
    }

    const newCar = {
        id: carDeals.length + 1,
        name: carName,
        description: carDescription,
        price: carPrice,
        images: []
    };

    for (let i = 0; i < carImages.length; i++) {
        const image = carImages[i];
        const imagePath = `Pictures/car${newCar.id}_${i + 1}.jpg`;
        newCar.images.push(imagePath);

        const reader = new FileReader();
        reader.onloadend = function() {
            console.log(`Image uploaded: ${imagePath}`);
        };
        reader.readAsDataURL(image);
    }

    carDeals.push(newCar);
    saveCarDeals(); // Save the updated carDeals array to localStorage
    document.getElementById('upload-form').style.display = 'none';
    displayCarDeals(); // Display the updated car deals
});

// Initial display of car deals
displayCarDeals();
